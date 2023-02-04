import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import Order from '../models/order.model.js';

dotenv.config();
const jwtSecret = process.env.JWT;

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        throw err;
      }
      resolve(userData);
    });
  });
}

export const fetchOrders = async (req, res, next) => {
  const userData = await getUserDataFromReq(req);
  try {
    const orders = await Order.aggregate([
      {
        $match: { seller_id: userData.seller_id },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'product_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      //   { $unwind: "$product" },
      //   { $sort: { price: 1, shipping_limit_date: 1 } },
      //   { $skip: 560 },
      //   { $limit: 100 },
      {
        $project: {
          _id: 0,
          id: '$_id',
          product_id: '$product_id',
          product_category: '$product.product_category_name',
          price: '$price',
          date: '$shipping_limit_date',
        },
      },
      { $group: { _id: null, data: { $push: '$$ROOT' }, total: { $sum: 1 } } },
      {
        $project: {
          _id: 0,
          data: 1,
          total: 1,
          limit: { $literal: 20 },
          offset: { $literal: 560 },
        },
      },
    ]);
    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json('Order has been deleted.');
  } catch (err) {
    next(err);
  }
};

export const getOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const orderItem = await Order.findById(id);
    res.status(200).json(orderItem);
  } catch (err) {
    next(err);
  }
};

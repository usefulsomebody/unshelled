/* eslint-disable radix */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();
const jwtSecret = process.env.JWT;
const { MONGO_URL } = process.env;
const client = new MongoClient(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const objectId = (id) => new ObjectId(id);

function getUserDataFromReq(req) {
  return new Promise((resolve, _reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        throw err;
      }
      resolve(userData);
    });
  });
}

export const fetchOrders = async (req, res, next) => {
  await client.connect();
  const collection = client.db('TaskCluster').collection('orders');
  console.log('Connected MongoDb 📡');
  const userData = await getUserDataFromReq(req);
  let { page } = req.query;
  const offset = req.query;
  let limit = parseInt(req.query.limit);
  if (!page) {page = 1;}
  if (!limit) {limit = 20;}
  let skip = +offset || 0;
  if (skip < 1) {
    skip = 0;
  }
  try {
    const query = { seller_id: userData.seller_id };
    const options = {
      sort: { price: 1, shipping_limit_date: -1 },
    };
    const data = await collection
      .find(query, options)
      .limit(limit)
      .toArray()
      .then((data) => data)
      .catch((e) => console.log(e));
    const total = await collection.countDocuments(query);
    res.status(200).json({ data, total, offset: skip, limit });
  } catch (err) {
    next(err);
  } finally {
    setTimeout(() => {
      client.close();
    }, 2000);
  }
};

export const updateOrder = async (req, res, next) => {
  await client.connect();
  const collection = client.db('TaskCluster').collection('orders');
  console.log('Connected MongoDb 📡');
  try {
    const filter = { _id: objectId(req.params.id) };
    const updateDoc = { $set: req.body };
    const options = { upsert: true };
    await collection.updateOne(filter, updateDoc, options);
    res.status(200).json(req.body);
  } catch (err) {
    next(err);
  } finally {
    setTimeout(() => {
      client.close();
    }, 1500);
  }
};

export const deleteOrder = async (req, res, next) => {
  await client.connect();
  const collection = client.db('TaskCluster').collection('orders');
  console.log('Connected MongoDb 📡');
  const { id } = req.params;
  try {
    await collection.findOneAndDelete({ _id: objectId(id) });
    res.status(200).json('Order has been deleted.');
  } catch (err) {
    throw res.status(500).json({ message: 'Server error occured' });
  } finally {
    setTimeout(() => {
      client.close();
    }, 2000);
  }
};

export const getOrder = async (req, res, next) => {
  await client.connect();
  const collection = client.db('TaskCluster').collection('orders');
  console.log('Connected MongoDb 📡');
  const { id } = req.params;
  try {
    const query = { _id: objectId(id) };
    const orderItem = await collection.findOne(query);
    res.status(200).json(orderItem);
  } catch (err) {
    next(err);
  } finally {
    setTimeout(() => {
      client.close();
    }, 2000);
  }
};

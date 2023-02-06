import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { MongoClient, ObjectId } from 'mongodb';

import { createError } from '../utils/error.js';

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

export const login = async (req, res, next) => {
  const { seller_id, password } = req.body;
  await client.connect();
  const collection = client.db('TaskCluster').collection('sellers');
  console.log('Connected MongoDb 📡');

  try {
    const query = { seller_id };
    const sellerDoc = await collection.findOne(query);
    if (!sellerDoc) {
      return next(createError(404, 'Account does not exist'));
    }
    const isMatch = Number(password) === sellerDoc.seller_zip_code_prefix;
    if (!isMatch) {
      return next(createError(400, 'Wrong password or seller ID'));
    }
    jwt.sign(
      {
        seller_id: sellerDoc.seller_id,
        id: sellerDoc._id,
      },
      jwtSecret,
      {},
      (err, token) => {
        if (err) {
          throw err;
        }
        res
          .cookie('token', token, {
            httpOnly: true,
          })
          .status(200)
          .json(sellerDoc);
      }
    );
  } catch (err) {
    next(err);
  } finally {
    setTimeout(() => {
      client.close();
    }, 1500);
  }
};

export const getUserDetails = async (req, res, next) => {
  const { token } = req.cookies;
  await client.connect();
  const collection = client.db('TaskCluster').collection('sellers');
  console.log('Connected MongoDb 📡');
  try {
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, sellerData) => {
        if (err) {
          throw err;
        }
        const query = { _id: objectId(sellerData.id) };
        // const options = {
        // sort: { "imdb.rating": -1 },
        // projection: { _id: sellerData.id,  },
        // };
        const seller = await collection.findOne(query);
        res.status(200).json(seller);
      });
    } else {
      res.status(402).json(null);
    }
  } catch (err) {
    throw res.status(500).json({ message: 'Server error occured' });
    next(err);
  } finally {
    setTimeout(() => {
      client.close();
    }, 2000);
  }
};

export const updateUserDetails = async (req, res, next) => {
  await client.connect();
  const collection = client.db('TaskCluster').collection('sellers');
  console.log('Connected MongoDb 📡');
  const userData = await getUserDataFromReq(req);
  try {
    const filter = { seller_id: userData.seller_id };
    const updateDoc = { $set: req.body };
    const options = { upsert: true };
    await collection.updateOne(filter, updateDoc, options);
    res.status(200).json(req.body);
  } catch (err) {
    // next(createError(500, 'Server error occured'));
    throw res.status(500).json({ message: 'Server error occured' });
    next(err);
  } finally {
    setTimeout(() => {
      client.close();
    }, 1500);
  }
};

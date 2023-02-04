import Seller from "../models/seller.model.js";
import dotenv from "dotenv";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

dotenv.config();
const jwtSecret = process.env.JWT;

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) {throw err;}
      resolve(userData);
    });
  });
}

export const login = async (req, res, next) => {
	const {seller_id, password} = req.body;
	try {
		const sellerDoc = await Seller.findOne({seller_id});
		if (!sellerDoc) return next(createError(404, "Account does not exist"));
		const isMatch = Number(password) === sellerDoc.seller_zip_code_prefix;
		if (!isMatch) return next(createError(400, "Wrong password or seller ID"));
		jwt.sign({
			seller_id: sellerDoc.seller_id,
			id:sellerDoc._id
		  }, jwtSecret, {}, (err,token) => {
			if (err) throw err;
			res.cookie("token", token, {
				httpOnly: true,
			  })
			  .status(200)
			  .json(sellerDoc);
		  });
	  } catch (err) {
		next(err);
	  }
};

export const getUserDetails = async (req, res, next) => {
	const {token} = req.cookies;
	try {
		if (token) {
		jwt.verify(token, jwtSecret, {}, async (err, sellerData) => {
			if (err) throw err;
			const {seller_id,_id, seller_state, seller_city} = await Seller.findById(sellerData.id);
			res.json({seller_id,_id, seller_state, seller_city});
		});
		} else {
		res.json(null);
		}
	} catch (err) {
		next(err);
	}
};

export const updateUserDetails = async (req, res, next) => {
	const userData = await getUserDataFromReq(req);
	try {
	  const updateSeller = await Seller.findByIdAndUpdate(
		userData.id,
		{ $set: req.body },
		{ upsert: true, new: true }
	  );
	//   await updateSeller.save();
	  res.status(200).json(updateSeller);
	} catch (err) {
	  next(err);
	}
  };
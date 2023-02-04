import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next, func) => {
  const token = req.cookies.token;
  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }

  jwt.verify(token, process.env.JWT, (err, seller) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.seller = seller;
    next();
  });
};

export const verifySeller = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.seller.id === req.params.id) {
      next();
    } else {
      return next(createError(401, 'You are not allowed to make this call!'));
    }
  });
};

import jwt from "jsonwebtoken";
const { verify } = jwt;
import { secret } from "../config/auth.config.js";
import { User } from "../models";

import { Response } from "../helpers";

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return Response.unauthorized(res, "No token provided.");
  }

  verify(token, secret, (err, decoded) => {
    if (err) {
      return Response.unauthorized(res, "Invalid token.");
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    if (!user.isAdmin) {
      return Response.forbidden(res);
    }
    next();
  } catch (err) {
    return Response.serverError(res, err.message);
  }
};

const isCustomer = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    if (!user.isCustomer && !user.isAdmin) {
      return Response.forbidden(res);
    }
    next();
  } catch (err) {
    return Response.serverError(res, err.message);
  }
};

export default {
  verifyToken,
  isAdmin,
  isCustomer,
};

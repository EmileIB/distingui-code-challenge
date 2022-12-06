import jwt from "jsonwebtoken";

const { verify } = jwt;

import { AUTH_SECRET } from "../config/auth.config.js";

import { Response } from "../helpers";

import { User } from "../models";

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];

    if (!token) {
      return Response.unauthorized(res, "No token provided.");
    }

    verify(token, AUTH_SECRET, (err, decoded) => {
      if (err) {
        return Response.unauthorized(res, "Invalid token.");
      }
      const userId = decoded.id;
      const user = User.findById(userId);
      if (!user) {
        return Response.unauthorized(res, "User not found.");
      }
      req.userId = userId;
      next();
    });
  } catch (err) {
    return Response.serverError(res, err.message);
  }
};

export { verifyToken };

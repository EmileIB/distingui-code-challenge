import { AUTH_SECRET } from "../config/auth.config";
import { User } from "../models";

import { Response } from "../helpers";

import jwt from "jsonwebtoken";
const { sign } = jwt;

import { compareSync, hashSync, genSaltSync } from "bcrypt";

const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    }).lean();

    if (!user) return Response.unauthorized(res, "User not found.");

    const isPasswordValid = compareSync(req.body.password, user.password);

    if (!isPasswordValid)
      return Response.unauthorized(res, "Invalid password.");

    const token = sign({ id: user._id }, AUTH_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    delete user.password;

    return Response.success(res, {
      user,
      token,
    });
  } catch (err) {
    return Response.serverError(res, err.message);
  }
};

const register = async (username, password) => {
  try {
    const user = await User.findOne({
      username: username,
    }).lean();

    if (user) {
      console.log("Default admin account already exists.");
      return;
    }

    const hashedPassword = hashSync(password, genSaltSync(8));

    await User.create({
      username: username,
      password: hashedPassword,
    });

    console.log("Default admin Account created");
  } catch (err) {
    console.log(err);
  }
};

export { signin, register };

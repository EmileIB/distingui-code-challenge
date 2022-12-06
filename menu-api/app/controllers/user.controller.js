import { Response } from "../helpers";

exports.allAccess = (req, res) => {
  Response.success(res, "Public Content.");
};

exports.userBoard = (req, res) => {
  Response.success(res, "User Content.");
};

exports.adminBoard = (req, res) => {
  Response.success(res, "Admin Content.");
};

exports.customerBoard = (req, res) => {
  Response.success(res, "Customer Content.");
};

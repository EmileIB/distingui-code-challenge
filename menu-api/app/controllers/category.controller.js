import { Response } from "../helpers";
import { Category } from "../models";

const getAll = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate({
        path: "items",
        populate: {
          path: "images",
        },
      })
      .exec();

    return Response.success(res, categories);
  } catch (err) {
    return Response.serverError(res, err.message);
  }
};

const getById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate({
        path: "items",
        populate: {
          path: "images",
        },
      })
      .exec();

    if (!category)
      return Response.notFound(
        res,
        `Category with id ${req.params.id} not found.`
      );
    return Response.success(res, category);
  } catch (err) {
    return Response.serverError(res, err.message);
  }
};

const create = async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name,
    });
    return Response.success(res, category);
  } catch (err) {
    return Response.serverError(res, err.message);
  }
};

const update = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    });

    if (!category)
      return Response.notFound(
        res,
        `Category with id ${req.params.id} not found.`
      );
    return Response.success(res, category);
  } catch (err) {
    return Response.serverError(res, err.message);
  }
};

const remove = async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category)
      return Response.notFound(
        res,
        `Category with id ${req.params.id} not found.`
      );
    return Response.success(res, category);
  } catch (err) {
    return Response.serverError(res, err.message);
  }
};

export { getAll, getById, create, update, remove };

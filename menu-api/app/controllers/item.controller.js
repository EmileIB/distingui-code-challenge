import { Response } from "../helpers";
import { Item } from "../models";
import { Category } from "../models";

const getAll = async (req, res) => {
  try {
    const items = await Item.find()
      .populate({
        path: "images",
      })
      .exec()
      .lean();

    for (let i = 0; i < items.length; i++) {
      const category = await Category.findOne({ items: items[i]._id })
        .exec()
        .lean();
      items[i].category = category;
    }

    return Response.success(res, items);
  } catch (err) {
    return Response.serverError(res, err.message);
  }
};

const getById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate({
        path: "images",
      })
      .exec()
      .lean();

    if (!item)
      return Response.notFound(res, `Item with id ${req.params.id} not found.`);

    const category = await Category.findOne({ items: item._id }).exec().lean();
    item.category = category;
    return Response.success(res, item);
  } catch (err) {
    return Response.serverError(res, err.message);
  }
};

const create = async (req, res) => {
  try {
    const category = await Category.findById(req.body.categoryId);
    if (!category)
      return Response.notFound(
        res,
        `Category with id ${req.body.categoryId} not found.`
      );

    const item = await Item.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      images: req.body.images,
    });

    // Add item to category
    category.items.push(item._id);
    await category.save();

    return Response.success(res, item);
  } catch (err) {
    return Response.serverError(res, err.message);
  }
};

const update = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item)
      return Response.notFound(res, `Item with id ${req.params.id} not found.`);

    // If category changed, update category
    if (req.body.categoryId) {
      const category = await Category.findById(req.body.categoryId);
      if (!category)
        return Response.notFound(
          res,
          `Category with id ${req.body.categoryId} not found.`
        );

      if (item.categoryId.toString() !== req.body.categoryId) {
        // Remove item from old category
        const oldCategory = await Category.find({ items: req.params.id });
        if (oldCategory) {
          oldCategory.items = oldCategory.items.filter(
            (item) => item._id.toString() !== req.params.id
          );
          await oldCategory.save();
        }

        // Add item to new category
        category.items.push(item._id);
        await category.save();
      }
    }

    item.name = req.body.name;
    item.price = req.body.price;
    item.description = req.body.description;
    item.image = req.body.images;
    item.categoryId = req.body.categoryId;

    await item.save();
    return Response.success(res, item);
  } catch (err) {
    return Response.serverError(res, err.message);
  }
};

const remove = async (req, res) => {
  try {
    const item = await Item.findByIdAndRemove(req.params.id);

    if (!item)
      return Response.notFound(res, `Item with id ${req.params.id} not found.`);

    // Remove item from category
    const category = await Category.find({ items: req.params.id });
    if (category) {
      category.items = category.items.filter(
        (item) => item._id.toString() !== req.params.id
      );
      await category.save();
    }

    return Response.success(res, item);
  } catch (err) {
    return Response.serverError(res, err.message);
  }
};

export { getAll, getById, create, update, remove };

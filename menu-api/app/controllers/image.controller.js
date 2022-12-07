import { Image } from "../models";

import { Response } from "../helpers";

import path from "path";
const __dirname = path.resolve(path.dirname(""));

const upload = async (req, res) => {
  try {
    if (!req.files) return Response.badRequest(res, "No file uploaded.");

    const name = req.files.image.name;
    const urlName = "menu-item-" + Date.now() + "-" + name;
    const ext = name.substring(name.lastIndexOf(".") + 1);

    if (ext !== "jpg" && ext !== "png" && ext !== "jpeg")
      return Response.badRequest(res, "Only jpg, png, jpeg files are allowed.");

    req.files.image.mv(__dirname + "/app/public/images/" + urlName);

    const image = await Image.create({
      name: name,
      urlName: urlName,
    });

    return Response.success(res, image);
  } catch (err) {
    return Response.serverError(res, err.message);
  }
};

export { upload };

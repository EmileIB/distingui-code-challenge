import { model, Schema } from "mongoose";

const Image = model(
  "Image",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      urlName: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  )
);

export default Image;

import { model, Schema } from "mongoose";

const Item = model(
  "Item",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: Schema.Types.ObjectId,
        ref: "Image",
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  )
);

export default Item;

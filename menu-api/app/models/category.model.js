import { model, Schema } from "mongoose";

const Category = model(
  "Category",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      items: [
        {
          type: Schema.Types.ObjectId,
          ref: "Item",
        },
      ],
    },
    {
      timestamps: true,
      versionKey: false,
    }
  )
);

export default Category;
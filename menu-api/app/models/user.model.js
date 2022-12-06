import { model, Schema } from "mongoose";

const User = model(
  "User",
  new Schema(
    {
      username: {
        type: String,
        required: true,
      },
      password: {
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

export default User;

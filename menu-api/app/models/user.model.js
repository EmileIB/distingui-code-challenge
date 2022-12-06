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
    }
  )
);

export default User;

import { Response } from "../helpers";
const test = (req, res) => {
  Response.success(res, "Hello World");
};

export { test };

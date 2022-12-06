import { verifyToken } from "../middlewares/authJwt";
import { test } from "../controllers/category.controller";

export const categotyRoutes = (app) => {
  app.get("/api/categories", verifyToken, test);
};

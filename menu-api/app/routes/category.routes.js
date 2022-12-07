import { verifyToken } from "../middlewares/authJwt";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../controllers/category.controller";

export const categotyRoutes = (app) => {
  app.get("/api/categories", getAll);
  app.get("/api/categories/:id", getById);

  app.post("/api/categories", verifyToken, create);

  app.put("/api/categories/:id", verifyToken, update);

  app.delete("/api/categories/:id", verifyToken, remove);
};

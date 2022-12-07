import { verifyToken } from "../middlewares/authJwt";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../controllers/item.controller";

export const ItemRoutes = (app) => {
  app.get("/api/items", getAll);
  app.get("/api/items/:id", getById);

  app.post("/api/items", verifyToken, create);

  app.put("/api/items/:id", verifyToken, update);

  app.delete("/api/items/:id", verifyToken, remove);
};

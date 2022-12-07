import { upload } from "../controllers/image.controller";
import { verifyToken } from "../middlewares/authJwt";

export const imageRoutes = (app) => {
  app.post("/api/image/upload", verifyToken, upload);
};

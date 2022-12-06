import { signin } from "../controllers/auth.controller";

export const authRoutes = (app) => {
  app.post("/api/auth/signin", signin);
};

import { Express } from "express";
import userRoutes from "./user.routes";

export const routes = (app: Express) => {
  app.use("/api/users", userRoutes());
};

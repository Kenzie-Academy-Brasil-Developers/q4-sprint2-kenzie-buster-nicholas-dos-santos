import { Router } from "express";
import CartController from "../controllers/cart.controller";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
const route = Router();

const cartRoutes = () => {
  route.put("/pay", verifyTokenMiddleware, CartController.updateCart);

  return route;
};
export default cartRoutes;

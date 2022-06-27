import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware";
import loginUserSchema from "../schemas/user/loginUser.schema";
import { createUserSchema } from "../schemas/user/createUser.schema";
import verifyUserExists from "../middlewares/verifyUserExists.middleware";
import UserController from "../controllers/user.controller";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
const route = Router();

const userRoutes = () => {
  route.post(
    "/login",
    validateSchema(loginUserSchema),
    UserController.loginUserController
  );
  route.post(
    "/register",
    validateSchema(createUserSchema),
    verifyTokenMiddleware,
    verifyUserExists,
    UserController.createUserController
  );

  return route;
};

export default userRoutes;

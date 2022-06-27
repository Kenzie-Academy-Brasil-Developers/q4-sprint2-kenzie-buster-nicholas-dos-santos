import { Router } from "express";
import DvdController from "../controllers/dvd.controller";
import validateSchema from "../middlewares/validateSchema.middleware";
import verifyAdmMiddleware from "../middlewares/verifyAdmPermission.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import buyDvdSchema from "../schemas/dvd/buyDvd.schema";
import createDvdSchema from "../schemas/dvd/createDvd.schema";

const route = Router();

const dvdRoutes = () => {
  route.post(
    "/register",
    validateSchema(createDvdSchema),
    verifyTokenMiddleware,
    verifyAdmMiddleware,
    DvdController.createDvdController
  );

  route.get("", DvdController.getAllDvdsController);

  route.post(
    "/buy/:dvdid",
    validateSchema(buyDvdSchema),
    verifyTokenMiddleware,
    DvdController.buyDvdController
  );

  return route;
};

export default dvdRoutes;

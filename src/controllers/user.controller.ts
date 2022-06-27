import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  loginUserController = async (req: Request, res: Response) => {
    const { status, message } = await UserService.loginUser(req);

    return res.status(status).json(message);
  };

  createUserController = async (req: Request, res: Response) => {
    const user = await UserService.createUser(req);

    return res.status(user.status).json(user.message);
  };
}

export default new UserController();

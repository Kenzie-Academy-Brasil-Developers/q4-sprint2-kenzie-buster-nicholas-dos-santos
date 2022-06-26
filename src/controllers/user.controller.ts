import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  createUserController = async (req: Request, res: Response) => {
    const user = await UserService.createUser(req);

    return res.status(201).json(user);
  };

  loginUserController = async (req: Request, res: Response) => {
    const { status, message } = await UserService.loginUser(req.validated);

    return res.status(status).json(message);
  };
}

export default new UserController();

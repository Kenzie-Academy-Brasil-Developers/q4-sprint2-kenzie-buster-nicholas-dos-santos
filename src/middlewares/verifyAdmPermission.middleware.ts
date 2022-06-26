import { Request, Response, NextFunction } from "express";

import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

const verifyAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({
    email: req.decoded,
  });

  if (!findUser) {
    return res.status(404).json({ error: "User not found" });
  }

  if (findUser && !findUser.isAdm) {
    return res.status(401).json({ error: "Missing Admin Permission" });
  }

  return next();
};

export default verifyAdmMiddleware;

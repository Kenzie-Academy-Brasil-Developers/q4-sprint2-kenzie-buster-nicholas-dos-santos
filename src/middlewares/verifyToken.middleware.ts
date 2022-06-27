import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const verifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(
      token as string,
      String(process.env.SECRET_KEY),
      (err: any, decoded: any) => {
        if (err) {
          return res.status(400).json({ error: "Invalid signature" });
        }

        req.decoded = decoded.email;
      }
    );
  }
  return next();
};

export default verifyTokenMiddleware;

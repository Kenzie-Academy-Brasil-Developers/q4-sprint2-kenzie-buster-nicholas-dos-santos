import { Request, Response, NextFunction } from "express";
import { User } from "../entities/user.entity";
import { userRepository } from "../repositories";

/*
    Tratamento de exceção como existência de usuário ou produto (Unique)
    deve ser feito através de Middlewares, pois diferentemente do
    SQLAlchemy, os erros em Express não são tão claros de identificar.

    É melhor tratar isso antes de extourar no banco de dados, por isso melhor
    tratar antes de fazer a inserção. 
*/

const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const foundUser: User | null = await userRepository.findOne({
    email: req.body.email,
  });
  if (!foundUser) {
    return res
      .status(409)
      .json({ error: `Key(email)=(${req.body.email}) already exists` });
  }

  return next();
};

export default verifyUserExists;

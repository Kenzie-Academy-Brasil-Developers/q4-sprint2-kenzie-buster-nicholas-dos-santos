import { Request, Response, NextFunction } from "express";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";

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
  const userRepository = AppDataSource.getRepository(User);
  const email = req.body.email;
  const foundUser = await userRepository.findOneBy({
    email: email.toLowerCase(),
  });
  console.log(req.body.email);
  console.log(foundUser);
  if (foundUser) {
    return res
      .status(409)
      .json({ error: `Key(email)=(${email.toLowerCase()}) already exists` });
  }

  return next();
};

export default verifyUserExists;

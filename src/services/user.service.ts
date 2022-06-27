import { AppDataSource } from "../data-source";
import dotenv from "dotenv";
import { sign } from "jsonwebtoken";
import { hash } from "bcrypt";
import { serializedUserSchema } from "../schemas/user/createUser.schema";
import { Request } from "express";
import { User } from "../entities/user.entity";

dotenv.config();

interface ILogin {
  status: number;
  message: object;
}

class UserService {
  loginUser = async (req: Request): Promise<ILogin> => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email: req.body.email });

    if (!user) {
      return {
        status: 401,
        message: { message: "Invalid credentials" },
      };
    }

    if (!(await user.comparePwd(req.body.password))) {
      return {
        status: 401,
        message: { message: "Invalid credentials" },
      };
    }

    const token = sign({ ...user }, String(process.env.SECRET_KEY), {
      expiresIn: process.env.EXPIRES_IN,
    });

    return {
      status: 200,
      message: { token },
    };
  };

  createUser = async ({ validated, decoded }: Request) => {
    const userRepository = AppDataSource.getRepository(User);
    validated.password = await hash(validated.password, 10);

    console.log(validated.decoded);
    const findUser = await userRepository.findOneBy({
      email: decoded,
    });
    console.log(findUser);

    if (validated.isAdm && findUser && !findUser.isAdm) {
      return { status: 401, message: { error: "Missing Admin Permission" } };
    }
    const user = await userRepository.save(validated);

    return { status: 201, message: user };
  };
}

export default new UserService();

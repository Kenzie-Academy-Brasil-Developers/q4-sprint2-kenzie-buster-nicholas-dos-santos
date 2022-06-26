import User from "../entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      decoded: string;
      validated: User;
    }
  }
}

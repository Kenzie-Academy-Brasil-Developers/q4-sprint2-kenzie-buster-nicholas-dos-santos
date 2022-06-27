import { Request, Response } from "express";
import CartService from "../services/cart.service";

class CartController {
  updateCart = async (req: Request, res: Response) => {
    const paied = await CartService.paidCart(req);

    return res.status(paied.status).json(paied.message);
  };
}

export default new CartController();

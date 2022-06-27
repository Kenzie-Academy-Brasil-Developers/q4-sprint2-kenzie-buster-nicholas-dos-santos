import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Dvd } from "../entities/dvd.entity";
import { Stock } from "../entities/stock.entity";
import { Cart } from "../entities/cart.entity";
import { User } from "../entities/user.entity";

class DvdService {
  createDvd = async (req: Request) => {
    const dvdRepository = AppDataSource.getRepository(Dvd);
    const stockRepository = AppDataSource.getRepository(Stock);

    if (req.decoded) {
      const stock = new Stock();
      stock.price = req.body.price;
      stock.quantity = req.body.quantity;

      stockRepository.create(stock);
      await stockRepository.save(stock);

      const dvd = new Dvd();
      dvd.name = req.body.name;
      dvd.duration = req.body.duration;
      dvd.stock = stock;

      dvdRepository.create(dvd);
      await dvdRepository.save(dvd);

      return { status: 201, message: dvd };
    } else {
      return { status: 401, message: { error: "Missing Authorization Token" } };
    }
  };

  getAll = async () => {
    const dvdRepository = AppDataSource.getRepository(Dvd);

    const dvds = await dvdRepository.find();

    return { status: 200, message: dvds };
  };

  buyDvd = async (req: Request) => {
    const dvdRepository = AppDataSource.getRepository(Dvd);
    const userRepository = AppDataSource.getRepository(User);
    const cartRepository = AppDataSource.getRepository(Cart);
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return { status: 401, message: { error: "missing authorization token" } };
    }

    const dvdToFind = req.params.dvdid;

    const dvdFound = await dvdRepository.findOneBy({ id: dvdToFind });
    if (!dvdFound) {
      return { status: 404, message: { error: "Dvd not found" } };
    }

    if (dvdFound.stock.quantity < req.body.quantity) {
      return {
        status: 422,
        message: {
          error: `current stock: ${dvdFound.stock.quantity}, received demand ${req.body.quantity}`,
        },
      };
    }

    const newUser = await userRepository.findOneBy({ email: req.decoded });

    if (dvdFound && newUser) {
      const dvdCart = new Cart();
      dvdCart.dvd = dvdFound;
      dvdCart.newUser = newUser;
      dvdCart.paid = false;
      dvdCart.total = dvdFound.stock.price * req.body.quantity;

      cartRepository.create(dvdCart);
      await cartRepository.save(dvdCart);

      return { status: 201, message: dvdCart };
    }

    return { status: 400, message: "error" };
  };
}

export default new DvdService();

import { AppDataSource } from "../data-source";
import { Cart } from "../entities/cart.entity";
import { User } from "../entities/user.entity";
import { Request } from "express";
import { Dvd } from "../entities/dvd.entity";
import { Stock } from "../entities/stock.entity";
class CartService {
  paidCart = async (req: Request) => {
    const userRepository = AppDataSource.getRepository(User);
    const cartRepository = AppDataSource.getRepository(Cart);
    const dvdRepository = AppDataSource.getRepository(Dvd);
    const stockRepository = AppDataSource.getRepository(Stock);
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return { status: 401, message: { error: "missing authorization token" } };
    }

    const myUser = await userRepository.findOneBy({
      email: req.decoded,
    });

    const allCart = await cartRepository.find();

    if (myUser) {
      for (let i = 0; i < allCart.length; i++) {
        if (allCart[i].newUser.id === myUser.id) {
          await cartRepository.update(allCart[i].id, { paid: true });
        }
      }
      const cartUpdated = await cartRepository.find();

      for (let i = 0; i < cartUpdated.length; i++) {
        if (cartUpdated[i].newUser.id === myUser.id) {
          const dvdFound = await dvdRepository.findOneBy({
            id: cartUpdated[i].dvd.id,
          });

          if (dvdFound) {
            const numberOfDvdsBuyed =
              cartUpdated[i].total / dvdFound.stock.price;
            const newQuantity = dvdFound.stock.quantity - numberOfDvdsBuyed;

            console.log(dvdFound.stock.id);

            dvdFound.stock.quantity = newQuantity;
            await stockRepository.update(dvdFound.stock.id, {
              quantity: newQuantity,
            });
          }
        }
      }
      const cartRepo = await cartRepository.find();
      const updated = [];
      for (let i = 0; i < cartRepo.length; i++) {
        if (cartRepo[i].newUser.id === myUser.id) {
          const dvdFound = await dvdRepository.findOneBy({
            id: cartUpdated[i].dvd.id,
          });

          updated.push(cartRepo[i]);
        }
      }
      return { status: 201, message: updated };
    }
    return { status: 400, message: "error" };
  };
}
export default new CartService();

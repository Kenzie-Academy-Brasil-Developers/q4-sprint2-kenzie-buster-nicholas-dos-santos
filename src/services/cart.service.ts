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
      return { status: 401, message: { error: "Missing authorization token" } };
    }

    const myUser = await userRepository.findOneBy({
      email: req.decoded,
    });

    const allCart = await cartRepository.find();

    for (let i = 0; i < allCart.length; i++) {
      if (allCart[i].newUser.id === myUser!.id) {
        allCart[i].paid = true;

        await cartRepository.save(allCart[i]);

        const dvdFound = await dvdRepository.findOneBy({
          id: allCart[i].dvd.id,
        });
        if (dvdFound) {
          const numberOfDvdsBuyed = allCart[i].total / dvdFound.stock.price;
          const newQuantity = dvdFound.stock.quantity - numberOfDvdsBuyed;

          const myStock = await stockRepository.findOneBy({
            id: dvdFound.stock.id,
          });

          await stockRepository.update(myStock!.id, { quantity: newQuantity });
          // const { newUser, ...myCart } = allCart[i];

          const myCart = {
            id: allCart[i].id,
            paid: allCart[i].paid,
            total: allCart[i].total,
            dvd: {
              id: allCart[i].dvd.id,
              name: allCart[i].dvd.name,
              duration: allCart[i].dvd.duration,
            },
          };

          return { status: 200, message: myCart };
        }
      }
    }
  };
}
export default new CartService();

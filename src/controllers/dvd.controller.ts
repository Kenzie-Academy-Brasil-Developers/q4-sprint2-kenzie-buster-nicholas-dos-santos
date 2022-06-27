import { Request, Response } from "express";
import DvdService from "../services/dvd.service";

class DvdController {
  createDvdController = async (req: Request, res: Response) => {
    const dvd = await DvdService.createDvd(req);

    return res.status(dvd.status).json(dvd.message);
  };
  getAllDvdsController = async (_: Request, res: Response) => {
    const allDvds = await DvdService.getAll();

    return res.status(allDvds.status).json(allDvds.message);
  };

  buyDvdController = async (req: Request, res: Response) => {
    const buyer = await DvdService.buyDvd(req);

    return res.status(buyer.status).json(buyer.message);
  };
}

export default new DvdController();

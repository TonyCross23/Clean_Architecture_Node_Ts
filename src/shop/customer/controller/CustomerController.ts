import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
import { CustomerInteractor } from "../interactors/CustomerInteractor";

@injectable()
export class CustomerController {
  constructor(
    @inject(INTERFACE_TYPE.CustomerInteractor) private interactor: CustomerInteractor
  ) {
    this.interactor = interactor
  }

  async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body
      const customer = this.interactor.onCreateCustomer(data)
      return customer
    } catch (error) {
      next(error)
    }
  }

  getAllCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('customer')
      const customer = await this.interactor.getAllCustomer()
      res.status(200).json({
        message: "customers retrieved successfully",
        data: customer
      })
      return customer
    } catch (error) {
      next(error)
    }
  }
}
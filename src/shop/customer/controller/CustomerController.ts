import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
import { CustomerInteractor } from "../interactors/CustomerInteractor";
import { catchAsync } from "../../../test/utils/catchAsync";
import { HttpStatusCodes } from "../../../config/HttpStatusCode";

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

  getAllCustomer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const customer = await this.interactor.getAllCustomer()
    return res.status(HttpStatusCodes.CREATED).json({
      success: true,
      message: "Customers",
      data: customer
    })
  })
}
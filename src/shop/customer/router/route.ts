import { Router } from "express";
import container from "../config/container";
import { CustomerController } from "../controller/CustomerController";
import { INTERFACE_TYPE } from "../utils";

const customerRoute = Router()

const controller = container.get<CustomerController>(INTERFACE_TYPE.CustomerController)

// customerRoute.get("/message", (req, res) => {
//   res.json({ message: "Hello mm" })
// })
customerRoute.post("/create", controller.createCustomer.bind((controller)))
customerRoute.get("/", controller.getAllCustomer)

export default customerRoute
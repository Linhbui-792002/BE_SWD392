import express from "express";
import {
  getListCustomer,
  getOneCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controller/customers.js";

const customersRouter = express.Router();

customersRouter.get("/", getListCustomer);

customersRouter.get("/:id", getOneCustomer);

customersRouter.post("/", createCustomer);

customersRouter.patch("/:id", updateCustomer);

customersRouter.delete("/:id", deleteCustomer);

export default customersRouter;

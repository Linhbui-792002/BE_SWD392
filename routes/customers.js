import express from "express";
import cors from "cors";

import {
  getListCustomer,
  getOneCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controller/customers.js";

const customersRouter = express.Router();
customersRouter.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
customersRouter.get("/", getListCustomer);

customersRouter.get("/:id", getOneCustomer);

customersRouter.post("/", createCustomer);

customersRouter.patch("/:id", updateCustomer);

customersRouter.delete("/:id", deleteCustomer);

export default customersRouter;

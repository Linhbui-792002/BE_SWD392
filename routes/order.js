import express from "express";
import cors from "cors";

import { getOrder, createOrder, deleteOrder } from "../controller/order.js";
const orderRouter = express.Router();
orderRouter.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
orderRouter.get("/:id", getOrder);

orderRouter.post("/:id", createOrder);

orderRouter.delete("/:id", deleteOrder);

export default orderRouter;

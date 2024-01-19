import express from "express";
import { getOrder, createOrder, deleteOrder } from "../controller/order.js";
const orderRouter = express.Router();

orderRouter.get("/:id", getOrder);

orderRouter.post("/:id", createOrder);

orderRouter.delete("/:id", deleteOrder);

export default orderRouter;

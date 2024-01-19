import express from "express";
import { getCart, creatCartItem, deleteCart } from "../controller/cart.js";

const cartRouter = express.Router();

cartRouter.get("/:id", getCart);

cartRouter.post("/:id?", creatCartItem);

cartRouter.delete("/:id", deleteCart);

export default cartRouter;

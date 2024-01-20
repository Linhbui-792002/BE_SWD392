import express from "express";
import cors from "cors";

import { getCart, creatCartItem, deleteCart } from "../controller/cart.js";

const cartRouter = express.Router();
cartRouter.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
cartRouter.get("/:id", getCart);

cartRouter.post("/:id?", creatCartItem);

cartRouter.delete("/:id", deleteCart);

export default cartRouter;

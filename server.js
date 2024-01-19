import express from "express";
import * as dotenv from "dotenv";
import connect from "./database/connection.js";
dotenv.config();

import customersRouter from "./routes/customers.js";
import booksRouter from "./routes/books.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";

const app = express();
const port = process.env.PORT || 9999;
app.use(express.json());

app.use("/customers", customersRouter);

app.use("/books", booksRouter);

app.use("/cart", cartRouter);

app.use("/order", orderRouter);

app.listen(port, async () => {
  await connect();
  console.log(`server running in port ${port}`);
});

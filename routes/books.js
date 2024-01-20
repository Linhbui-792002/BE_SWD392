import express from "express";
import cors from "cors";

import {
  createBook,
  updateBook,
  deleteBook,
  getlistBook,
  getOneBook,
} from "../controller/books.js";
const booksRouter = express.Router();

booksRouter.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
booksRouter.post("/", createBook);
booksRouter.patch("/:id", updateBook);
booksRouter.delete("/:id", deleteBook);
booksRouter.get("/", getlistBook);
booksRouter.get("/:id", getOneBook);

export default booksRouter;

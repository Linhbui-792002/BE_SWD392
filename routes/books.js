import express from "express";
import {
  createBook,
  updateBook,
  deleteBook,
  getlistBook,
  getOneBook,
} from "../controller/books.js";
const booksRouter = express.Router();

booksRouter.post("/", createBook);
booksRouter.patch("/:id", updateBook);
booksRouter.delete("/:id", deleteBook);
booksRouter.get("/", getlistBook);
booksRouter.get("/:id", getOneBook);

export default booksRouter;

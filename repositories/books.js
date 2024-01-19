import mongoose from "mongoose";
import Book from "../model/book.js";

const createOneBook = async ({ name, price, author, stock_quantity }) => {
  try {
    const books = await Book.create({
      _id: new mongoose.Types.ObjectId(),
      name,
      price,
      author,
      stock_quantity,
    });
    return {
      ...books._doc,
    };
  } catch (exception) {
    console.error(exception);
    throw new Error("An error occurred while adding book");
  }
};

const updateOneBook = async ({
  bookId,
  name,
  price,
  author,
  stock_quantity,
}) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $set: { name, price, author, stock_quantity } },
      { new: true }
    );
    if (!updatedBook) {
      throw new Error("Book not found");
    }
    return {
      ...updatedBook._doc,
    };
  } catch (exception) {
    console.error(exception);
    throw new Error("An error occurred while adding book");
  }
};

const deleteOneBook = async ({ bookId }) => {
  try {
    const updatedBook = await Book.findByIdAndDelete(bookId).exec();
    if (!updatedBook) {
      throw new Error("Book not found");
    }
    return {
      ...updatedBook._doc,
    };
  } catch (exception) {
    console.error(exception);
    throw new Error("An error occurred while adding book");
  }
};

const getAllBook = async () => {
  try {
    const listBook = await Book.find();
    return listBook;
  } catch (exception) {
    console.error(exception);
    throw new Error("An error occurred while adding book");
  }
};
const getBookById = async ({ bookId }) => {
  try {
    const book = await Book.findById(bookId).exec();
    if (!book) {
      throw new Error("Book not found");
    }
    return { ...book._doc };
  } catch (exception) {
    console.error(exception);
    throw new Error("An error occurred while adding book");
  }
};

export { createOneBook, updateOneBook, deleteOneBook, getAllBook, getBookById };

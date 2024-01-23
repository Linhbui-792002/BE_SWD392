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
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      throw new Error("Invalid customer ID");
    }
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $set: { name, price, author, stock_quantity } },
      { new: true }
    );
    if (!updatedBook) {
       return null;
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
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      throw new Error("Invalid customer ID");
    }
    const updatedBook = await Book.findByIdAndDelete(bookId).exec();
    if (!updatedBook) {
       return null;
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

const getAllBook = async ({ name }) => {
  try {
    const listBook = await Book.find({
      name: { $regex: new RegExp(name, "i") },
    });
    return listBook;
  } catch (exception) {
    console.error(exception);
    throw new Error("An error occurred while adding book");
  }
};
const getBookById = async ({ bookId }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return null;
      throw new Error("Invalid customer ID");
    }
    const book = await Book.findById(bookId).exec();
    if (!book) {
      return null;
      throw new Error("Book not found");
    }
    return { ...book._doc };
  } catch (exception) {
    console.error(exception);
    throw new Error("An error occurred while adding book");
  }
};

export { createOneBook, updateOneBook, deleteOneBook, getAllBook, getBookById };

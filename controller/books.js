import {
  createOneBook,
  updateOneBook,
  deleteOneBook,
  getAllBook,
  getBookById,
} from "../repositories/books.js";
import mongoose from "mongoose";

const createBook = async (req, res) => {
  try {
    const book = await createOneBook({ ...req.body });
    res.status(200).json({
      status: 200,
      message: "create book successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: exception.toString(),
      validationErrors: exception.validationErrors,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const isValidObjectId = mongoose.isValidObjectId(bookId);

    if (!isValidObjectId) {
      res.status(400).json({ status: 400, error: "Invalid ObjectId" });
    }

    const book = await updateOneBook({ bookId, ...req.body });
    res.status(200).json({
      status: 200,
      message: "update book successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: exception.toString(),
      validationErrors: exception.validationErrors,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const isValidObjectId = mongoose.isValidObjectId(bookId);

    if (!isValidObjectId) {
      res.status(400).json({ status: 400, error: "Invalid ObjectId" });
    }

    const book = await deleteOneBook({ bookId });
    res.status(200).json({
      status: 200,
      message: "Delete book successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: exception.toString(),
      validationErrors: exception.validationErrors,
    });
  }
};

const getlistBook = async (req, res) => {
  try {
    const name = req.query.name || "";
    const listBook = await getAllBook({ name });
    res.status(200).json({
      status: 200,
      message: "get list book successfully",
      data: listBook,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: exception.toString(),
    });
  }
};

const getOneBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const isValidObjectId = mongoose.isValidObjectId(bookId);

    if (!isValidObjectId) {
      res.status(400).json({ status: 400, error: "Invalid ObjectId" });
    }

    const book = await getBookById({ bookId });
    res.status(200).json({
      status: 200,
      message: "get one book successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: exception.toString(),
    });
  }
};


export { createBook, updateBook, deleteBook, getlistBook, getOneBook };

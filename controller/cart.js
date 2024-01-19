import {
  createCart,
  deleteCartById,
  getCartByCustomerId,
} from "../repositories/cart.js";
import mongoose from "mongoose";

const getCart = async (req, res) => {
  try {
    const customerId = req.params.id;
    const isValidObjectId = mongoose.isValidObjectId(customerId);

    if (!isValidObjectId) {
      return res.status(400).json({ status: 400, error: "Invalid ObjectId" });
    }

    const cart = await getCartByCustomerId({ customerId });

    return res.status(200).json({
      status: 200,
      message: "Get cart successfully",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: error.toString(),
    });
  }
};
const creatCartItem = async (req, res) => {
  try {
    const cartId = req.params.id;
    const isValidObjectId = mongoose.isValidObjectId(cartId);

    if (!isValidObjectId && cartId) {
      return res.status(400).json({ status: 400, error: "Invalid ObjectId" });
    }

    const cart = await createCart({ cartId, ...req.body });

    return res.status(200).json({
      status: 200,
      message: "Create cart successfully",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: error.toString(),
    });
  }
};

const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const isValidObjectId = mongoose.isValidObjectId(cartId);

    if (!isValidObjectId && cartId) {
      return res.status(400).json({ status: 400, error: "Invalid ObjectId" });
    }

    const cart = await deleteCartById({ cartId });

    return res.status(200).json({
      status: 200,
      message: "Delete cart successfully",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: error.toString(),
    });
  }
};

export { getCart, creatCartItem, deleteCart };

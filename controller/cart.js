import {
  createCart,
  deleteCartById,
  getCartByCustomerId,
  deleteCartItem,
  updateCartItemQuantity,
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
      res.status(400).json({ status: 400, error: "Invalid ObjectId" });
    }

    const cart = await deleteCartById({ cartId });
    if (!cart) {
      res.status(404).json({
        status: 404,
        message: "Delete cart error",
      });
      return;
    }
    res.status(200).json({
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

const updateCartItem = async (req, res) => {
  try {
    const { cartId, bookItemId, newQuantity } = req.body;

    const updatedCart = await updateCartItemQuantity({
      cartId,
      bookItemId,
      newQuantity,
    });

    res.status(200).json({
      status: 200,
      message: "Update cart item quantity successfully",
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.toString(),
    });
  }
};

const deleteCartItems = async (req, res) => {
  try {
    const { cartId, bookItemId } = req.body;
    console.log({ cartId, bookItemId },"{ cartId, bookItemId }");
    const updatedCart = await deleteCartItem({ cartId, bookItemId });

    res.status(200).json({
      status: 200,
      message: "Delete cart item successfully",
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.toString(),
    });
  }
};

export { getCart, creatCartItem, deleteCart, updateCartItem, deleteCartItems };

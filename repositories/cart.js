import mongoose from "mongoose";
import BookItem from "../model/bookItem.js";
import Book from "../model/book.js";
import Cart from "../model/cart.js";

const createCart = async ({ cartId, bookId, quantity, customerId }) => {
  try {
    let cart = await Cart.findById(cartId);

    if (!cart) {
      cart = new Cart({
        _id: new mongoose.Types.ObjectId(),
        items: [{ _id: new mongoose.Types.ObjectId(), book: bookId, quantity }],
        customerId,
      });
    } else {
      const existingItemIndex = cart.items.findIndex((item) =>
        item.book.equals(bookId)
      );

      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += 1;
      } else {
        cart.items.push({
          _id: new mongoose.Types.ObjectId(),
          book: bookId,
          quantity,
        });
      }
    }

    const updatedCart = await cart.save();
    return {
      ...updatedCart._doc,
    };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while adding cart");
  }
};

const deleteCartById = async ({ cartId }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      return null;
      throw new Error("Invalid cart ID");
    }
    const existingCart = await Cart.findById(cartId);
    if (!existingCart) {
      return null;
      throw new Error("Cart not found");
    }
    existingCart.items = [];
    await existingCart.save();
    return {
      ...existingCart._doc,
    };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while delete cart");
  }
};

const getCartByCustomerId = async ({ customerId }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return null;
      throw new Error("Invalid customer ID");
    }

    const existingCart = await Cart.findOne({ customerId })
      .populate({
        path: "items.book", // Assuming 'book' is the reference field in the 'items' array
        model: "Book", // Replace with the actual model name for Book
        select: "name price", // Include only the 'price' field from the Book model
      })
      .exec();

    if (!existingCart) {
      return null;
      throw new Error("Cart not found");
    }

    return { ...existingCart._doc };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while getting the cart");
  }
};
const updateCartItemQuantity = async ({ cartId, bookItemId, newQuantity }) => {
  try {
    const cart = await Cart.findById(cartId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    const bookItemIndex = cart.items.findIndex((item) =>
      item._id.equals(bookItemId)
    );

    if (bookItemIndex !== -1) {
      // BookItem found, update the quantity
      cart.items[bookItemIndex].quantity = newQuantity;
      const updatedCart = await cart.save();
      return { ...updatedCart._doc };
    } else {
      throw new Error("BookItem not found in the Cart");
    }
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while updating the quantity");
  }
};
const deleteCartItem = async ({ cartId, bookItemId }) => {
  try {
    const cart = await Cart.findById(cartId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    // Remove the entire BookItem from the items array
    cart.items = cart.items.filter((item) => !item._id.equals(bookItemId));

    const updatedCart = await cart.save();
    return { ...updatedCart._doc };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while deleting the BookItem");
  }
};

export {
  createCart,
  deleteCartById,
  getCartByCustomerId,
  updateCartItemQuantity,
  deleteCartItem,
};

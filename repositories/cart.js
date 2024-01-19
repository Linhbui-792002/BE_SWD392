import mongoose from "mongoose";
import BookItem from "../model/bookItem.js";
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
        cart.items[existingItemIndex].quantity = quantity;
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
    const existingCart = await Cart.findById(cartId);
    if (!existingCart) {
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
    const existingCart = await Cart.findOne({ customerId }).exec();
    if (!existingCart) {
      throw new Error("Cart not found");
    }
    return { ...existingCart._doc };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while get cart");
  }
};
export { createCart, deleteCartById, getCartByCustomerId };

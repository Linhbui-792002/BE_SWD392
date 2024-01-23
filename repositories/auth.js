import mongoose from "mongoose";

import Customer from "../model/customer.js";
import Fullname from "../model/fullname.js";
import Account from "../model/account.js";
import Address from "../model/address.js";
import Cart from "../model/cart.js";

const loginAccount = async ({ username, password }) => {
  try {
    const account = await Account.findOne({ username, password });
    console.log(account, "account");
    if (!account) {
      return null;
      //   throw new Error("Invalid username or password");
    }
    const customer = await Customer.findOne({ account: account._id }).populate(
      "fullname"
    );

    if (!customer) {
      return null;
      throw new Error("Customer not found");
    }
    const role = account.role;
    // Lấy ra customerId và role từ customer
    const { _id: customerId } = customer;

    const cart = await Cart.findOne({ customerId });

    return { customerId, role, cartId: cart ? cart._id : null };
  } catch (exception) {
    console.error(exception);
    throw new Error("An error occurred while adding book");
  }
};

export { loginAccount };

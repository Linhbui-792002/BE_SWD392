import mongoose from "mongoose";
import {
  createOrderByCustomerId,
  deleteOrderByOrderId,
  getListOrderByCustomerId
} from "../repositories/order.js";

const getOrder = async (req, res) => {
     try {
    const customerId = req.params.id;
    const isValidObjectId = mongoose.isValidObjectId(customerId);

    if (!isValidObjectId) {
      return res.status(400).json({ status: 400, error: "Invalid ObjectId" });
    }

    const order = await getListOrderByCustomerId({ customerId });

    return res.status(200).json({
      status: 200,
      message: "Get list order successfully",
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: error.toString(),
    });
  }
};
const createOrder = async (req, res) => {
  try {
    const customerId = req.params.id;
    const isValidObjectId = mongoose.isValidObjectId(customerId);

    if (!isValidObjectId) {
      return res.status(400).json({ status: 400, error: "Invalid ObjectId" });
    }

    const order = await createOrderByCustomerId({ customerId, ...req.body });

    return res.status(200).json({
      status: 200,
      message: "Create order successfully",
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: error.toString(),
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const isValidObjectId = mongoose.isValidObjectId(orderId);

    if (!isValidObjectId) {
      return res.status(400).json({ status: 400, error: "Invalid ObjectId" });
    }

    const order = await deleteOrderByOrderId({ orderId });

    return res.status(200).json({
      status: 200,
      message: "Delete order successfully",
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: error.toString(),
    });
  }
};

export { getOrder, createOrder, deleteOrder };

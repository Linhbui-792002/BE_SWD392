import Order from "../model/order.js";
import mongoose from "mongoose";

const createOrderByCustomerId = async ({
  customerId,
  items,
  paymentId,
  shipmentId,
}) => {
  try {
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      customer: customerId,
      items: items,
      payment: paymentId,
      shipment: shipmentId,
    });

    await order.save();
    return { ...order._doc };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while get order");
  }
};


const deleteOrderByOrderId = async ({orderId}) => {
  try {
    const isValidObjectId = mongoose.isValidObjectId(orderId);
    if (!isValidObjectId) {
      throw new Error("Invalid ObjectId");
    }

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      throw new Error("Order not found");
    }

    return { ...deletedOrder._doc };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while deleting the order");
  }
};

const getListOrderByCustomerId = async ({customerId})=>{
    try {

    const orders = await Order.find({ customer: customerId });

    return orders.map(order => ({ ...order._doc }));
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while getting the list of orders");
  }
}

export { createOrderByCustomerId ,deleteOrderByOrderId, getListOrderByCustomerId};

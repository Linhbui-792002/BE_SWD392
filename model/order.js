import mongoose, { ObjectId, Schema } from "mongoose";
import BookItem from "./bookItem.js";
export default mongoose.model(
  "Order",
  new Schema(
    {
      _id: { type: ObjectId },
      items: [BookItem.schema],
      customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
      payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
      shipment: { type: mongoose.Schema.Types.ObjectId, ref: "Shipment" },
    },
    {
      versionKey: false,
    }
  )
);

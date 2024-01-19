import mongoose, { ObjectId, Schema } from "mongoose";
import BookItem from "./bookItem.js";
export default mongoose.model(
  "Cart",
  new Schema(
    {
      _id: { type: ObjectId },
      items: [BookItem.schema],
      customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    },
    {
      versionKey: false,
    }
  )
);

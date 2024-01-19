import mongoose, { ObjectId, Schema } from "mongoose";

export default mongoose.model(
  "Book",
  new Schema(
    {
      _id: { type: ObjectId },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      stock_quantity: {
        type: Number,
        required: true,
      },
    },
    {
      versionKey: false,
    }
  )
);

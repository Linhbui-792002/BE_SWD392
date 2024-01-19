import mongoose, { ObjectId, Schema } from "mongoose";

export default mongoose.model(
  "BookItem",
  new Schema(
    {
      _id: { type: ObjectId },
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
      quantity: {
        type: Number,
        required: true,
      }
    },
    {
      versionKey: false,
    }
  )
);

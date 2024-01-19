import mongoose, { ObjectId, Schema } from "mongoose";
export default mongoose.model(
  "Payment",
  new Schema(
    {
      _id: { type: ObjectId },
      name: {
        type: String,
        required: true,
      },
    },
    {
      versionKey: false,
    }
  )
);

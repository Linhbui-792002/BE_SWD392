import mongoose, { ObjectId, Schema } from "mongoose";

export default mongoose.model(
  "Address",
  new Schema(
    {
      _id: { type: ObjectId },
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    },
    {
      versionKey: false,
    }
  )
);

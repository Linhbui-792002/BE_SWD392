import mongoose, { ObjectId, Schema } from "mongoose";

export default mongoose.model(
  "Account",
  new Schema(
    {
      _id: { type: ObjectId },
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["CUSTOMER", "STAFF"],
        default: "CUSTOMER",
      },
    },
    {
      versionKey: false,
    }
  )
);

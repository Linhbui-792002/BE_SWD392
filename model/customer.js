import mongoose, { ObjectId, Schema } from "mongoose";

export default mongoose.model(
  "Customer",
  new Schema(
    {
      _id: { type: ObjectId },
      phone: {
        type: Number,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      fullname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fullname",
      },
      addresses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Address",
        },
      ],
      account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
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

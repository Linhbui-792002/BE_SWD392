import mongoose, { ObjectId, Schema } from "mongoose";

export default mongoose.model(
  "Account",
  new Schema(
    {
      _id: { type: ObjectId },
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    {
      versionKey: false,
    }
  )
);

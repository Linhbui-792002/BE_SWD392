import mongoose, { ObjectId, Schema } from "mongoose";

export default mongoose.model(
  "Fullname",
  new Schema(
    {
      _id: { type: ObjectId },
      lastname: {
        type: String,
        required: true,
      },
      firstname: {
        type: String,
        required: true,
      },
      middname: {
        type: String,
        required: true,
      },
    },
    {
      versionKey: false,
    }
  )
);
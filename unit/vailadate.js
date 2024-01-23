import mongoose from "mongoose";

export const checkResObjectId = (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 400,

      message: "Invalid customer ID",
    });
  }
};

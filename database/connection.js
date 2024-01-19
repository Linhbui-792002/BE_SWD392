import mongoose from "mongoose";

const connect = async () => {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("connect mongoose successfull");
    return connection;
  } catch (error) {
    console.log("Cannot connect to mongoDb " + error);
  }
};

export default connect;

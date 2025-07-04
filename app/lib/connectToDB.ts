import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("db connected...");
  } catch (error) {
    console.log(error);
  }
}
export default connectToDB;

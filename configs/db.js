import mongoose from "mongoose";

export default async function ConectToDb() {
  try {
    if (mongoose.connections[0].readyState) {
      return false;
    } else {
      await mongoose.connect("mongodb://127.0.0.1:27017/next_auth");
    }
  } catch (error) {
    console.log("conect to db has error", { err: error });
  }
}

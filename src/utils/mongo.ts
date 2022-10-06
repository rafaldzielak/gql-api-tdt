import mongoose from "mongoose";
import config from "config";

export async function connectToMongo() {
  try {
    console.log(config.get("dbUri"));
    await mongoose.connect(config.get("dbUri"));
    console.log("Connected to DB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

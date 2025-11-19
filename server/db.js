// db.js
import mongoose from "mongoose";
import { config } from "./config.js";

await mongoose.connect(config.db.uri, { autoIndex: false });

mongoose.connection.on("connected", () => {
  console.log("📡 MongoDB connected via db.js");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

export default mongoose;

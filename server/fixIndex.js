import mongoose from "mongoose";

const run = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/stockDB");

    const collection = mongoose.connection.db.collection("iytems"); // correct collection

    // List indexes
    const indexes = await collection.indexes();
    console.log("Current indexes:", indexes);

    // Drop the problematic one if it exists
    const badIndex = indexes.find(i => i.name === "itemCode_1"); // correct index
    if (badIndex) {
      await collection.dropIndex("itemCode_1");
      console.log("✅ Dropped index itemCode_1");
    } else {
      console.log("ℹ️ Index itemCode_1 not found");
    }

    await mongoose.disconnect();
    console.log("✅ Done cleaning indexes");
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

run();

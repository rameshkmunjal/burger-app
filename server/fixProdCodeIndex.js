import mongoose from "mongoose";

const run = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/stockDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const collection = mongoose.connection.db.collection("items");

    // 1️⃣ Remove any documents with ProdCode null
    const deleteResult = await collection.deleteMany({ ProdCode: null });
    console.log(`✅ Removed ${deleteResult.deletedCount} documents with ProdCode: null`);

    // 2️⃣ Drop old unique index on ProdCode if exists
    const indexes = await collection.indexes();
    const prodCodeIndex = indexes.find(i => i.name === "ProdCode_1");
    if (prodCodeIndex) {
      await collection.dropIndex("ProdCode_1");
      console.log("✅ Dropped existing ProdCode_1 index");
    } else {
      console.log("ℹ️ ProdCode_1 index not found");
    }

    // 3️⃣ Recreate unique index on ProdCode
    await collection.createIndex({ ProdCode: 1 }, { unique: true });
    console.log("✅ Recreated unique index on ProdCode");

    await mongoose.disconnect();
    console.log("🎉 Done! Collection is clean and index fixed.");

  } catch (err) {
    console.error("❌ Error fixing ProdCode index:", err);
  }
};

run();

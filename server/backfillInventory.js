import mongoose from "mongoose";
import PurchaseModel from "./Schema/purchase.js";
import InventoryModel from "./Schema/inventory.js";

const run = async () => {
  await mongoose.connect("mongodb://localhost:27017/stockDB");

  const purchases = await PurchaseModel.find();

  for (const p of purchases) {
    await InventoryModel.updateOne(
      { id: p.id },
      {
        $setOnInsert: {
          id: p.id,
          balanceQty: p.quantity,
          releaseQty: 0,
          balanceAmt: p.amount,
          releaseAmt: 0,
          releases: [],
        },
      },
      { upsert: true }
    );
  }

  console.log("✅ Backfill complete");
  await mongoose.disconnect();
};

run();

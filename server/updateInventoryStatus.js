// updateInventoryStatus.js
import mongoose from 'mongoose';
import InventoryModel from './Schema/inventory.js'; // adjust path as needed

const MONGO_URI = 'mongodb://127.0.0.1:27017/stockDB'; // change DB name

const updateInventoryStatus = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Update where balanceQty = 0 --> status = 'out'
    const outResult = await InventoryModel.updateMany(
      { balanceQty: 0 },
      { $set: { status: 'out' } }
    );

    // Update all others to 'in-stock' if not already set
    const inStockResult = await InventoryModel.updateMany(
      { balanceQty: { $gt: 0 } },
      { $set: { status: 'in-stock' } }
    );

    console.log(`🟢 Updated ${outResult.modifiedCount} items to 'out'`);
    console.log(`🟢 Updated ${inStockResult.modifiedCount} items to 'in-stock'`);
  } catch (err) {
    console.error('❌ Error updating inventory:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

updateInventoryStatus();

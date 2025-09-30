import ItemModel from './Schema/itemNew.js';   // Correct path to your model
import { itemArr } from './data/items.js';  // Import JS array

async function importItems() {
  try {
    const operations = itemArr.map((item) => ({
      updateOne: {
        filter: { prodCode: item.code },
        update: {
          $setOnInsert: {
            id: item.code,
            prodCode: item.code,
            itemName: item.name,
            category: item.category,
            // minLvl & maxLvl will use default = 0
          },
        },
        upsert: true, // insert if not exists
      },
    }));

    const result = await ItemModel.bulkWrite(operations);
    console.log(
      `✅ Import finished. Inserted: ${result.upsertedCount}, Already existed: ${result.matchedCount}`
    );
  } catch (err) {
    console.error("❌ Error importing items:", err);
  }
}

export default importItems;

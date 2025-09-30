import PurchaseModel from "../Schema/purchase.js";
import InventoryModel from '../Schema/inventory.js';
import shortId from 'shortid';
import { sortOnItemId } from './CommonFunctions.js';
import { 
  mergeArraysByKey ,
  getFilteredData,
  getFilteredYealyData,
  getReleaseMasterData,
  mergeReleasedDataWithPurchaseList,
  getReleaseItemsAmountTotal,
  getCategoryWiseReleaseArray,
  getCategorySummary,
  getCategoryTotal
} from "./InventoryFunctions.js";
/*
export const add2Stock = async (req, res) => {
  try {
    const { id } = req.body;
    const buyItem = await PurchaseModel.findOne({ id });

    if (!buyItem) {
      return res.status(404).json({ message: "Purchase item not found" });
    }

    // mark purchase as added to stock
    buyItem.add2stock = true;

    const inventoryDoc = await InventoryModel.findOneAndUpdate(
      { id }, // match by unique id
      {
        $setOnInsert: {
          id,
          balanceQty: buyItem.quantity,
          releaseQty: 0,
          balanceAmt: buyItem.amount,
          releaseAmt: 0,
          releases: [],
        },
      },
      { new: true, upsert: true } // return updated/created doc
    );

    await buyItem.save();

    res.json(inventoryDoc);
  } catch (err) {
    console.error("❌ Error in add2Stock:", err.message);
    res.status(500).json({ message: err.message });
  }
};
*/

  

export const getInventoryList = async (req, res) => {
    try {
      const inventoryList = await InventoryModel.find().lean();
      const purchaseList = await PurchaseModel.find().lean();
      //console.log('inventory list : ', inventoryList);
      //console.log('purchase list : ', purchaseList);
  
    if (!inventoryList || !purchaseList) {
        res.status(404);
        throw new Error("inventory or purchase data could not be fetched");
      }
  
    const list = sortOnItemId(mergeArraysByKey(inventoryList, purchaseList));
   
  
    if (!list.length) {
        res.status(404);
        throw new Error("No matching records found");
      }
  
      //console.log("combined list : ", list);
      res.json(list); 
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: err.message });
    }
  };


  export const getSingleInventoryDetails=async(req, res)=>{
      //res.json("call made successfully");
      const inventory=await InventoryModel.findOne({'id':req.params.id}).lean();
      //console.log(inventory);

      const purchase=await PurchaseModel.findOne({'id':req.params.id}).lean();

      const obj =inventory.id === purchase.id ? { ...inventory, ...purchase } : null;

      if(obj !== null){
        res.json(obj);
      }else{
        res.status(500).json({message:'Bad Request'});
        throw new Error('response not received')
      }
  }
  export const releaseInventory = async (req, res) => {
    const { currentReleaseQty } = req.body;
  
    try {
      const purchase = await PurchaseModel.findOne({ id: req.params.id }).lean();
      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }
  
      const unitPrice = Number(purchase.amount) / Number(purchase.quantity);
      const currentReleaseAmt = Number(currentReleaseQty) * unitPrice;
      const releaseId = shortId.generate();
  
      const releaseEntry = {
        releaseId,
        qty: Number(currentReleaseQty),
        amt: Number(currentReleaseAmt),
        releaseDate: Date.now(),
        releasedTo: "Outlet-76",
        releasedBy: "Bubhuksha Foods",
      };
  
      const updatedItem = await InventoryModel.findOneAndUpdate(
        { id: req.params.id }, // match existing inventory
        {
          $push: { releases: releaseEntry },
          $inc: {
            balanceQty: -Number(currentReleaseQty),
            releaseQty: Number(currentReleaseQty),
            balanceAmt: -currentReleaseAmt,
            releaseAmt: currentReleaseAmt,
          },
        },
        { new: true } // update only, no insert
      ).lean();
  
      if (!updatedItem) {
        return res.status(404).json({ message: "Inventory record not found" });
      }
  
      //console.log("✅ updatedItem:", updatedItem);
  
      const obj =
        updatedItem.id === purchase.id ? { ...updatedItem, ...purchase } : null;
      res.json(obj);
    } catch (err) {
      console.error("❌ Error in releaseInventory:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  

  // API Call : to get monthly release list
  // Method : GET
  export const getMonthlyReleaseReport = async (req, res) => {
    const { month, year } = req.params;
    //console.log("month and year ", month, year);
  
    try {
      const [invList, purchaseList] = await Promise.all([
        InventoryModel.find().lean(),
        PurchaseModel.find().lean()
      ]);
  
      if (!invList?.length || !purchaseList?.length) {
        return res.status(404).json({ message: "inventory or purchase data could not be fetched" });
      }
  
      // Step 1: Flatten releases
      const releaseMasterData = getReleaseMasterData(invList);
  
      // Step 2: Merge with purchase list
      const mergedData = mergeReleasedDataWithPurchaseList(releaseMasterData, purchaseList);
  
      // Step 3: Filter by month/year
      const revisedList = getFilteredData(mergedData, month, year);
      const list= Array.isArray(revisedList) ? revisedList : [];
      const gt = getReleaseItemsAmountTotal(revisedList);
  
      res.json({gt:gt, revisedList : list});
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

  export const getYearlyReleaseReport = async (req, res) => {
    const { year } = req.params;
    //console.log("year  :  ", year);
  
    try {
      const [invList, purchaseList] = await Promise.all([
        InventoryModel.find().lean(),
        PurchaseModel.find().lean()
      ]);
  
      if (!invList?.length || !purchaseList?.length) {
        return res.status(404).json({ message: "inventory or purchase data could not be fetched" });
      }
  
      // Step 1: Flatten releases
      const releaseMasterData = getReleaseMasterData(invList);
  
      // Step 2: Merge with purchase list
      const mergedData = mergeReleasedDataWithPurchaseList(releaseMasterData, purchaseList);
  
      // Step 3: Filter by month/year
      const revisedList = getFilteredYealyData(mergedData, year);
  
      res.json(Array.isArray(revisedList) ? revisedList : []);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  
  
  

  /* DELETE API related functions */
export const deleteInventory= async (req, res) => {
    const inventory = await InventoryModel.findOne({ 'id': req.params.id })
  
    if (inventory) {
      await inventory.deleteOne()
      res.json({ message: 'clicked inventory record deleted' })
    } else {
      res.status(404)
      throw new Error('inventory not found')
    }
}




export const getCategoryWiseReleaseReport=async(req, res)=>{    
  const { month, year } = req.params;
    //console.log("month and year ", month, year);
  
    try {
      const [invList, purchaseList] = await Promise.all([
        InventoryModel.find().lean(),
        PurchaseModel.find().lean()
      ]);
  
      if (!invList?.length || !purchaseList?.length) {
        return res.status(404).json({ message: "inventory or purchase data could not be fetched" });
      }
  
      // Step 1: Flatten releases
      const releaseMasterData = getReleaseMasterData(invList);
  
      // Step 2: Merge with purchase list
      const mergedData = mergeReleasedDataWithPurchaseList(releaseMasterData, purchaseList);
      // Step 3: Filter by month/year
      const revisedList = getFilteredData(mergedData, month, year);
      let result=getCategoryWiseReleaseArray(revisedList);
      //console.log(result);
        if (result) {
            res.json(result);
        } else {
          res.status(404)
          throw new Error('record not found')
        
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }        
}
/*
export const getInventoryCategorySummary=async(req, res)=>{
      try {
        const [invList, purchaseList] = await Promise.all([
          InventoryModel.find().lean(),
          PurchaseModel.find().lean()
        ]);

        if (!invList?.length || !purchaseList?.length) {
          return res.status(404).json({ message: "inventory or purchase data could not be fetched" });
        }

        
        // Step 2: Merge with purchase list
        const mergedData = mergeReleasedDataWithPurchaseList(invList, purchaseList);
        let newArr=getCategorySummary(mergedData);
        let gt=getCategoryTotal(newArr);
        //console.log("line 194 :", newArr);
        if(newArr){
            res.json({summary:newArr, gt:gt});
        } else {
            res.status(404);
            throw new Error('inventoryList Not Found');
        }
            
      }catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
      }

}
*/

export const getInventoryCategorySummary= async (req, res) => {
  try {
    const inventoryList = await InventoryModel.find().lean();
    const purchaseList = await PurchaseModel.find().lean();
    //console.log('inventory list : ', inventoryList);
    //console.log('purchase list : ', purchaseList);

  if (!inventoryList || !purchaseList) {
      res.status(404);
      throw new Error("inventory or purchase data could not be fetched");
    }

  const list = mergeArraysByKey(inventoryList, purchaseList);
  //console.log('list : ', list);

  if (!list.length) {
      res.status(404);
      throw new Error("No matching records found");
    }

    let newArr=getCategorySummary(list);
        let gt=getCategoryTotal(newArr);
        //console.log("line 194 :", newArr);
        if(newArr){
            res.json({summary:newArr, gt:gt});
        } else {
            res.status(404);
            throw new Error('category summary Not Found');
        } 
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};



//----------------------------------------------


/**
 * Edit an existing release inside inventory
 */
export const editRelease = async (req, res) => {
  try {
    const { inventoryId, releaseId } = req.params;
    const { qty, amt, releasedTo, releasedBy } = req.body;

   // console.log("Editing release", releaseId, "for inventory", inventoryId);

    // 1️⃣ Find inventory by custom id
    const inventory = await InventoryModel.findOne({ id: inventoryId });
    if (!inventory) return res.status(404).send("Inventory not found");

    // 2️⃣ Find release by custom releaseId
    const release = inventory.releases.find(r => r.releaseId === releaseId);
    if (!release) return res.status(404).send("Release not found");

    // 3️⃣ Update release fields
    release.qty = qty;
    release.amt = amt;
    release.releasedTo = releasedTo;
    release.releasedBy = releasedBy;

    // 4️⃣ Recalculate totals from the releases array
    const totalReleasedQty = inventory.releases.reduce((sum, r) => sum + r.qty, 0);
    const totalReleasedAmt = inventory.releases.reduce((sum, r) => sum + r.amt, 0);

    // 5️⃣ Infer purchased totals (balance + release)
    const purchasedQty = inventory.balanceQty + inventory.releaseQty;
    const purchasedAmt = inventory.balanceAmt + inventory.releaseAmt;

    // 6️⃣ Update inventory totals
    inventory.releaseQty = totalReleasedQty;
    inventory.releaseAmt = totalReleasedAmt;
    inventory.balanceQty = purchasedQty - totalReleasedQty;
    inventory.balanceAmt = purchasedAmt - totalReleasedAmt;

    // 7️⃣ Save
    await inventory.save();

    res.json({
      message: "Release updated successfully",
      inventory,
    });
  } catch (err) {
    console.error("Error in editRelease:", err);
    res.status(500).send("Server error");
  }
};


export const deleteRelease = async (req, res) => {
  try {
    const { inventoryId, releaseId } = req.params;

    console.log("Deleting release", releaseId, "from inventory", inventoryId);

    // 1️⃣ Find inventory by custom id
    const inventory = await InventoryModel.findOne({ id: inventoryId });
    if (!inventory) return res.status(404).send("Inventory not found");

    // 2️⃣ Check if release exists
    const releaseIndex = inventory.releases.findIndex(r => r.releaseId === releaseId);
    if (releaseIndex === -1) return res.status(404).send("Release not found");

    // 3️⃣ Remove release
    inventory.releases.splice(releaseIndex, 1);

    // 4️⃣ Recalculate totals from updated releases array
    const totalReleasedQty = inventory.releases.reduce((sum, r) => sum + r.qty, 0);
    const totalReleasedAmt = inventory.releases.reduce((sum, r) => sum + r.amt, 0);

    // 5️⃣ Infer purchased totals (balance + release)
    const purchasedQty = inventory.balanceQty + inventory.releaseQty;
    const purchasedAmt = inventory.balanceAmt + inventory.releaseAmt;

    // 6️⃣ Update inventory totals
    inventory.releaseQty = totalReleasedQty;
    inventory.releaseAmt = totalReleasedAmt;
    inventory.balanceQty = purchasedQty - totalReleasedQty;
    inventory.balanceAmt = purchasedAmt - totalReleasedAmt;

    // 7️⃣ Save updated inventory
    await inventory.save();

    res.json({
      message: "Release deleted successfully",
      inventory,
    });
  } catch (err) {
    console.error("Error in deleteRelease:", err);
    res.status(500).send("Server error");
  }
};


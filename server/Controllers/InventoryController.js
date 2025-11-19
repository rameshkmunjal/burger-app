import PurchaseModel from "../Schema/purchase.js";
import InventoryModel from '../Schema/inventory.js';
import ItemModel from "../Schema/itemNew.js";

import shortId from 'shortid';
import { sortOnItemId, sortList } from './CommonFunctions.js';
import { 
  mergeArraysByKey ,
  getStatusListByKey,
  combineWithItemList,
  addBuyRecommendation,
  getFilteredData,
  getFilteredYealyData,
  getReleaseMasterData,
  mergeReleasedDataWithPurchaseList,
  getReleaseItemsAmountTotal,
  getCategoryWiseReleaseArray,
  getCategorySummary,
  getCategoryTotal
} from "./InventoryFunctions.js";
  

export const getInventoryList = async (req, res) => {
    try {
      const inventoryList = await InventoryModel.find({'status':'in-stock'}).lean();
      const purchaseList = await PurchaseModel.find().lean();
  
      if (!inventoryList.length || !purchaseList.length){
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

  export const getInventoryStatusList = async (req, res) => {
    try {
      const inventoryList = await InventoryModel.find().lean();
      const purchaseList = await PurchaseModel.find().lean();
      const itemList = await ItemModel.find().lean();
  
      if (!inventoryList.length || !purchaseList.length){
        res.status(404);
        throw new Error("inventory or purchase data could not be fetched");
      }
  
    const purchaseInventoryList = getStatusListByKey(inventoryList, purchaseList);
    const combinedList=combineWithItemList(purchaseInventoryList, itemList);   
    const list=addBuyRecommendation(combinedList);
  
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
      const invList=await InventoryModel.find().lean();
      console.log(invList);

      const purchase=await PurchaseModel.findOne({'id':req.params.id}).lean();

      const itemFound = invList.find(i => i.id === purchase.id);
      let obj={};
      if(purchase && itemFound ){
         obj = { ...itemFound, ...purchase };
      }      

      if(obj !== null){
        res.json(obj);
      }else{
        res.status(500).json({message:'Bad Request'});
        throw new Error('response not received')
      }
  }
 
  

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
      const revisedList = sortList(getFilteredData(mergedData, month, year));
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
 //const inventoryList = await InventoryModel.find({ status: 'in-stock' }).lean(); 
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


export const getInventoryCategorySummary= async (req, res) => {
  try {
    const inventoryList = await InventoryModel.find({ status: 'in-stock' }).lean();
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
    console.log("This is inventory :", inventory);
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



export const releaseInventory = async (req, res) => {
  const { date, currentReleaseQty } = req.body;

  try {
    // 1️⃣ Find related purchase
    const purchase = await PurchaseModel.findOne({ id: req.params.id }).lean();
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    // 2️⃣ Find corresponding inventory record
    const inventory = await InventoryModel.findOne({ id: req.params.id });
    if (!inventory) {
      return res.status(404).json({ message: "Inventory record not found" });
    }

    // 3️⃣ Validate stock before releasing
    if (inventory.balanceQty <= 0) {
      return res.status(400).json({ message: "Item is out of stock" });
    }

    if (inventory.balanceQty < Number(currentReleaseQty)) {
      return res
        .status(400)
        .json({ message: "Insufficient stock. Cannot release more than available." });
    }

    // 4️⃣ Compute release details
    const unitPrice = Number(purchase.amount) / Number(purchase.quantity);
    const currentReleaseAmt = Number(currentReleaseQty) * unitPrice;
    const releaseId = shortId.generate();

    const releaseEntry = {
      releaseId,
      qty: Number(currentReleaseQty),
      amt: Number(currentReleaseAmt),
      releaseDate: date,
      releasedTo: "Outlet-76",
      releasedBy: "Bubhuksha Foods",
    };

    // 5️⃣ Update inventory
    inventory.releases.push(releaseEntry);
    inventory.balanceQty -= Number(currentReleaseQty);
    inventory.releaseQty += Number(currentReleaseQty);
    inventory.balanceAmt -= currentReleaseAmt;
    inventory.releaseAmt += currentReleaseAmt;

    // Ensure no negative quantity
    if (inventory.balanceQty < 0) inventory.balanceQty = 0;

    // 6️⃣ Update status
    if (inventory.balanceQty === 0) {
      inventory.status = "out";
    } else {
      inventory.status = "in-stock";
    }

    // 7️⃣ Save changes
    const updatedItem = await inventory.save();

    // 8️⃣ Merge purchase + inventory info for frontend
    const obj =
      updatedItem.id === purchase.id
        ? { ...updatedItem.toObject(), ...purchase }
        : null;

    res.json(obj);
  } catch (err) {
    console.error("❌ Error in releaseInventory:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};




export const add2Stock = async (req, res) => {
  try {
    const { id } = req.params; // ✅ correct destructuring

    const purchaseItem = await PurchaseModel.findOne({ id });
    
    //check if purchase record does not exist 
    if(!purchaseItem){
      res.status(404);
      throw new Error("purchase data could not be fetched");
    }
    const {quantity, amount}=purchaseItem;

    // ✅ check if record already exists
    const existing = await InventoryModel.findOne({ id });
    if (existing) {
      return res.status(400).json({
        message: "Inventory record already exists for this purchase id",
      });
    }

    // ✅ create inventory record
    const newInventory = await InventoryModel.create({
      id,
      balanceQty: quantity,
      balanceAmt: amount,
      releaseQty: 0,
      releaseAmt: 0,
      releases: [],
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Inventory record created successfully",
      inventory: newInventory,
    });
  } catch (error) {
    console.error("❌ Error creating inventory:", error);
    res.status(500).json({
      message: "Server error while creating inventory",
      error: error.message,
    });
  }
};



export const editInventory = async (req, res) => {
  try {
    const { id } = req.params; // ✅ correct destructuring
    const {balanceAmt, balanceQty}=req.body;

    const inventoryItem = await InventoryModel.findOne({ id });
    
    //check if purchase record does not exist 
    if(!inventoryItem){
      res.status(404);
      throw new Error("inventory data could not be fetched");
    }
    inventoryItem.balanceQty = Number(balanceQty);
    inventoryItem.balanceAmt = Number(balanceAmt);
    await inventoryItem.save();
    res.json({
      message: "Inventory Item updated successfully",
      inventoryItem,
    });

  } catch (error) {
    console.error("❌ Error editing inventory:", error);
    res.status(500).json({
      message: "Server error while editing inventory",
      error: error.message,
    });
  }
};

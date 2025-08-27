import PurchaseModel from "../Schema/purchase.js";
import InventoryModel from '../Schema/inventory.js';
import shortId from 'shortid';
import { 
  mergeArraysByKey ,
  getFilteredData,
  getFilteredYealyData,
  getReleaseMasterData,
  mergeReleasedDataWithPurchaseList,
  getReleaseItemsAmountTotal

} from "./InventoryFunctions.js";

export const add2Stock = async (req, res) => {
    try {
      const { id } = req.body;
      const buyItem = await PurchaseModel.findOne({ id });
  
      if (!buyItem) {
        return res.status(404).json({ message: "Purchase item not found" });
      }
  
      buyItem.add2stock = true;
  
      const item = new InventoryModel({
        id,
        balanceQty: buyItem.quantity,
        balanceAmt: buyItem.amount,
        // releases: []   // 👈 ensure no null releaseId is created
      });
  
      console.log("item", item);
  
      const result = await item.save();
      await buyItem.save();
  
      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: err.message });
    }
  };
  

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
  
    const list = mergeArraysByKey(inventoryList, purchaseList);
    console.log('list : ', list);
  
    if (!list.length) {
        res.status(404);
        throw new Error("No matching records found");
      }
  
      console.log("combined list : ", list);
      res.json(list); 
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: err.message });
    }
  };


  export const getSingleInventoryDetails=async(req, res)=>{
      //res.json("call made successfully");
      const inventory=await InventoryModel.findOne({'id':req.params.id}).lean();
      console.log(inventory);

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
  
    const purchase = await PurchaseModel.findOne({ id: req.params.id }).lean();
    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }
  
    const unitPrice =Number(purchase.amount)  / Number(purchase.quantity ) ;
    const currentReleaseAmt=Number(currentReleaseQty)*unitPrice;
    const releaseId=shortId.generate();
    const releaseEntry = {
      releaseId:releaseId,
      qty:Number(currentReleaseQty),
      amt:Number(currentReleaseAmt) ,
      releaseDate:Date.now(),
      releasedTo: 'Outlet-76',
      releasedBy: 'Bubhuksha Foods'
    };
  
    const updatedItem = await InventoryModel.findOneAndUpdate(
      { id: req.params.id },
      {
        $push: { releases: releaseEntry },
        $inc: {
          balanceQty: -Number(currentReleaseQty),
          releaseQty: Number(currentReleaseQty),
          balanceAmt: -currentReleaseAmt,
          releaseAmt: currentReleaseAmt,
        },
      },
      { new: true } // return updated document
    ).lean();
  
    if (!updatedItem) {
      return res.status(404).json({ message: 'Inventory record not found' });
    }
    console.log("updatedItem : " , updatedItem);
    const obj = updatedItem.id === purchase.id ? { ...updatedItem, ...purchase } : null;
    res.json(obj);
  };

  // API Call : to get monthly release list
  // Method : GET
  export const getMonthlyReleaseReport = async (req, res) => {
    const { month, year } = req.params;
    console.log("month and year ", month, year);
  
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
    console.log("year  :  ", year);
  
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
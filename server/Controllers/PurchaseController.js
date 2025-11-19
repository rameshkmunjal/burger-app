import PurchaseModel from '../Schema/purchase.js';
import InventoryModel from '../Schema/inventory.js';
import { make5LettersStr, filteredDataByMonthAndYear, sortOnItemId } from './CommonFunctions.js';
import shortId from 'shortid';

import {
    improvisePurchaseList, 
    combineDataWithItemInfo,
    findPurchasesNotAddedToInventory
  } from './PurchaseFunctions.js';

import {
  getCategorySummary,
  getCategoryTotal
} from "./InventoryFunctions.js";
import ItemModel from '../Schema/itemNew.js';





/// ✅ Controller
export const getNoInventoryPurchaseList = async (req, res) => {
  try {
    const purchaseList = await PurchaseModel.find().lean();
    const inventoryList = await InventoryModel.find().lean();

    const list = findPurchasesNotAddedToInventory(purchaseList, inventoryList);

    if (list.length === 0) {
      return res.status(404).json({ message: "All purchases are already in inventory" });
    }

    res.json({
      message: "Purchases without inventory records fetched successfully",
      count: list.length,
      data: list,
    });
  } catch (error) {
    console.error("❌ Error in getNoInventoryPurchaseList:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getMonthlyPurchaseList=async(req, res)=>{
  const {month, year}=req.params;
  console.log('month : ', month, 'year : ', year);
  const purchaseList = await PurchaseModel.find().lean();
  //const list=sortList(purchaseList);
  const arr=improvisePurchaseList(purchaseList);
  const list=sortOnItemId(filteredDataByMonthAndYear(arr, month, year));

  if(list){
      res.json(list);
  }else {
      res.status(404);
      throw new Error ("No Data Found");
  }

}

export const getSinglePurchaseDetails=async(req, res)=>{
  console.log(req.params.id);
  let item= await PurchaseModel.findOne({'id':req.params.id}).lean();
  item.day=item.buyDate.getDate();
  item.month=item.buyDate.getMonth()+1;
  item.year=item.buyDate.getFullYear();

  if(item){
        res.json(item);
  }else{
        res.status(404);
        throw new Error('purchase item not found');
  }

}

export const createPurchase = async (req, res) => {
  try {
    const {
      date,
      itemCode,
      itemName,
      category,
      quantity,
      unitDesc,
      measType,
      source,
      amount,
    } = req.body;

    const id = shortId.generate();
    const itemId = itemCode + make5LettersStr(unitDesc);

    const purchaseItem = new PurchaseModel({
      buyDate: date,
      id,
      itemCode,
      itemId,
      itemName,
      unitDesc,
      measType,
      category,
      quantity,
      amount,
      source,
      add2stock: true, // 👈 mark as added immediately
    });

    const savedPurchase = await purchaseItem.save();

    // upsert into inventory immediately
    const inventoryDoc = await InventoryModel.findOneAndUpdate(
      { id }, // match purchase id
      {
        $setOnInsert: {
          id,
          balanceQty: quantity,
          releaseQty: 0,
          balanceAmt: amount,
          releaseAmt: 0,
          releases: [],
        },
      },
      { new: true, upsert: true } // create if not exists
    );

    res.json({ purchase: savedPurchase, inventory: inventoryDoc });
  } catch (err) {
    console.error("❌ Error in createPurchase:", err.message);
    res.status(500).json({ message: "Purchase could not be created" });
  }
};


export const editPurchase=async(req, res)=>{
  console.log(req.body);
  const {  
          id,
          date, itemCode, itemName, category, 
          quantity, unitDesc, measType, source,
          amount
      } = req.body;
      
      const itemId=itemCode+make5LettersStr(unitDesc);

      const i = await PurchaseModel.findOne({ 'id': req.params.id });
    
  
  console.log(i);
    if (i) {
        i.date=date,
        i.itemId=itemCode+(make5LettersStr(unitDesc)),
        i.itemCode=itemCode, 
        i.itemName=itemName, 
        i.category=category,        
        i.quantity=quantity,
        i.amount=amount,
        i.measType=measType,   
        i.unitDesc=unitDesc,
        i.source=source;
  
        const updatedPurchase = await i.save();
        //console.log("updatedInventory....", updatedInventory);
        res.json(updatedPurchase);
    } else {
      res.status(404)
      throw new Error('record not found')
    }

}

export const deletePurchase=async(req, res)=>{
  const purchase = await PurchaseModel.findOne({ 'id': req.params.id })
  
  if (purchase) {
    await purchase.deleteOne()
    res.json({ message: 'clicked purchase record deleted' })
  } else {
    res.status(404)
    throw new Error('purchase item not found')
  }

}




export const getPurchaseCategorySummary=async(req, res)=>{
  try {
    const purchaseList = await  PurchaseModel.find().lean();

    if ( !purchaseList?.length) {
      return res.status(404).json({ message: "purchase data could not be fetched" });
    }

    
    let list=getCategorySummary(purchaseList);
    let gt=getCategoryTotal(list);
    //console.log("line 194 :", newArr);
    if(list){
        res.json({summary:list, gt:gt});
    } else {
        res.status(404);
        throw new Error('inventoryList Not Found');
    }
        
  }catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }

}

// ✅ Main function
export const createBulkPurchase = async (req, res) => {
  try {
    const { date, invoiceNo, source, items } = req.body;

    // ✅ Fetch all item master data
    const itemList = await ItemModel.find().lean();

    // ✅ Merge both arrays
    const combinedItems = combineDataWithItemInfo(items, itemList);

    // ✅ Prepare documents to insert
    const dataToInsert = combinedItems.map(item => ({
      ...item,
      invoiceNo,
      date,
      source,
      id: shortId.generate(),
    }));

    // ✅ Bulk insert
    const result = await PurchaseModel.insertMany(dataToInsert);

    res.status(201).json({ message: "Items inserted successfully", result });
  } catch (error) {
    console.error("Error inserting items:", error);
    res.status(500).json({ message: "Server error", error });
  }
};











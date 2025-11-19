import {getMonth, getTimeInSeconds, getYear, make5LettersStr } from "./CommonFunctions.js";


export const improvisePurchaseList=(list)=>{
    const arr = list.map(a => ({
        serial:getTimeInSeconds(a.buyDate),
        buyDate:a.buyDate,
        month:getMonth(a.buyDate),
        year:getYear(a.buyDate),
        id:a.id,
        itemCode:a.itemCode, 
        itemId:a.itemId,  
        itemName:a.itemName+'-'+a.unitDesc+a.measType, 
        category:a.category,
        quantity:a.quantity,   
        amount:a.amount,
        source:a.source
      }));

    return arr;

}
//arr1=items i.e. payload sent along axios request - bulk purchase data
//arr2=itemList i.e. basic info about all items 
//purchase to combine is get all basic info abt items of bulk purchase
// ✅ Helper function
export const combineDataWithItemInfo = (purchaseItems, itemList) => {
  return purchaseItems.map(pItem => {
    const matchedItem = itemList.find(i => i.itemCode === pItem.itemCode);

    if (!matchedItem) {
      console.warn(`No match found for itemCode: ${pItem.itemCode}`);
      return pItem; // return original if not found
    }

    const itemId = pItem.itemCode + make5LettersStr(pItem.unitDesc);
    matchedItem.itemId=itemId;

    // ✅ Combine both sets of info
    return {
      ...pItem,          // data from purchase payload
      ...matchedItem,    // base info from item master
    };
  });
};

// ✅ Helper function (efficient version)
export const findPurchasesNotAddedToInventory = (purchaseList, inventoryList) => {
  // Create a fast lookup set of inventory IDs
  const inventoryIds = new Set(inventoryList.map(i => i.id));

  // Filter purchases whose IDs are not present in inventory
  const missingPurchases = purchaseList.filter(p => !inventoryIds.has(p.id));

  return missingPurchases;
};

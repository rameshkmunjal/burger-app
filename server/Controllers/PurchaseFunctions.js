import {getMonth, getTimeInSeconds, getYear } from "./CommonFunctions.js";


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


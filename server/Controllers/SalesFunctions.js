import {getMonth, getYear } from "./CommonFunctions.js";

export const improviseSalesList=(list)=>{
    const arr = list.map(a => ({
        saleDate:a.saleDate,
        month:getMonth(a.saleDate),
        year:getYear(a.saleDate),
        id:a.id,        
        outlet:a.outlet,   
        amount:a.amount
      }));

    return arr;

}
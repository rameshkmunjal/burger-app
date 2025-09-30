import {getMonth, getTimeInSeconds, getYear } from "./CommonFunctions.js";

export const improviseExpensesList=(list)=>{
    const arr = list.map(a => ({
        serial:getTimeInSeconds(a.expenseDate),
        expenseDate:a.expenseDate,
        month:getMonth(a.expenseDate),
        year:getYear(a.expenseDate),
        id:a.id,
        paidTo:a.paidTo,
        head:a.head,
        details:a.details,   
        amount:a.amount
      }));

    return arr;

}
//id    expenseDate paidTo amount  head details 
import {getMonth, getYear, getTimeInSeconds} from './CommonFunctions.js';

export const modifyPurchaseList=(list)=>{
    const arr = list.map(a => ({
        serial:getTimeInSeconds(a.buyDate),
        date:a.buyDate,
        month:getMonth(a.buyDate),
        year:getYear(a.buyDate),
        id:a.id, 
        details:a.itemName+'-'+a.unitDesc+a.measType,  
        amount:a.amount,
        paidTo:a.source
      }));

    return arr;

}


export const modifyExpenseList=(list)=>{
    const arr = list.map(a => ({
        serial:getTimeInSeconds(a.expenseDate),
        date:a.expenseDate,
        month:getMonth(a.expenseDate),
        year:getYear(a.expenseDate),
        id:a.id,
        paidTo:a.paidTo,
        details:a.details,   
        amount:a.amount
      }));

    return arr;
}

// ✅ Filter in one go
export const filteredDataByMonthAndYear = (data, m, y) =>{
   // console.log('data insided filter functions', data);
    //console.log( m,  ":", y);
    return data.filter(d => d.month === Number(m) && d.year === Number(y));
}
    
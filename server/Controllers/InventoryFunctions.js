import { findFyOfBuyDate, getTimeInSeconds } from "./CommonFunctions.js";

const monthsArray=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const mergeArraysByKey = (arr1, arr2) => (
    arr1.reduce((acc, il) => {
      const matches = arr2.filter(pl => il.id === pl.id);
      //console.log('matches : ', matches);
      const merged = matches.map(pl => ({
        id: il.id,
        buyDate: pl.buyDate,
        amount: pl.amount,
        category: pl.category,
        itemName: pl.itemName,
        itemId: pl.itemId,
        quantity:pl.quantity,
        balanceQty: il.balanceQty,
        releaseQty: il.releaseQty,
        balanceAmt: il.balanceAmt,
        releaseAmt: il.releaseAmt
      }));
      return acc.concat(merged);
    }, [])
  );

  // ✅ Merge release data with purchase list
  export const mergeReleasedDataWithPurchaseList = (releases, purchases) =>
    releases.flatMap(r =>
      purchases
        .filter(p => p.id === r.id)
        .map(p => ({
          ...r,
          category: p.category,
          itemName: p.itemName,
          itemId: p.itemId,
          month: monthsArray.indexOf(r.month) + 1,
          unitDesc: p.unitDesc,
          measType: p.measType
        }))
    );


// ✅ Flatten release data
export const getReleaseMasterData = arr =>{
  const safeArr = Array.isArray(arr) ? arr : [];

  return safeArr.flatMap(item =>
    item.releases.map(r => {
      const date = r.releaseDate;
      return {
        id: item.id,
        day: date.getDate(),
        month: date.toLocaleString("default", { month: "long" }),
        year: date.getFullYear(),
        fy: findFyOfBuyDate(date),
        date: formatDate(date),
        quantity: r.qty,
        amount: r.amt,
        releasedTo: r.releasedTo,
        releasedBy: r.releasedBy
      };
    })
  );
}

   // ✅ Filter in one go
   export const getFilteredData = (data, m, y) =>
    data.filter(d => d.month === Number(m) && d.year === Number(y));

  export const getFilteredYealyData=(mergedData, year)=>
    mergedData.filter(d => d.fy === year);


  export const getReleaseItemsAmountTotal=(objArr)=>{  
    const gt = objArr.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.amount;
    }, 0);        
    
    return gt;
  }
  
  function formatDate(d){  
    let inputDate=new Date(d);  
    let day=inputDate.getDate();
    let month=inputDate.getMonth()+1;
    let year=inputDate.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  export const getCategoryWiseReleaseArray=(data)=>{
    const divided = data.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
    
   // console.log(divided);
    return divided;
    
  }


  
export const getCategorySummary=(objArr)=>{
  //console.log("objArr", objArr);
    let catSumList=[];
    let unikCatArr=getUniqueCategories(objArr);
    //console.log("unikCatArr : ", unikCatArr);

    for(let i=0; i < unikCatArr.length; i++){
        let categoryTotal=0;
        let qtyTotal=0;
        for(let j=0; j < objArr.length; j++){
            if(unikCatArr[i]===objArr[j].category){
                categoryTotal+=objArr[j].amount;
                qtyTotal+=objArr[j].quantity;
            }
        }
        catSumList.push({category:unikCatArr[i], qtyTotal:qtyTotal, categoryTotal:categoryTotal});
    }       
    
    return catSumList;
}


function getUniqueCategories(arr){
  //console.log(" array of objects to get unique categories : ", arr);
  let uniqueArr=[];
  for(let i=0; i<arr.length; i++){
      if (uniqueArr.indexOf(arr[i].category) === -1) {
          uniqueArr.push(arr[i].category);
        }      
  }
  return uniqueArr;
}


export const getCategoryTotal=(objArr)=>{  
  const gt = objArr.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.categoryTotal;
  }, 0);        
  
  return gt;
}

export const improviseReleaseList=(list)=>{
      //console.log("release list : ", list);
      const arr = list.map(a => ({
        serial:getTimeInSeconds(new Date(a.date)),
        date:new Date(a.date),
        month:a.month,
        year:a.year,
        id:a.id,
        itemId:a.itemId,  
        itemName:a.itemName+'-'+a.unitDesc+a.measType, 
        category:a.category,
        quantity:a.quantity,   
        amount:a.amount
      }));

    return arr;
}
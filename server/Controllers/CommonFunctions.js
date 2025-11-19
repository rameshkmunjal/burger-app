export const make5LettersStr=(str)=>{
    //console.log('string length : ' , str.length);
    if(str.length === 1){
        return '0000'+str;
    }
    else if (str.length === 2){
        return '000'+str;
    } else if(str.length === 3){
        return '00'+str;
    } else if(str.length === 4){
        return '0'+str;
    }else if(str === "loose"){
        return '99999';
    }
     else {
        return str;
    }
}


export const findFyOfBuyDate=(buyDate)=>{

    const month=buyDate.getMonth()+1;
    const year=buyDate.getFullYear();

    if(month >=1 && month <=3 ){
        return `${year-1}-${year}`;
    } else {
        return `${year}-${Number(year)+1}`;
    }    
}



  function convertString2DateObject  (input)  {
    if (!input) return "";
  
    let date;
    if (input instanceof Date) {
      date = input;
    } else if (typeof input === "string" || typeof input === "number") {
      date = new Date(input);
    } else if (input?.$date) {             // MongoDB extended JSON
      date = new Date(input.$date);
    } else if (typeof input?.toDate === "function") { // Firestore Timestamp-like
      date = input.toDate();
    } else {
      data= "";
    }
    return date;
}

 // ✅ Filter in one go
 export const filteredDataByMonthAndYear = (data, m, y) =>
  data.filter(d => d.month === Number(m) && d.year === Number(y));
/*
 export const getMonth=(dateStr)=>{
  let d=convertString2DateObject(dateStr);
  return d.getMonth()+1;
}

export const getYear=(dateStr)=>{
  let d=convertString2DateObject(dateStr);
  return d.getFullYear();
}
*/
export const sortList=(arr)=> {    
  arr.sort((a, b) => {
    if (a.serial < b.serial) {
      return -1;
    }
    if (a.serial > b.serial) {
      return 1;
    }
    return 0;
  });
  return arr;
}

export const sortOnProdCode=(arr)=> {    
  arr.sort((a, b) => {
    if (a.prodCode < b.prodCode) {
      return -1;
    }
    if (a.prodCode > b.prodCode) {
      return 1;
    }
    return 0;
  });
  return arr;
}



export const getTimeInSeconds=(dateStr)=>{
      const d = new Date(dateStr);
      if (!isNaN(d)) {
        return d.getTime()/1000;
      }
}
export const getMonth=(dateStr)=>{
  const d = new Date(dateStr);
  if (!isNaN(d)) {
    return d.getMonth()+1;
  }
}
export const getYear=(dateStr)=>{
  const d = new Date(dateStr);
  if (!isNaN(d)) {
    return d.getFullYear();
  }
}


export const doSum=(arr)=>{
  const total = arr.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.amount;
  }, 0);
  //console.log("total : ", total);
  
  return total;
}


export const sortOnItemId=(arr)=> {    
  arr.sort((a, b) => {
    if (a.itemId < b.itemId) {
      return -1;
    }
    if (a.itemId > b.itemId) {
      return 1;
    }
    return 0;
  });
  return arr;
}
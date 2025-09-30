export const validateDate=(y, m, d)=>{
    console.log(y, m, d);
    console.log(typeof(y), typeof(m), typeof(d));
    let totalDays=getDaysInMonth(y, m);
    let today=new Date();
    let currentYear=today.getFullYear();
    console.log(currentYear, "type of current year : ", typeof(currentYear));
    let validationScore=0;


    if(currentYear === Number(y)){
        validationScore=validationScore+1;
        console.log("first test : ", validationScore);
    }

    if(Number(m) >= 1 && Number(m) <= 12){
        validationScore=validationScore+1;
        console.log("second test : ", validationScore);
    } 

    if(Number(d) <= totalDays){
        validationScore=validationScore+1;
        console.log("third test : ", validationScore);
    } 

    console.log(validationScore);
    if(validationScore===3){
        return true;
    } else {
        return false;
    }

}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

export const formatDate=(year, month, day)=>{
    return new Date(`${year}-${month}-${day}`);
}


export const capitaliseFirstLetter=(str)=>{
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const convertObj2Date = (input) => {
  console.log(typeof(input));
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
      return "";
    }
  
    if (isNaN(date)) return "";
  
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };


  export const findFyOfDate=(month, year)=>{

    if(month >=1 && month <=3 ){
        return `${year-1}-${year}`;
    } else {
        return `${year}-${Number(year)+1}`;
    }    
}

export const findDayInDateObj=(obj)=>obj.getDate();
export const findMonthInDateObj=(obj)=>obj.getMonth()+1;
export const findYearInDateObj=(obj)=>obj.getFullYear();

  
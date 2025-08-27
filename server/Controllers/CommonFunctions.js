export const make5LettersStr=(str)=>{
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
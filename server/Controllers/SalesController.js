import SaleModel from '../Schema/sales.js';
//import { sortList } from './CommonFunctions.js';
import shortId from 'shortid';
import {improviseSalesList} from './SalesFunctions.js';
import { filteredDataByMonthAndYear } from './CommonFunctions.js';



export const getSalesList=async(req, res)=>{
    const list = await SaleModel.find().lean();
    //const list=sortList(salesList);

    if(list){
        res.json(list);
    }else {
        res.status(404);
        throw new Error ("No Data Found");
    }

}

export const getMonthlySalesList=async(req, res)=>{
  const {month, year}=req.params;
  const salesList = await SaleModel.find().lean();

  const arr=improviseSalesList(salesList);
  //console.log(arr);
  const list=filteredDataByMonthAndYear(arr, month, year);

  if(list){
      res.json(list);
  }else {
      res.status(404);
      throw new Error ("No Data Found");
  }

}

export const getSingleSalesDetails=async(req, res)=>{
    console.log(req.params.id);
    let item= await SaleModel.findOne({'id':req.params.id}).lean();
    item.day=item.saleDate.getDate();
    item.month=item.saleDate.getMonth()+1;
    item.year=item.saleDate.getFullYear();
  
    if(item){
          res.json(item);
    }else{
          res.status(404);
          throw new Error('sales item not found');
    }
  
  }
  


export const createSale=async(req, res)=>{
    console.log(req.body);
    const {
        date, 
        outlet,
        amount
      }=req.body;
    console.log(date);
    const id=shortId.generate();

    const sale = new SaleModel({
        saleDate:date,
        id: id,
        amount: amount,
        outlet:outlet
      });
    
      try {
        const result = await sale.save();
        //console.log('New Inventory Saved:', result);
        res.json(result);
      } catch (err) {
        //console.error('Error:', err.message);
        throw new Error('Sales could not be created');
      }
}

export const editSales=async(req, res)=>{
    console.log(req.body);
    const {  
            id, date,  outlet, amount
        } = req.body;
        
          
        const i = await SaleModel.findOne({ 'id': req.params.id });
      
    
    console.log(i);
      if (i) {
          i.id=id, 
          i.date=date,
          i.amount=amount,
          i.outlet=outlet;
    
          const updatedSales = await i.save();
          //console.log("updatedInventory....", updatedInventory);
          res.json(updatedSales);
      } else {
        res.status(404)
        throw new Error('record not found')
      }
  
  }



export const deleteSales=async(req, res)=>{
    const sale = await SaleModel.findOne({ 'id': req.params.id })
    
    if (sale) {
      await sale.deleteOne()
      res.json({ message: 'clicked Sales record deleted' })
    } else {
      res.status(404)
      throw new Error('sales item not found')
    }
  
  }
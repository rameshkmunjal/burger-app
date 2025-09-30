import ExpenseModel from '../Schema/expense.js';

import shortId from 'shortid';
import { filteredDataByMonthAndYear, sortList } from './CommonFunctions.js';

import {improviseExpensesList} from './ExpensesFunctions.js';


export const getExpensesList=async(req, res)=>{
    const list = await ExpenseModel.find().lean();
    //const list=sortList(salesList);

    if(list){
        res.json(list);
    }else {
        res.status(404);
        throw new Error ("No Data Found");
    }
}

export const getMonthlyExpensesList=async(req, res)=>{
  const {month, year}=req.params;
  const expensesList = await ExpenseModel.find().lean();

  const arr=improviseExpensesList(expensesList);
  const list=sortList(filteredDataByMonthAndYear(arr, month, year));
  //const list=sortList(salesList);

  if(list){
      res.json(list);
  }else {
      res.status(404);
      throw new Error ("No Data Found");
  }
}



export const getSingleExpenseDetails=async(req, res)=>{
    console.log(req.params.id);
    let item= await ExpenseModel.findOne({'id':req.params.id}).lean();
    const expenseDate = new Date(item.expenseDate);
    item.day=expenseDate.getDate();
    item.month=expenseDate.getMonth()+1;
    item.year=expenseDate.getFullYear();
  
    if(item){
          res.json(item);
    }else{
          res.status(404);
          throw new Error('sales item not found');
    }
  
  }
  


export const createExpense=async(req, res)=>{
  
    const {
        date, 
        paidTo,
        head,
        details,
        amount
      }=req.body;
    //console.log(date);
    const id=shortId.generate();

    const expense = new ExpenseModel({
        expenseDate:date,
        id: id,
        paidTo:paidTo,
        amount: amount,
        head:head,
        details:details
      });
    
      try {
        const result = await expense.save();
        //console.log('New Inventory Saved:', result);
        res.json(result);
      } catch (err) {
        //console.error('Error:', err.message);
        throw new Error('Expense transaction could not be created');
      }
}


export const editExpense=async(req, res)=>{
    console.log('req body :', req.body);
    const {  
            id, date,  details, amount, head, paidTo
        } = req.body;
        
          
        const i = await ExpenseModel.findOne({ 'id': req.params.id });
      
    
    //console.log(i);
      if (i) {
          i.id=id, 
          i.expenseDate=date,
          i.amount=amount,
          i.paidTo=paidTo;
          i.head=head,
          i.details=details
    
          const updatedExpense = await i.save();
          //console.log("updatedInventory....", updatedInventory);
          res.json(updatedExpense);
      } else {
        res.status(404)
        throw new Error('record not found')
      }
  
  }



export const deleteExpense=async(req, res)=>{
    const expense = await ExpenseModel.findOne({ 'id': req.params.id })
    
    if (expense) {
      await expense.deleteOne()
      res.json({ message: 'clicked Expense record deleted' })
    } else {
      res.status(404)
      throw new Error('expense item not found')
    }
  
  }
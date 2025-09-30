/* importing models */
import SaleModel from '../Schema/sales.js';
import PurchaseModel from '../Schema/purchase.js';
import ExpenseModel from '../Schema/expense.js';
import InventoryModel from '../Schema/inventory.js';

/* importing functions from other modules */
import {
    modifyExpenseList, 
    modifyPurchaseList,
    filteredDataByMonthAndYear
} from './PerformanceFunctions.js';

import { 
    getFilteredData,    
    getReleaseMasterData,
    mergeReleasedDataWithPurchaseList
  } from "./InventoryFunctions.js";

import { sortList, doSum } from './CommonFunctions.js';
import { improviseSalesList } from './SalesFunctions.js';
import { improvisePurchaseList } from './PurchaseFunctions.js';
import { improviseExpensesList } from './ExpensesFunctions.js';
import { improviseReleaseList } from './InventoryFunctions.js';

/* Method : GET */
/* Purpose : To get a combined list of data for given month */

export const getMonthlyPaymentsReport=async(req, res)=>{
    const {month, year}=req.params;

    try {    
            const expenseList = await ExpenseModel.find().lean();
            const purchaseList = await PurchaseModel.find().lean();

            if( !expenseList || !purchaseList){
                res.status(404);
                throw new Error("inventory or purchase data could not be fetched");
            }

            const list1=modifyExpenseList(expenseList);
            //console.log('list 1 :', list1);
            const list2=modifyPurchaseList(purchaseList);
            //console.log('list 2 :', list2);
            const combinedList=[...list1, ...list2];
            //console.log('c l :', combinedList);
            const list = sortList(filteredDataByMonthAndYear(combinedList, month, year));
            //console.log("list ....:::::", list);

            if (!list.length) {
                res.status(404);
                throw new Error("No matching records found");
            }
        
            //console.log("combined list : ", list);
            res.json(list);
        } catch (err) {
            //console.error(err.message);
            res.status(500).json({ message: err.message });
          }
}

export const getMonthlyCashFlowReport=async(req, res)=>{
    const {month, year}=req.params;
    
    try{
        const expenseList = await ExpenseModel.find().lean();
        const purchaseList = await PurchaseModel.find().lean();
        const saleList= await SaleModel.find().lean();
    
        if( !expenseList || !purchaseList || !saleList){
            res.status(404);
            throw new Error("inventory or purchase data could not be fetched");
        } 
        
        const isl=improviseSalesList(saleList);
        const ipl=improvisePurchaseList(purchaseList);
        const iel=improviseExpensesList(expenseList);

        const monthlySalesList=filteredDataByMonthAndYear(isl, month, year);
        const monthlyPurchasesList=filteredDataByMonthAndYear(ipl, month, year);
        const monthlyExpensesList=filteredDataByMonthAndYear(iel, month, year);
        
        const salesTotal=doSum(monthlySalesList);
        const purchasesTotal=doSum(monthlyPurchasesList);
        const expensesTotal=doSum(monthlyExpensesList);
    
        let cashFlowType='';
        let amount=0;
    
        if(salesTotal > (purchasesTotal+expensesTotal)){
            cashFlowType='cash inflow';
            amount=salesTotal-(purchasesTotal+expensesTotal);
        } else {
            cashFlowType='cash outflow';
            amount=(purchasesTotal+expensesTotal)-salesTotal;
        }
    console.log('type:',cashFlowType, 'amount:' , amount, 'salesTotal:', salesTotal, 'expensesTotal:', expensesTotal, 'purchasesTotal:', purchasesTotal);
        res.json({type:cashFlowType, amount:amount, salesTotal:salesTotal, expensesTotal:expensesTotal, purchasesTotal:purchasesTotal})
    } catch (error) {
        //console.error("Error in getMonthlyCashFlowReport:", error);
        res.status(500).json({ message: error.message || "Server error" });
    }
      
}


export const getMonthlyProfitAndLossReport=async(req, res)=>{
    const {month, year}=req.params;
    
    try{
        const [invList, purList, salList, expList] = await Promise.all([
            InventoryModel.find().lean(),
            PurchaseModel.find().lean(),
            SaleModel.find().lean(),
            ExpenseModel.find().lean()
          ]);

        
    
        if(!invList || !purList  || !salList || !expList){
            res.status(404);
            throw new Error("inventory or purchase or sales or expenses data could not be fetched");
        } 

        // Step 1: Flatten releases
      const releaseMasterData = getReleaseMasterData(invList);
  
      // Step 2: Merge with purchase list
      const mergedData = mergeReleasedDataWithPurchaseList(releaseMasterData, purList);
  
      // Step 3: Filter by month/year
      const revisedList = getFilteredData(mergedData, month, year);

        const irl=improviseReleaseList(revisedList);
        const isl=improviseSalesList(salList);        
        const iel=improviseExpensesList(expList);

        const monthlySalesList=filteredDataByMonthAndYear(isl, month, year);        
        const monthlyExpensesList=filteredDataByMonthAndYear(iel, month, year);
        const monthlyReleaseList=filteredDataByMonthAndYear(irl, month, year);  
        
        const salesTotal=doSum(monthlySalesList);        
        const expensesTotal=doSum(monthlyExpensesList);
        const consumptionTotal=doSum(monthlyReleaseList);
        
        //console.log('Sales : ', salesTotal, 'Consumption :', consumptionTotal, 'Expenses : ', expensesTotal );    
        let result='';
        let amount=0;
    
        if(salesTotal > (consumptionTotal+expensesTotal)){
            result='profit';
            amount=salesTotal-(consumptionTotal+expensesTotal);
        } else {
            result='loss';
            amount=(consumptionTotal+expensesTotal)-salesTotal;
        }
    
        res.json({
            type:result, 
            amount:amount, 
            salesTotal:salesTotal, 
            expensesTotal:expensesTotal, 
            consumptionTotal:consumptionTotal
       })
        
    } catch (error) {
        //console.error("Error in getMonthlyCashFlowReport:", error);
        res.status(500).json({ message: error.message || "Server error" });
    }
      
}
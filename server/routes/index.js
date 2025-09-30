import express from 'express';
import {
    createItem, 
    getItemList, 
    getItemById,
    editItem
} from '../Controllers/itemController.js';
import {
    createExpense, 
    deleteExpense, 
    editExpense, 
    getExpensesList, 
    getMonthlyExpensesList,
    getSingleExpenseDetails
} from '../Controllers/ExpensesController.js';

import {
    getPurchaseList,
    getMonthlyPurchaseList,
    getPurchaseCategorySummary,
    getSinglePurchaseDetails,
    editPurchase,
    createPurchase,
    deletePurchase,
} from '../Controllers/PurchaseController.js';

import {
    deleteInventory,
    getInventoryList,
    getSingleInventoryDetails,
    releaseInventory,     
    getMonthlyReleaseReport,
    getYearlyReleaseReport,
    getCategoryWiseReleaseReport,
    getInventoryCategorySummary,
    editRelease,
    deleteRelease
} from '../Controllers/InventoryController.js';
import { 
    getSalesList, 
    getMonthlySalesList, 
    getSingleSalesDetails,  
    createSale, 
    deleteSales, 
    editSales 
} from '../Controllers/SalesController.js';
import { 
    getMonthlyPaymentsReport, 
    getMonthlyCashFlowReport,
    getMonthlyProfitAndLossReport
} from '../Controllers/PerformanceController.js';

const router=express.Router();
/* performance related routes */
router.get('/general/payments/list/:month/:year', getMonthlyPaymentsReport);
router.get('/general/cash/flow/report/:month/:year', getMonthlyCashFlowReport);
router.get('/general/profit/loss/report/:month/:year', getMonthlyProfitAndLossReport);


/*sales related routes & apis */
router.get('/sales/list', getSalesList);
router.get('/sales/list/:month/:year', getMonthlySalesList);
router.get('/sales/:id', getSingleSalesDetails);
router.post('/sales/create', createSale);
router.put('/sales/edit/:id', editSales);
router.delete('/sales/delete/:id', deleteSales);

/*expenses related routes & apis */
router.get('/expenses/list', getExpensesList);
router.get('/expenses/list/:month/:year', getMonthlyExpensesList);
router.get('/expense/:id', getSingleExpenseDetails);
router.post('/expense/create', createExpense);
router.put('/expense/edit/:id', editExpense);
router.delete('/expense/delete/:id', deleteExpense);

/*purchases related routes & apis */
router.get('/purchase/list', getPurchaseList);
router.get('/purchase/list/:month/:year', getMonthlyPurchaseList);
router.get('/purchase/item/:id', getSinglePurchaseDetails);
router.put('/purchase/edit/:id', editPurchase);
router.post('/purchase/create', createPurchase);
router.get('/purchase/category/summary', getPurchaseCategorySummary);
router.delete('/purchase/delete/:id', deletePurchase);

router.get('/inventory/list', getInventoryList);
router.get('/inventory/category/summary', getInventoryCategorySummary);
router.get('/inventory/item/:id', getSingleInventoryDetails);
router.put("/inventory/:inventoryId/release/:releaseId", editRelease);
router.delete("/inventory/:inventoryId/release/:releaseId", deleteRelease);


router.put(`/inventory/release/:id`, releaseInventory);
router.delete('/inventory/delete/:id', deleteInventory);

router.get('/inventory/report/release/month/:month/:year',  getMonthlyReleaseReport);
router.get('/inventory/report/release/fy/:year',  getYearlyReleaseReport);
router.get('/category/wise/release/list/:month/:year', getCategoryWiseReleaseReport);

/* POST */
router.post('/item/create', createItem);
router.get('/item/list', getItemList);
router.get('/item/edit/:id', getItemById);
router.put('/item/edit/:id', editItem);

export default router;
import express from 'express';
const router=express.Router();

import {
    createItem, 
    getItemList, 
    getItemById,
    editItem, 
    deleteItem
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
    getNoInventoryPurchaseList,
    getMonthlyPurchaseList,
    getPurchaseCategorySummary,
    getSinglePurchaseDetails,
    editPurchase,
    createPurchase,
    createBulkPurchase,
    deletePurchase
} from '../Controllers/PurchaseController.js';

import {
    deleteInventory,
    getInventoryList,
    getInventoryStatusList,
    getSingleInventoryDetails,
    editInventory,
    releaseInventory,     
    getMonthlyReleaseReport,
    getYearlyReleaseReport,
    getCategoryWiseReleaseReport,
    getInventoryCategorySummary,
    editRelease,
    deleteRelease,
    add2Stock
} from '../Controllers/InventoryController.js';
import { 
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

import {addUser, deleteUser, getUserList} from '../Controllers/userController.js';


/* performance related routes */
router.get('/general/payments/list/:month/:year', getMonthlyPaymentsReport);
router.get('/general/cash/flow/report/:month/:year', getMonthlyCashFlowReport);
router.get('/general/profit/loss/report/:month/:year', getMonthlyProfitAndLossReport);


/*sales related routes & apis */
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
router.get('/no/inventory/purchase/list', getNoInventoryPurchaseList);
router.get('/purchase/list/:month/:year', getMonthlyPurchaseList);
router.get('/purchase/item/:id', getSinglePurchaseDetails);
router.put('/purchase/edit/:id', editPurchase);
router.post('/purchase/create', createPurchase);
router.post("/bulk/purchase", createBulkPurchase);
router.get('/purchase/category/summary', getPurchaseCategorySummary);
router.delete('/purchase/delete/:id', deletePurchase);

//inventory related API calls and routes
router.get('/inventory/list', getInventoryList);
router.get('/inventory/status/list', getInventoryStatusList);
router.get('/inventory/category/summary', getInventoryCategorySummary);
router.get('/inventory/item/:id', getSingleInventoryDetails);
router.put("/inventory/:inventoryId/release/:releaseId", editRelease);
router.delete("/inventory/:inventoryId/release/:releaseId", deleteRelease);
router.post('/purchase/add2stock/:id', add2Stock);
router.put(`/inventory/edit/:id`, editInventory);
router.put(`/inventory/release/:id`, releaseInventory);
router.delete('/inventory/delete/:id', deleteInventory);

router.get('/inventory/report/release/month/:month/:year',  getMonthlyReleaseReport);
router.get('/inventory/report/release/fy/:year',  getYearlyReleaseReport);
router.get('/category/wise/release/list/:month/:year', getCategoryWiseReleaseReport);

/* POST */
router.post('/item/create', createItem);
router.get('/item/list', getItemList);
router.get('/item/:id', getItemById);
router.put('/item/edit/:id', editItem);
router.delete('/item/delete/:id', deleteItem);

router.post('/user/register', addUser);
router.get('/user/list', getUserList);
router.delete('/user/delete/:id', deleteUser);

export default router;



//router.put('/record/edit/:itemId', editRecord);
//createRecord, editRecord ,    getSingleRecordDetails
//router.get('/purchase/record/:itemId', getSingleRecordDetails);
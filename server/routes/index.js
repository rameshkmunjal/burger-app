import express from 'express';
import {
    getPurchaseList,
    getSinglePurchaseDetails,
    editPurchase,
    createPurchase,
    deletePurchase,
} from '../Controllers/PurchaseController.js';

import {
    add2Stock,
    deleteInventory,
    getInventoryList,
    getSingleInventoryDetails,
    releaseInventory,     
    getMonthlyReleaseReport,
    getYearlyReleaseReport
} from '../Controllers/InventoryController.js';

const router=express.Router();

router.get('/purchase/list', getPurchaseList);
router.get('/purchase/item/:id', getSinglePurchaseDetails);
router.put('/purchase/edit/:id', editPurchase);
router.post('/purchase/create', createPurchase);
router.delete('/purchase/delete/:id', deletePurchase);

router.get('/inventory/list', getInventoryList);
router.get('/inventory/item/:id', getSingleInventoryDetails);
router.post(`/inventory/add2Stock`, add2Stock);
router.put(`/inventory/release/:id`, releaseInventory);
router.delete('/inventory/delete/:id', deleteInventory);

router.get('/inventory/report/release/month/:month/:year',  getMonthlyReleaseReport);
router.get('/inventory/report/release/fy/:year',  getYearlyReleaseReport);

export default router;
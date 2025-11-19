import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';


import Item from './Pages/Admin/CUD/item';
import EditItem from './Pages/Admin/CUD/editItem';

import Expense from './Pages/Admin/CUD/expense';

import EditExpense from './Pages/Admin/CUD/editExpense';
import CreateInventory from './Pages/Admin/CUD/createInventory';
import Purchase from './Pages/Admin/CUD/purchase';
import BulkPurchase from './Pages/Admin/CUD/bulkPurchase';
import EditPurchase from './Pages/Admin/CUD/editPurchase';

import ReleaseList from './Pages/Admin/Lists/ReleaseList';
import PurchaseList from './Pages/Admin/Lists/PurchaseList';
import PurchasesNotInventoryList from './Pages/Admin/Lists/PurchasesNotInventoryList';
import ExpenseList from './Pages/Admin/Lists/ExpenseList';
import Sales from './Pages/Admin/CUD/sales';
import EditSales from './Pages/Admin/CUD/editSales';
import ViewInventory from './Pages/Admin/CUD/viewInventory';
import EditInventory from './Pages/Admin/CUD/editInventory';
import ReleaseInventory from './Pages/Admin/CUD/releaseInventory';
import NewPurchase from './Pages/Admin/CUD/newPurchase';
import CreateProduct from './Pages/Admin/CUD/product';

import AdminHome from './Pages/Admin/AdminHome';
import InventoryList from './Pages/Admin/Lists/InventoryList';
import SalesList from './Pages/Admin/Lists/SalesList';
import InventoryStatusList from './Pages/Admin/Lists/inventoryStatusList';
import ItemList from './Pages/Admin/Lists/ItemList';
import ProductList from './Pages/Admin/Lists/ProductList';

import AddUser from './Pages/Admin/Users/UserAdd';
import UserList from './Pages/Admin/Users/UserList';

import ReportsHome from './Reports/ReportsHome';
import DailyReleaseReport from './Reports/DailyReleaseReport';

import MonthlySalesReport from './Reports/MonthlySalesReport';
import MonthlyPurchasesReport from './Reports/MonthlyPurchasesReport';
import MonthlyExpensesReport from './Reports/MonthlyExpensesReport';
import MonthlyPaymentsReport from './Reports/MonthlyPaymentsReport';
import MonthlyCashFlowReport from './Reports/MonthlyCashFlowReport';
import MonthlyProfitAndLossReport from './Reports/MonthlyProfitAndLossReport';
import MonthlyReleaseReport from './Reports/MonthlyReleaseReport';

import YearlyReleaseReport from './Reports/YearlyReleaseReport';
import CategoryReleaseList from './Reports/CategoryWiseInventoryReport';
import InventoryCategorySummary from './Reports/InventoryCategorySummary';

import PurchaseCategorySummary from './Reports/PurchaseCategorySummary';







const App=()=>{
      return(
        <div className="container">
          <BrowserRouter>
              <Routes>
                  <Route path='/'  element={<Dashboard/>} />                  

                  <Route path='/sales/create'  element={<Sales />} />
                  <Route path='/sales/list'  element={<SalesList />} />
                  <Route path='/sales/edit/:id'  element={<EditSales />} />

                  <Route path='/expense/create'  element={<Expense />} />
                  <Route path='/expenses/list'  element={<ExpenseList />} />
                  <Route path='/expense/edit/:id'  element={<EditExpense />} />

                  <Route path='/purchase/list'  element={<PurchaseList />} />
                  <Route path="/no/inventory/purchase/list" element={<PurchasesNotInventoryList />} />
                  <Route path='/purchase/create'  element={<Purchase />} />
                  <Route path='/purchase/bulk/create'  element={<BulkPurchase />} />
                  <Route path='/purchase/edit/:id'  element={<EditPurchase />} />
                  <Route path='/purchase/new'  element={<NewPurchase />} />
                  

                  <Route path='/inventory/list'  element={<InventoryList />} />
                  <Route path='/inventory/status/list'  element={<InventoryStatusList />} />
                  <Route path='/inventory/release/:id'  element={<ReleaseInventory />} />
                  <Route path='/inventory/view/:id'  element={<ViewInventory />} />
                  <Route path='/inventory/create/:id'  element={<CreateInventory />} />
                  <Route path='/inventory/edit/:id'  element={<EditInventory />} />
                  <Route path='/inventory/release/list'  element={<ReleaseList />} />

                  <Route path='/item/create'  element={<Item />} />
                  <Route path='/item/list'  element={<ItemList />} />
                  <Route path='/item/edit/:id'  element={<EditItem />} />

                  <Route path='/product/create'  element={<CreateProduct />} />
                  <Route path='/product/list'  element={<ProductList />} />

                  <Route path='/admin' element={<AdminHome />} />

                  <Route path='/user/register' element={<AddUser/>} />
                  <Route path='/user/list' element={<UserList />} />

                  <Route path='/reports' element={<ReportsHome />} />
                  <Route path='/reports/daily/release' element={<DailyReleaseReport />} />
                  <Route path='/reports/current/category/wise/release' element={<CategoryReleaseList />} />
                  <Route path='/reports/inventory/category/summary' element={<InventoryCategorySummary />} />
                  <Route path="/reports/purchase/category/summary" element={<PurchaseCategorySummary />} />
                  
                  <Route path='/reports/monthly/sales' element={<MonthlySalesReport />} />
                  <Route path='/reports/monthly/purchases' element={<MonthlyPurchasesReport />} />
                  <Route path='/reports/monthly/expenses' element={<MonthlyExpensesReport />} />
                  <Route path='/reports/monthly/payments' element={<MonthlyPaymentsReport />} />
                  <Route path='/reports/monthly/cash/flow' element={<MonthlyCashFlowReport />} />
                  <Route path='/reports/monthly/profit/loss' element={<MonthlyProfitAndLossReport />} />
                  <Route path='/reports/monthly/release' element={<MonthlyReleaseReport />} />

                  <Route path='/reports/yearly/release' element={<YearlyReleaseReport />} />

                  {/* 404 catch-all route */}
                  <Route path="*" element={<h2>404 - Page Not Found</h2>} />
              </Routes>
          </BrowserRouter>
        </div>
      )
}



export default App;

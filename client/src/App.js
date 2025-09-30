import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';


import Item from './Admin/Create/item';
import EditItem from './Admin/Create/editItem';

import Expense from './Admin/Create/expense';
import ExpenseList from './Pages/ExpenseList';
import EditExpense from './Admin/Create/editExpense';

import PurchaseList from './Pages/PurchaseList';
import Purchase from './Admin/Create/purchase';
import EditPurchase from './Admin/Create/editPurchase';

import ViewInventory from './Admin/Create/viewInventory';

import Sales from './Admin/Create/sales';
import SalesList from './Pages/SalesList';
import EditSales from './Admin/Create/editSales';

import AdminHome from './Admin/AdminHome';
import InventoryList from './Pages/InventoryList';
import ReleaseInventory from './Admin/Create/releaseInventory';

import ItemList from './Pages/ItemList';

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
                  <Route path='/item/create'  element={<Item />} />

                  <Route path='/sales/create'  element={<Sales />} />
                  <Route path='/sales/list'  element={<SalesList />} />
                  <Route path='/sales/edit/:id'  element={<EditSales />} />

                  <Route path='/expense/create'  element={<Expense />} />
                  <Route path='/expenses/list'  element={<ExpenseList />} />
                  <Route path='/expense/edit/:id'  element={<EditExpense />} />

                  <Route path='/purchase/list'  element={<PurchaseList />} />
                  <Route path='/purchase/create'  element={<Purchase />} />
                  <Route path='/purchase/edit/:id'  element={<EditPurchase />} />

                  <Route path='/inventory/list'  element={<InventoryList />} />
                  <Route path='/inventory/release/:id'  element={<ReleaseInventory />} />
                  <Route path='/inventory/view/:id'  element={<ViewInventory />} />

                  <Route path='/item/list'  element={<ItemList />} />
                  <Route path='/item/edit/:id'  element={<EditItem />} />

                  <Route path='/admin' element={<AdminHome />} />

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

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import PurchaseList from './Pages/PurchaseList';
import Purchase from './Admin/Create/purchase';
import EditPurchase from './Admin/Create/editPurchase';
import AdminHome from './Admin/AdminHome';
import InventoryList from './Pages/InventoryList';
import ReleaseInventory from './Admin/Create/releaseInventory';

import ReportsHome from './Reports/ReportsHome';
import DailyReleaseReport from './Reports/DailyReleaseReport';
import MonthlyReleaseReport from './Reports/MonthlyReleaseReport';
import YearlyReleaseReport from './Reports/YearlyReleaseReport';


const App=()=>{
      return(
        <div className="container">
          <BrowserRouter>
              <Routes>
                  <Route path='/'  element={<Dashboard/>} />
                  <Route path='/purchase/list'  element={<PurchaseList />} />
                  <Route path='/purchase/create'  element={<Purchase />} />
                  <Route path='/purchase/edit/:id'  element={<EditPurchase />} />

                  <Route path='/inventory/list'  element={<InventoryList />} />
                  <Route path='/inventory/release/:id'  element={<ReleaseInventory />} />

                  <Route path='/admin' element={<AdminHome />} />

                  <Route path='/reports' element={<ReportsHome />} />
                  <Route path='/reports/daily/release' element={<DailyReleaseReport />} />
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

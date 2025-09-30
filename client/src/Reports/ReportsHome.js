import NavBar  from '../Component/Navbar';
import Footer  from '../Component/Footer';
import { Link } from 'react-router-dom';

const ReportsHome=()=>{
    return(
        <div className="page-container">
            <NavBar />
            <div className="ul-container">                
                <ul className="nav-ul">
                <h2>Current</h2>
                    <li>
                        <Link to="/reports/daily/release" className="report-link">Daily Release Report</Link>
                    </li>
                    <li>
                        <Link to="/reports/current/category/wise/release" className="report-link">Category Wise Release Report</Link>
                    </li>
                    <li>
                        <Link to="/reports/inventory/category/summary" className="report-link">Inventory Category Summary</Link>
                    </li>
                    <li>
                        <Link to="/reports/purchase/category/summary" className="report-link">Purchase Category Summary</Link>
                    </li>
                </ul>

                <ul className="nav-ul">
                <h2>Monthly</h2>
                    <li>
                        <Link to="/reports/monthly/sales" className="report-link">Monthly Sales Report</Link>
                    </li>
                    
                    <li>
                        <Link to="/reports/monthly/purchases" className="report-link">Monthly Purchases Report</Link>
                    </li>
                    <li>
                        <Link to="/reports/monthly/expenses" className="report-link">Monthly Expenses Report</Link>
                    </li>
                    <li>
                        <Link to="/reports/monthly/payments" className="report-link">Monthly Payments Report</Link>
                    </li>
                    <li>
                        <Link to="/reports/monthly/cash/flow" className="report-link">Monthly Cash Flow Report</Link>
                    </li>
                    <li>
                        <Link to="/reports/monthly/profit/loss" className="report-link">Monthly Profit And Loss Report</Link>
                    </li>
                    <li>
                        <Link to="/reports/monthly/release" className="report-link">Monthly Release Report</Link>
                    </li>
                </ul> 

                <ul className="nav-ul">
                <h2>Yearly</h2>
                    <li>
                        <Link to="/reports/yearly/release" className="report-link">Yearly Release Report</Link>
                    </li>
                </ul>                
            </div>
            
            <Footer/>
        </div>
    )
}

export default ReportsHome;




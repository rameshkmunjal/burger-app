import NavBar  from '../Component/Navbar';
import { Link } from 'react-router-dom';

const AdminHome=()=>{
    return(
        <div className="page-container">
            <NavBar />
            <div className="ul-container">                
                <ul className="nav-ul">
                <h2>Create</h2>
                    <li>
                        <Link to="/purchase/create" className="report-link">New Purchase</Link>
                    </li>
                    <li>
                        <Link to="/sales/create" className="report-link">New Sales</Link>
                    </li>
                    <li>
                        <Link to="/expense/create" className="report-link">New expenses</Link>
                    </li>
                    <li>
                        <Link to="/release/edit" className="report-link">Edit Release</Link>
                    </li>
                </ul>

                <ul className="nav-ul">
                <h2>Lists</h2>
                    <li>
                        <Link to="/sales/list" className="report-link">Sales List</Link>
                    </li>
                    <li>
                        <Link to="/purchase/list" className="report-link">Purchase List</Link>
                    </li>
                    <li>
                        <Link to="/expenses/list" className="report-link">Expenses List</Link>
                    </li>
                    <li>
                        <Link to="/inventory/list" className="report-link">Inventory List</Link>
                    </li>
                    <li>
                        <Link to="/item/list" className="report-link">Item List</Link>
                    </li>
                </ul>                
            </div>
        </div>
    )
}

export default AdminHome;




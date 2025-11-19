import NavBar  from '../../Component/Navbar';
import { Link } from 'react-router-dom';

const AdminHome=()=>{
    return(
        <div className="page-container">
            <NavBar />
            <div className="ul-container">                
                <ul className="nav-ul">
                <h2>Create</h2>
                    <li>
                        <Link to="/user/register" className="report-link">New User</Link>
                    </li>
                    <li>
                        <Link to="/purchase/create" className="report-link">New Purchase</Link>
                    </li>
                    <li>
                        <Link to="/purchase/bulk/create" className="report-link">Bulk Purchase</Link>
                    </li>
                    <li>
                        <Link to="/sales/create" className="report-link">New Sales</Link>
                    </li>
                    <li>
                        <Link to="/expense/create" className="report-link">New expenses</Link>
                    </li>
                    <li>
                        <Link to="/item/create" className="report-link">New Item</Link>
                    </li> 
                    <li>
                        <Link to="/product/create" className="report-link">New Product</Link>
                    </li>                                       
                </ul>

                <ul className="nav-ul">
                <h2>Lists</h2>
                    <li>
                        <Link to="/user/list" className="report-link">User List</Link>
                    </li>
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
                        <Link to="/no/inventory/purchase/list" className="report-link">Purchases Not Added to Inventory</Link>
                    </li>
                    <li>
                        <Link to="/item/list" className="report-link">Item List</Link>
                    </li>
                    <li>
                        <Link to="/product/list" className="report-link">Product List</Link>
                    </li>
                    <li>
                        <Link to="/inventory/status/list" className="report-link">Inventory Status List</Link>
                    </li>
                    <li>
                        <Link to="/inventory/release/list" className="report-link">Inventory Release List</Link>
                    </li>
                </ul>                
            </div>
        </div>
    )
}

export default AdminHome;




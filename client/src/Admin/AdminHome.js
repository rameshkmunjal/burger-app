import NavBar  from '../Components/Navbar';
import Footer  from '../Components/Footer';
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
                </ul>

                <ul className="nav-ul">
                <h2>Lists</h2>
                    <li>
                        <Link to="/purchase/list" className="report-link">Purchase List</Link>
                    </li>
                    <li>
                        <Link to="/inventory/list" className="report-link">Inventory List</Link>
                    </li>
                </ul>                
            </div>
            
            <Footer/>
        </div>
    )
}

export default AdminHome;




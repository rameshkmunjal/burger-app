import './components.css';
import {Link} from 'react-router-dom';

const NavBar=()=>{
    return(
        <div className="navbar">
          <nav>
            <Link to="/" className="brand">
              <h1>Big Burly Burger</h1>
            </Link>        
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/admin" className="nav-link">Admin</Link> 
            <Link to="/reports" className="nav-link">Reports</Link>      
            <Link to="/logout">Logout</Link>
          </nav>
    </div>
    )
}

export default NavBar;
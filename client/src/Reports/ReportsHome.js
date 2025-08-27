import NavBar  from '../Components/Navbar';
import Footer  from '../Components/Footer';
import { Link } from 'react-router-dom';

const ReportsHome=()=>{
    return(
        <div className="page-container">
            <NavBar />
            <div className="ul-container">                
                <ul className="nav-ul">
                <h2>Daily</h2>
                    <li>
                        <Link to="/reports/daily/release" className="report-link">Daily Release Report</Link>
                    </li>
                </ul>

                <ul className="nav-ul">
                <h2>Monthly</h2>
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




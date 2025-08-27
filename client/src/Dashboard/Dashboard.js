
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const Dashboard = () => {  

  return (
    <div className="page-container">
        <Navbar/>    
            <div className="content-container">
                <h1 className="align-c">Dashboard</h1>        
            </div>
      <Footer/>
    </div>
  );
};

export default Dashboard;

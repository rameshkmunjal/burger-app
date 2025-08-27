/* importing dependencies */
import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

/* importing components */
import SearchFyBar from '../Components/SearchFyBar';
import Footer from '../Components/Footer';
import NavBar from '../Components/Navbar';

import { findFyOfDate } from '../Functions/commonFunctions';

const YearlyReleaseReport = () => { 
  const [releaseList, setReleaseList] = useState([]);   // ✅ fixed
  
  const [year, setYear] = useState(0);

  const url = 'http://localhost:5000';

  useEffect(() => {
    const getInventoryReleaseList = async () => {
      try {
        const response = await axios.get(`${url}/inventory/report/release/fy/${year}`);
        console.log('getInventoryReleaseList response data', response.data);
        setReleaseList(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setReleaseList([]); // fallback to empty array
      }
    };

    if (year) {
      getInventoryReleaseList();
    }
  }, [year]);

  useEffect(()=>{
    let todayDate=new Date();
    setYear(findFyOfDate(todayDate.getMonth()+1, todayDate.getFullYear()));
  },[])

  function handleInput(y) {
    console.log(' year : ', y);
    setYear(y);
  }

  const renderedList = releaseList.map((i) => (
    <tr className="align-c" key={i.id}>          
      <td>{i.date}</td>
      <td>{i.itemId}</td>
      <td className="tt-c">{i.category}</td> 
      <td>{i.itemName}</td>
      <td>{i.unitDesc} {i.measType}</td> 
      <td>{i.quantity}</td> 
      <td>{i.amount}</td> 
      <td>{i.releasedTo}</td> 
      <td>{i.releasedBy}</td>                           
    </tr>
  ));

  return (
    <div className="page-container">
      <NavBar />
      <div className="back-btn-div">
        <button className="btn-div">
          <Link className="link-btn" to={'/reports'}>Back</Link>
        </button>
      </div>
      <div className="search-div">
        <SearchFyBar onSearch={handleInput} />
      </div>    

      <h1 className="flex-center">
        Release List for FY : {year}
      </h1>

      {releaseList.length > 0 && (
        <table className="tbl">
          <thead>
            <tr className="fs-15">
              <th>Date</th>
              <th>Item Id</th>
              <th>Category</th>
              <th>Item Name</th>
              <th>Pack Size</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Released To</th>
              <th>Released By</th>
            </tr>
          </thead>
          <tbody>{renderedList}</tbody>
        </table>
      )}

      <Footer />
    </div>
  );
};

export default YearlyReleaseReport;

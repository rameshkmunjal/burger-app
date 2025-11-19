/* importing dependencies */
import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

/* importing components */
import SearchFyBar from '../Component/SearchFyBar';
import Footer from '../Component/Footer';
import NavBar from '../Component/Navbar';

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
  },[]);

  function doGrandTotal(arr){    
    const gt = arr.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.amount;
    }, 0); 
    return gt;
  }

  function handleInput(y) {
    console.log(' year : ', y);
    setYear(y);
  }

  const renderedList = releaseList.map((i) => (
    <tr className="align-c" key={i.id}>          
      <td>{i.date}</td>
      <td>{i.itemId}</td>
      <td className="tt-c align-l">{i.category}</td> 
      <td className="align-l tt-c">{i.itemName}</td>
      <td>{i.unitDesc} {i.measType}</td> 
      <td>{i.quantity}</td> 
      <td className="align-r">{i.amount.toFixed(2)}</td> 
      <td>{i.releasedTo}</td> 
      <td>{i.releasedBy}</td>                           
    </tr>
  ));

  return (
    <div className="page-container">
      <NavBar />
      <div className="back-btn-div">
        <button>
          <Link className="link click-btn btn-danger" to={'/reports'}>Back</Link>
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
          <tbody>
            {renderedList}
            <tr>
              <td colSpan={6} className="fs-18 align-c fw-b">Total</td>
              <td className="fw-b fs-18 align-r">
                {doGrandTotal(releaseList).toFixed(2)}  
              </td>
              <td colSpan={2}></td>  
            </tr>  
          </tbody>
        </table>
      )}

      <Footer />
    </div>
  );
};

export default YearlyReleaseReport;

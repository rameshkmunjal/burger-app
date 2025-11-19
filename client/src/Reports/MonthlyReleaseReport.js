/* importing dependencies */
import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

/* importing components */
import DateSearchBar from '../Component/DateSerachBar';
import Footer from '../Component/Footer';
import NavBar from '../Component/Navbar';

const MonthlyReleaseReport = () => { 
  const [releaseList, setReleaseList] = useState([]);   // ✅ fixed
  const [month, setMonth] = useState(0);   
  const [monthName, setMonthName]=useState('');           // ✅ use number for backend filter
  const [year, setYear] = useState(0);
  const [total, setTotal]=useState(0);

  const url = 'http://localhost:5000';

  useEffect(() => {
    const getInventoryReleaseList = async () => {
      try {
        const response = await axios.get(
          `${url}/inventory/report/release/month/${month}/${year}`
        );
        console.log('getInventoryReleaseList response data', response.data);
        setReleaseList(Array.isArray(response.data.revisedList) ? response.data.revisedList : []);
        setTotal(response.data.gt);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setReleaseList([]); // fallback to empty array
      }
    };

    if (month && year) {
      getInventoryReleaseList();
    }
  }, [month, year]);

  useEffect(()=>{
    let todayDate=new Date();
    setMonth(todayDate.getMonth()+1);
    setMonthName(todayDate.toLocaleString('default', { month: 'long' }));
    setYear(todayDate.getFullYear());
  },[])

  function handleInput(obj) {
    console.log('object with month and year : ', obj.month, obj.year);
    setMonth(obj.month);
    setMonthName(obj.monthName);
    setYear(obj.year);
  }

  const renderedList = releaseList.map((i) => (
    <tr className="align-c" key={i.id}>          
      <td>{i.date}</td>
      <td>{i.itemId}</td>
      <td className="tt-c">{i.category}</td> 
      <td>{i.itemName}</td>
      <td>{i.unitDesc} {i.measType}</td> 
      <td>{i.quantity}</td> 
      <td>{i.amount.toFixed(2)}</td> 
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
        <DateSearchBar onSearch={handleInput} />
      </div>    

      <h1 className="flex-center">
        Release List for Month : {monthName} {year}
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
          <tr>
            <td colSpan={6}>Total</td>
            <td className="align-c">{total.toFixed(2)}</td>
            <td colSpan={2}></td>
          </tr>
        </table>
      )}

      <Footer />
    </div>
  );
};

export default MonthlyReleaseReport;

import Footer from '../Component/Footer';
import Navbar from '../Component/Navbar';
import DateSearchBar from '../Component/DateSerachBar';
import { MonthsArray } from '../Component/MonthsArray';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { capitaliseFirstLetter, convertObj2Date } from '../Functions/commonFunctions';

const SalesList = () => {
  const url = 'http://localhost:5000';
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [monthName, setMonthName] = useState(MonthsArray[today.getMonth()].monthName);

  const [list, setList] = useState([]);
  const [grandTotal, setGrandTotal]=useState([]);
  const [message, setMessage] = useState('');
  const [outletFilter, setOutletFilter]=useState('');

 

useEffect(() => {
    const getSalesList = async () => {
      try {
        const response = await axios.get(`${url}/sales/list/${month}/${year}`);
        console.log('getSalesList response data', response.data);

        if (response.data && response.data.length > 0) {
          setList(response.data);
          setMessage('');
        } else {
          setList([]);
          setMessage('No sales data to display.');
        }
      } catch (error) {
        console.error('Error fetching sales:', error);
        setList([]);
        setMessage('Failed to fetch sales data.');
      }
    };    
      getSalesList();
    
  }, [month, year]);

  const filteredList = list.filter((item) => {
    const matchOutlet = outletFilter === '' || item.outlet.toLowerCase().includes(outletFilter.toLowerCase());  
  
    return matchOutlet  ;
  });

  useEffect(()=>{
    const changeGrandTotal=async()=>{
      const gt = filteredList.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.amount;
      }, 0);        
      
      setGrandTotal(gt);
    }
    changeGrandTotal();
  }, [filteredList]);
  

  function handleInput(obj) {
    console.log('object with month and year : ', obj.month, obj.year);
    setMonth(obj.month);
    setMonthName(obj.monthName);
    setYear(obj.year);
  }


  const deleteSales = async (id) => {
    try {
      const response=await axios.delete(`${url}/sales/delete/${id}`);
      console.log(response);
      // Re-fetch after deletion
      setList(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting sales:', error);
      setMessage('Failed to delete sales item.');
    }
  };

  

  const renderedList = filteredList.map((i) => (
    <tr key={i.id}>
      <td className="align-c">{convertObj2Date(i.saleDate)}</td>  
      <td className="align-l">{capitaliseFirstLetter(i.outlet)}</td>
      <td className="align-r">{i.amount.toFixed(2)}</td>
      
      
      <td className="align-c">
        <button className="btn-div">
          <Link className="link click-btn btn-success" to={`/sales/edit/${i.id}`}>
            Edit
          </Link>
        </button>
      </td>
      <td className="align-c">
        <button className="btn-div click-btn btn-danger" 
                onClick={
                  (e)=>{
                    e.preventDefault(); 
                    deleteSales(i.id)
                  }
                }>
                Delete
        </button>
      </td>    
    </tr>
  ));
  
  

  return (
    <div className="page-container">
      <Navbar />

      <div className="back-btn-div">
            <button className="btn-div">
            <Link className="link-btn" to={'/admin'}>Back</Link>
            </button>
      </div> 
      <div className="search-div">
        <DateSearchBar onSearch={handleInput} />
      </div> 
        
      <h1 className="flex-center">Sales List : {monthName} {year}</h1>
      <div className="filter-box">
          <input
            type="text"
            placeholder="Filter by Outlet"
            value={outletFilter}
            onChange={(e) => setOutletFilter(e.target.value)}
          />          
        </div>
      

      {message && (
        <div className="flex-center message" style={{ color: 'red', margin: '20px 0' }}>
          {message}
        </div>
      )}

      {list.length > 0 && (
        <table className="tbl">
          <thead>
          <tr>
            <th>Sales Date</th>
            <th>Outlet</th>
            <th>Amount</th>
            <th colSpan={2}>Action</th>
          </tr>
          </thead>
          <tbody>
            {renderedList}
            <tr>
              <td className='fw-b fs-15 align-c' colSpan={(2)} >Total</td>
              <td className=" fw-b fs-15 align-r">{grandTotal.toFixed(2)}</td>
              <td colSpan={(2)}></td>
            </tr>
           
          </tbody>
        </table>
      )}

      <Footer />
    </div>
  );
};

export default SalesList;


import Footer from '../Component/Footer';
import Navbar from '../Component/Navbar';
import DateSearchBar from '../Component/DateSerachBar';
import { MonthsArray } from '../Component/MonthsArray';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


const MonthlyCashFlowReport = () => {
  const url = 'http://localhost:5000';
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [monthName, setMonthName] = useState(MonthsArray[today.getMonth()].monthName);

  const [list, setList] = useState({
    salesTotal: 0,
    purchasesTotal: 0,
    expensesTotal: 0,
    type: '',
    amount: 0
  });
  

  useEffect(() => {
  const getCashFlowReport = async () => {
    try {
      const response = await axios.get(`${url}/general/cash/flow/report/${month}/${year}`);
      console.log('response.data', response.data);
      setList(response.data || {}); 
    } catch (error) {
      console.error('Error fetching sales:', error.response?.data || error.message);
      setList({});
    }
  };
  getCashFlowReport();
}, [month, year]);

  function handleInput(obj) {
    console.log('object with month and year : ', obj.month, obj.year);
    setMonth(obj.month);
    setMonthName(obj.monthName);
    setYear(obj.year);
  }

  

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

      <h1 className="flex-center">
        Cash Flow During Month :  {monthName} {year}
      </h1>     
      <table className="tbl">
            <thead>
                <tr>
                    <th className='align-c fs-18 plr-50 w-200'>Item</th>
                    <th className='align-c fs-18 plr-50 w-200'>Amount</th>
                </tr>
            </thead>
            <tbody>                
                <tr>
                  <td className='align-c fs-18 plr-50 w-200'>Sales</td>
                  <td className="align-r fs-18 plr-50 w-200">{list.salesTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className='align-c fs-18 plr-50 w-200'>Purchases</td>
                  <td className="align-r fs-18 plr-50 w-200">{list.purchasesTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className='align-c fs-18 plr-50 w-200'>Expenses</td>
                  <td className="align-r  fs-18 plr-50">{list.expensesTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className='align-c fs-18 plr-50 w-200'>{list.type}</td>
                  <td className="align-r fs-18 plr-50 w-200">{list.amount.toFixed(2)}</td>
                </tr>
            </tbody>  
    </table>
      

      <Footer />
    </div>
  );
};

export default MonthlyCashFlowReport;


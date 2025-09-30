import Footer from '../Component/Footer';
import Navbar from '../Component/Navbar';
import DateSearchBar from '../Component/DateSerachBar';
import { MonthsArray } from '../Component/MonthsArray';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { capitaliseFirstLetter, convertObj2Date } from '../Functions/commonFunctions';

const MonthlyExpensesReport = () => {
  const url = 'http://localhost:5000';
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [monthName, setMonthName] = useState(MonthsArray[today.getMonth()].monthName);

  const [list, setList] = useState([]);
  const [grandTotal, setGrandTotal]=useState([]);
  const [message, setMessage] = useState('');
  const [headFilter, setHeadFilter]=useState('');
  

  useEffect(() => {
    const getExpensesList = async () => {
      try {
        const response = await axios.get(`${url}/expenses/list/${month}/${year}`);
        console.log('getExpensesList response data', response.data);

        if (response.data && response.data.length > 0) {
          setList(response.data);
          setMessage('');
        } else {
          setList([]);
          setMessage('No expenses data to display.');
        }
      } catch (error) {
        console.error('Error fetching sales:', error);
        setList([]);
        setMessage('Failed to fetch expenses data.');
      }
    };    
      getExpensesList();
    
  }, [month, year]);

  const filteredList = list.filter((item) => {
    const matchHead = headFilter === '' || item.head.toLowerCase().includes(headFilter.toLowerCase());  
  
    return matchHead  ;
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

  const renderedList = filteredList.map((i) => (
    <tr key={i.id}>
      <td className="align-c">{convertObj2Date(i.expenseDate)}</td>  
      <td className="align-l">{capitaliseFirstLetter(i.paidTo)}</td>
      <td className="align-c">{i.head}</td>
      <td className="align-c">{i.details}</td>
      <td className="align-r">{i.amount.toFixed(2)}</td>      
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

      <h1 className="flex-center">
        Expenses During Month :  {monthName} {year}
      </h1>

        <div className="filter-box">
          <input
            type="text"
            placeholder="Filter by Head"
            value={headFilter}
            onChange={(e) => setHeadFilter(e.target.value)}
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
            <th>Expenses Date</th>
            <th>Paid To</th>
            <th>Head</th>
            <th>Details</th>
            <th>Amount</th>
          </tr>
          </thead>
          <tbody>
            {renderedList}
            <tr>
              <td className='fw-b fs-15 align-c' colSpan={(4)} >Total</td>
              <td className=" fw-b fs-15 align-r">{grandTotal.toFixed(2)}</td>
            </tr>
           
          </tbody>
        </table>
      )}

      <Footer />
    </div>
  );
};

export default MonthlyExpensesReport;


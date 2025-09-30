import Footer from '../Component/Footer';
import Navbar from '../Component/Navbar';
import DateSearchBar from '../Component/DateSerachBar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { capitaliseFirstLetter, convertObj2Date } from '../Functions/commonFunctions';
import { MonthsArray } from '../Component/MonthsArray';

const PaymentsList = () => {
  const url = 'http://localhost:5000';

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [monthName, setMonthName] = useState(MonthsArray[today.getMonth()].monthName);

  const [list, setList] = useState([]);
  const [grandTotal, setGrandTotal]=useState([]);
  const [message, setMessage] = useState('');
  

  useEffect(() => {
    const getPaymentsList = async () => {
      try {
        const response = await axios.get(`${url}/general/payments/list/${month}/${year}`);
        console.log('getPaymentsList response data', response.data);

        if (response.data && response.data.length > 0) {
          setList(response.data);
          setMessage('');
        } else {
          setList([]);
          setMessage('No Purchase data to display.');
        }
      } catch (error) {
        console.error('Error fetching purchase:', error);
        setList([]);
        setMessage('Failed to fetch purchase data.');
      }
    };

    
      getPaymentsList();
    
  }, [month, year]);


  useEffect(()=>{
    const changeGrandTotal=async()=>{
      const gt = list.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.amount;
      }, 0);        
      
      setGrandTotal(gt);
    }
    changeGrandTotal();
  }, [list]);

  function handleInput(obj) {
    console.log('object with month and year : ', obj.month, obj.year);
    setMonth(obj.month);
    setMonthName(obj.monthName);
    setYear(obj.year);
  }


  const renderedList = list.map((i) => (
    <tr key={i._id}>
      <td className="align-c">{convertObj2Date(i.date)}</td>     
      
      <td className="align-l">{capitaliseFirstLetter(i.paidTo)}</td>
      <td className="align-l">{i.details}</td>
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
      <DateSearchBar onSearch={handleInput} />

      <h1 className="flex-center">Payments List :{monthName} {year}</h1>

      {message && (
        <div className="flex-center message" style={{ color: 'red', margin: '20px 0' }}>
          {message}
        </div>
      )}

      {list.length > 0 && (
        <table className="tbl">
          <thead>
          <tr>
            <th>Date</th>          
            <th>Paid To</th>          
            <th>Details</th>
            <th>Amount</th>
          </tr>
          </thead>
          <tbody>
            {renderedList} 
            <tr>
              <td className='fw-b fs-15 align-c' colSpan={(3)} >Total</td>
              <td className=" fw-b fs-15 align-r">{grandTotal.toFixed(2)}</td>
            </tr>          
           
          </tbody>
          
        </table>
      )}

      <Footer />
    </div>
  );
};

export default PaymentsList;


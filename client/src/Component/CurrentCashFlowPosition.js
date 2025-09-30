import { MonthsArray } from './MonthsArray';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CurrentCashFlowPosition = () => {
  const url = 'http://localhost:5000';
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const monthName = MonthsArray[today.getMonth()].monthName;


  const [list, setList] = useState({
    salesTotal: 0,
    purchasesTotal: 0,
    expensesTotal: 0,
    amount: 0,
    type: ''
  });
  

  useEffect(() => {
    const getCashFlowReport = async () => {
      try {
        const response = await axios.get(`${url}/general/cash/flow/report/${month}/${year}`);
        console.log('getCashFlowReport response.data:', response.data);
  
        // check if API returns array or object
        if (Array.isArray(response.data)) {
          setList(response.data[0] || {});
        } else {
          setList(response.data || {});
        }
      } catch (error) {
        console.error('Error fetching cash flow report:', error.message);
        setList({
          salesTotal: 0,
          purchasesTotal: 0,
          expensesTotal: 0,
          amount: 0,
          type: ''
        });
      }
    };
    getCashFlowReport();
  }, [month, year]);
  
  

  return (
    <>
         
        <h3 className="flex-center ">Cash Flow : {monthName} {year}</h3>
        
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
                  <td className="align-r fs-18 plr-50 w-200">{(list.salesTotal ?? 0).toFixed(2)}</td>

                </tr>
                <tr>
                  <td className='align-c fs-18 plr-50 w-200'>Purchases</td>
                  <td className="align-r fs-18 plr-50 w-200">{(list.purchasesTotal ?? 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td className='align-c fs-18 plr-50 w-200'>Expenses</td>
                  <td className="align-r fs-18 plr-50 w-200">{(list.expensesTotal ?? 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td className='align-c fs-18 plr-50 w-200'>{list.type}</td>
                  <td className="align-r fs-18 plr-50 w-200">{(list.amount ?? 0).toFixed(2)}</td>
                  
                </tr>
            </tbody>  
    </table>
    
</>);

};

export default CurrentCashFlowPosition;


import React, { useState, useEffect} from 'react';
import axios from 'axios';

const PurchaseSummary = () =>{
    const url = 'http://localhost:5000';
    const [inventorySummary, setInventorySummary] = useState([]);
    const [grandTotal, setGrandTotal]=useState(0);

    useEffect(() =>{
      const getPurchaseSummary = async () =>{
        let response = await axios.get(`${url}/purchase/category/summary`);
        console.log(response.data);
        setInventorySummary(response.data.summary);
        setGrandTotal(response.data.gt);
      }
  
      getPurchaseSummary();      
    }, []); 
  
    
  
    const renderedList=inventorySummary.map(i =>{
          return (
            <tr key={i.category}>
                <td className="align-c tt-c">{i.category}</td>
                <td className="align-r pr-30">{i.categoryTotal.toFixed(2)}</td>
            </tr>          
          )
        }
    )
  
    return (
      <div className="content-container">
          <h3 className="flex-center">Purchase Summary</h3>
          <table className="tbl">
              <thead>
                  <tr>
                      <th>Category</th>
                      <th>Amount</th>
                  </tr>
              </thead>
              <tbody>
                  {renderedList}
                  <tr>
                    <td className='fw-b align-c fs-18'>Total</td>
                    <td className="align-r fw-b fs-18">{grandTotal.toFixed(2)}</td>
                  </tr>
              </tbody>  
      </table>
  </div>);
  }
export default PurchaseSummary;
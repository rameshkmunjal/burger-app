import Navbar  from '../Component/Navbar';
import Footer  from '../Component/Footer';
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PurchaseCategorySummary = () =>{
    const url = 'http://localhost:5000';
    const [inventorySummary, setInventorySummary] = useState([]);
    const [grandTotal, setGrandTotal]=useState(0);
    const [reportDate, setReportDate] = useState('');
    useEffect(() =>{
      const getPurchaseSummary = async () =>{
        let response = await axios.get(`${url}/purchase/category/summary`);
        console.log(response.data);
        setInventorySummary(response.data.summary);
        setGrandTotal(response.data.gt);
      }
  
      getPurchaseSummary();      
    }, []); 
  
    useEffect(()=>{
      let today=new Date();
      let todayDate=today.getDate()+'/'+(Number(today.getMonth())+1)+'/'+today.getFullYear();
      setReportDate(todayDate);
    }, []);
  
    const renderedList=inventorySummary.map(i =>{
          return (
            <tr key={i.category}>
                <td className="align-c tt-c">{i.category}</td>
                <td className="align-c">{i.qtyTotal}</td>
                <td className="align-r pr-30">{i.categoryTotal.toFixed(2)}</td>
            </tr>          
          )
        }
    )
  
    return (
      <div className="admin-home-page">
           <Navbar />
           <div className="back-btn-div">
            <button>
              <Link className="link click-btn btn-danger" to={'/reports'}>Back</Link>
            </button>
          </div>
          <h1 className="flex-center">Purchase Summary : Category-wise</h1>
          <h2 className="flex-center">As on {reportDate}</h2>
          
          <table className="tbl">
              <thead>
                  <tr>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                  </tr>
              </thead>
              <tbody>
                  {renderedList}
                  <tr>
                    <td className='fw-b align-c fs-18' colSpan={2}>Total</td>
                    <td className="align-r fw-b fs-18">{grandTotal.toFixed(2)}</td>
                  </tr>
              </tbody>  
      </table>
      <Footer/>
  </div>);
  }
export default PurchaseCategorySummary;
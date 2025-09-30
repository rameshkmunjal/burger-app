import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

import { convertObj2Date } from '../Functions/commonFunctions';

const PurchaseList = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [list, setList] = useState([]);   // ✅ useState for array
  const [grandTotal, setGrandTotal]=useState([]);
  const [message, setMessage] = useState('');  // ✅ useState for string
  const Navigate=useNavigate();

  const url = 'http://localhost:5000';

  useEffect(() => {
    const getPurchaseList = async () => {
      try {
        const response = await axios.get(`${url}/purchase/list`);
        console.log(response.data);
        if (response.data && response.data.length > 0) {
          setList(response.data);
          setMessage('');
        } else {
          setList([]);
          setMessage('No Purchase List to Display');
        }
      } catch (error) {
        setList([]);
        setMessage(error.message || 'Error fetching data'); // ✅ safer
      }
    };

    getPurchaseList();
  }, []);

  const filteredList = list.filter((item) => {
    const matchCategory = categoryFilter === '' || item.category.toLowerCase().includes(categoryFilter.toLowerCase());  
    return matchCategory ;
  });

  useEffect(()=>{
    const changeGrandTotal=async()=>{
      const gt = filteredList.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.currentValue;
      }, 0);        
      
      setGrandTotal(gt);
    }
    changeGrandTotal();
  }, [filteredList]);

  const deletePurchase = async (id) => {
    try {
      const response=await axios.delete(`${url}/purchase/delete/${id}`);
      console.log(response);
      // Re-fetch after deletion
      setList(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting purchase:', error);
      setMessage('Failed to delete purchase item.');
    }
  };

  const add2Stock=async(id)=>{
    let data={id};
      try {
        const response=await axios.post(`${url}/inventory/add2Stock`, data);
        console.log(response);
        Navigate('/purchase/list');
      } catch (error) {
        console.error('Error adding item to inventory:', error);
        setMessage('Failed to add to stock.');
      }
  }

  const renderedList = list.map((i) => (
    <tr key={i.id}>
      <td className="align-c">{convertObj2Date(i.buyDate)}</td>  
      <td className="align-c">{i.itemId}</td>      
      <td className="align-l">{i.itemName}-{i.unitDesc}{i.measType}</td>
      <td className="align-l">{i.category}</td>
      <td className="align-l">{i.source}</td>
      <td className="align-c">{i.quantity}</td>
      <td className="align-r">{i.amount.toFixed(2)}</td>
      <td className="align-c">
                  {
                    i.add2stock ? 
                    (
                      <button className="inactive-btn">Added</button>
                    ) :
                    (
                      <button className="btn-div" onClick={
                        (e)=>{
                          e.preventDefault(); 
                          add2Stock(i.id)
                        }
                      }> Add2Stock </button>
                    )
                  }                  
      </td>
      
      
      <td className="align-c">
        <button className="btn-div">
          <Link className="link-btn" to={`/purchase/edit/${i.id}`}>
            Edit
          </Link>
        </button>
      </td>
      <td className="align-c">
        <button className="btn-div" 
                onClick={
                  (e)=>{
                    e.preventDefault(); 
                    deletePurchase(i.id)
                  }
                }>
                Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="page-container">
    <Navbar/>
    <div className="back-btn-div">
            <button className="btn-div">
            <Link className="link-btn" to={'/admin'}>Back</Link>
            </button>
    </div> 

    <div className="filter-box">
          <input
            type="text"
            placeholder="Filter by Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          />                    
    </div>


      {message && (
          <div
            className="flex-center message"
            style={{ color: 'red', margin: '20px 0' }}
          >
            {message}
          </div>
        )}
      <div className="content-container">
      <h1 className="align-c">Purchase List</h1>
      
      <table  className="tbl" border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Buy Date</th>          
            <th>Item ID</th>            
            <th>Item Name</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody>
            {renderedList}

            <tr>
              <td colSpan={(5)} ></td>
              <td className="right-aligned-cell">{grandTotal}</td>
            </tr>
        </tbody>
      </table>
      </div>
      <Footer/>
    </div>
  );
};

export default PurchaseList;

/* importing dependencies */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
//importing components
import Footer from '../../../Component/Footer';
import Navbar from '../../../Component/Navbar';
/*importing common functions*/
import { capitaliseFirstLetter, convertObj2Date } from '../../../Functions/commonFunctions';

const PurchasesNotInventoryList=()=>{
    const url = 'http://localhost:5000';
    const [list , setList]=useState([]);
    const [message, setMessage]=useState('');

    const [grandTotal, setGrandTotal]=useState(0);

    const navigate=useNavigate();


    useEffect(() => {    
        const getPurchasesNotInInventoryList = async () => {
          try {
            const response = await axios.get(`${url}/no/inventory/purchase/list`);
            console.log('getPurchaseNotInInventoryList response data', response.data);
    
            if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
                setList(response.data.data); // ✅ use .data inside response
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
        getPurchasesNotInInventoryList();
        
      }, []);

      useEffect(()=>{    
        const changeGrandTotal=async()=>{
          console.log(list);
          const gt = list.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.amount;
          }, 0);        
          
          setGrandTotal(gt);
        }
        changeGrandTotal();
      }, [list]);
//`/purchase/add2stock/${i.id}`

const add2Stock = async (id) => {
  try {
    const response = await axios.post(`${url}/purchase/add2stock/${id}`, {});
    console.log(response);

    if (response.status === 200) {
      // Find the item being added
      const addedItem = list.find(item => item.id === id);
      
      // Remove that item from the list
      setList(prev => prev.filter(item => item.id !== id));

      // Instantly update grand total
      if (addedItem) {
        setGrandTotal(prevTotal => prevTotal - addedItem.amount);
      }

      // Optional confirmation message
      setMessage(`Item '${addedItem?.itemName}' added to stock successfully!`);
      setTimeout(() => setMessage(''), 3000);
    }

  } catch (error) {
    console.error('Error in add purchase details to inventory collection', error);
    setMessage('Failed to add purchase item to inventory collection.');
  }
};

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

      const renderedList = list.map((i) => (
        <tr key={i.id}>
          <td className="align-c">{convertObj2Date(i.buyDate)}</td>  
          <td className="align-c">{i.itemId}</td>      
          <td className="align-l">{i.itemName}-{i.unitDesc}{i.measType}</td>
          <td className="align-l">{capitaliseFirstLetter(i.category)}</td>
          <td className="align-l">{i.source}</td>
          <td className="align-c">{i.quantity}</td>
          <td className="align-r">{i.amount.toFixed(2)}</td>
          <td className="align-c">   
            <button className="click-btn btn-danger" 
                      onClick={
                        (e)=>{
                          e.preventDefault(); 
                          add2Stock(i.id)
                        }
                      }>
                      Add2Stock
              </button>
            </td>
          <td className="align-c">
            <button className="click-btn btn-danger" 
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
          <Navbar />
          <div className="back-btn-div">
                <button className="click-btn btn-danger" onClick={()=>{navigate(-1)}}>Back</button>
          </div>   
    
          <h1 className="flex-center">
            Purchases Not Included In Inventory Collection
          </h1>
    
            
    
          {message && (
            <div className="flex-center message" style={{ color: 'red', margin: '20px 0' }}>
              {message}
            </div>
          )}
    
          {list.length > 0 && (
            <table className="tbl">
              <thead>
              <tr>
                <th>Buy Date</th>          
                <th>Item ID</th>            
                <th>Item Name</th>
                <th>Category</th>
                <th>Supplier</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th colSpan={2}>Action</th>
              </tr>
              </thead>
              <tbody>
                {renderedList}
                <tr>
                    <td className='fw-b fs-15 align-c' colSpan={(6)} >Total</td>
                    <td className=" fw-b fs-15 align-r">{grandTotal.toFixed(2)}</td>
                    <td colSpan={(2)}></td>
              </tr>
              </tbody>
            </table>
          )}
    
          <Footer />
        </div>
      );

}

export default PurchasesNotInventoryList;
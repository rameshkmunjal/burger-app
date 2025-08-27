/* importing dependicies */
import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
/* importing components */
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';



const InventoryList = () => {
  const [list, setList]=useState([]);
  const [message, setMessage]=useState('');

  const url='http://localhost:5000';

  useEffect(()=>{
    const getInventoryList=async()=>{
        try{
            const response=await axios.get(`${url}/inventory/list`);
            console.log(response.data);
            if(response.data && response.data.length > 0){
              setList(response.data);
              setMessage('');
            }else {
              setMessage('response not recieved');
              setList([]);
            }            
        } catch(error){
            console.log(error);
            setMessage(error);
            setList([]);
        }
    }
    getInventoryList();
  }, []);

  const deleteInventory = async (id) => {
    try {
      const response=await axios.delete(`${url}/inventory/delete/${id}`);
      console.log(response);
      // Re-fetch after deletion
      setList(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting inventory:', error);
      setMessage('Failed to delete inventory item.');
    }
  };

  

  const renderedList=list.map((item)=>{
    return(
      <tr key={item.id}>
        <td className="align-c">{item.itemId}</td>
        <td className="align-c">{item.itemName}</td>
        <td className="align-c">{item.quantity}</td>
        <td className="align-c">{item.balanceQty}</td>
        <td className="align-c">{item.releaseQty}</td>
        <td className="align-r">{item.amount.toFixed(2)}</td>
        <td className="align-r">{item.balanceAmt.toFixed(2)}</td>
        <td className="align-r">{item.releaseAmt.toFixed(2)}</td>
        <td className="align-c">
          <button className="btn-div" >
              <Link to={`/inventory/release/${item.id}`} className="btn-div-link">Release</Link>
          </button>
        </td>
        <td className="align-c">
          <button className="btn-div" 
                  onClick={
                    (e)=>{
                      e.preventDefault(); 
                      deleteInventory(item.id)
                    }
                  }>
                  Delete
          </button>
        </td>
      </tr>
    )
  })

  return (
    <div className="page-container">
    <Navbar/>
    <div className="back-btn-div">
            <button className="btn-div">
            <Link className="link-btn" to={'/admin'}>Back</Link>
            </button>
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
          <h1 className="align-c">Inventory List</h1>
          <table className="tbl">
            <thead>
              <tr>
              <th>  Item ID </th>
              <th> Item Name  </th>
              <th> Buy Quantity  </th>
              <th> Balance Quantity  </th>
              <th> Release Quantity  </th>
              <th> Buy Amount  </th>
              <th> Balance Amount  </th>
              <th>  Release Amount </th>
              <th colSpan="2">  Action </th>
              </tr>
            </thead>
            <tbody>
              {renderedList}
            </tbody>
          </table>
      </div>
      
      <Footer/>
    </div>
  );
};

export default InventoryList;

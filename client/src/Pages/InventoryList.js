/* importing dependicies */
import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
/* importing components */
import Footer from '../Component/Footer';
import Navbar from '../Component/Navbar';



const InventoryList = () => {
  const [list, setList]=useState([]);
  const [message, setMessage]=useState('');
  const [grandTotal, setGrandTotal]=useState(0);

  const [itemNameFilter, setItemNameFilter] = useState('');
  const [itemCodeFilter, setItemCodeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const navigate=useNavigate();

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

  const filteredList = list.filter((item) => {
    const matchCategory = categoryFilter === '' || item.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchItemCode = itemCodeFilter === '' || item.itemId.toLowerCase().includes(itemCodeFilter.toLowerCase());
    const matchItemName = itemNameFilter === '' || item.itemName.toLowerCase().includes(itemNameFilter.toLowerCase());
  
    return matchCategory && matchItemCode && matchItemName;
  });

  useEffect(()=>{
    
    const changeGrandTotal=async()=>{
      console.log(filteredList);
      const gt = filteredList.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.amount;
      }, 0);        
      
      setGrandTotal(gt);
    }
    changeGrandTotal();
  }, [filteredList]);


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

  const viewInventory=(id)=>{
      console.log("edit inventory called", id);
      navigate(`/inventory/view/${id}`);

  }



  const renderedList=filteredList.map((item)=>{
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
              <Link to={`/inventory/release/${item.id}`} className="click-btn btn-danger link">Release</Link>
          </button>
        </td>
        <td className="align-c">
          <button className="click-btn btn-danger" 
                  onClick={
                    (e)=>{
                      e.preventDefault(); 
                      viewInventory(item.id)
                    }
                  }>
                  View
          </button>
        </td>
        <td className="align-c">
          <button className="click-btn btn-danger" 
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
            <Link className="click-btn btn-danger link" to={'/admin'}>Back</Link>
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

        <div className="filter-box">
          <input
            type="text"
            placeholder="Filter by Item Code"
            value={itemCodeFilter}
            onChange={(e) => setItemCodeFilter(e.target.value)}
          />          
        </div>


        <div className="filter-box">
          <input
            type="text"
            placeholder="Filter by Item Name"
            value={itemNameFilter}
            onChange={(e) => setItemNameFilter(e.target.value)}
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
              <th colSpan="3">  Action </th>
              </tr>
            </thead>
            <tbody>
              {renderedList}

              <tr>
              <td className='fw-b fs-15 align-c' colSpan={(5)} >Total</td>
              <td className=" fw-b fs-15 align-r">{grandTotal.toFixed(2)}</td>
              <td colSpan={(5)}></td>
            </tr>
            </tbody>
          </table>
      </div>
      
      <Footer/>
    </div>
  );
};

export default InventoryList;

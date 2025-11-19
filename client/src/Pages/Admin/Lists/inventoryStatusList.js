/* importing dependicies */
import React , {useEffect, useState} from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
/* importing components */
import Footer from '../../../Component/Footer';
import Navbar from '../../../Component/Navbar';
//importing functions
import { capitaliseFirstLetter } from '../../../Functions/commonFunctions';




const InventoryStatusList = () => {
  const [list, setList]=useState([]);
  const [message, setMessage]=useState('');

  const [itemNameFilter, setItemNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const navigate=useNavigate();

  const url='http://localhost:5000';

  useEffect(()=>{
    const getInventoryList=async()=>{
        try{
            const response=await axios.get(`${url}/inventory/status/list`);
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
    const matchStatus = statusFilter === '' || item.status.toLowerCase().includes(statusFilter.toLowerCase());
    const matchItemName = itemNameFilter === '' || item.itemName.toLowerCase().includes(itemNameFilter.toLowerCase());
  
    return matchCategory && matchStatus && matchItemName;
  });



  const renderedList=filteredList.map((item)=>{
    return(
      <tr key={item.id}>
        <td className="align-c">{item.itemCode}</td>
        <td className="align-l">{item.itemName}</td>
        <td className="align-l">{capitaliseFirstLetter(item.category)}</td>
        <td className="align-c">{item.currentQty}</td>
        <td className="align-c">{item.minLevel}</td>
        <td className="align-c">{item.maxLevel}</td>

        <td className="align-c">
          <button className={
    item.status === 'out'
      ? 'btn-danger status-btn tt-c'
      : item.status === 'low'
      ? 'btn-yellow status-btn tt-c'
      : item.status === 'add more'
      ? 'btn-purple status-btn tt-c'
      : 'btn-success status-btn tt-c'
  }
>{item.status}</button>
        </td>
        <td className="align-c">{item.recommendedBuyQty}</td>        
      </tr>
    )
  })

  return (
    <div className="page-container">
    <Navbar/>
    <div className="back-btn-div">
            <button className="click-btn btn-danger" onClick={()=>{navigate(-1)}}>Back</button>
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
            placeholder="Filter by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
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
              <th>  Item Code </th>
              <th> Item Name  </th> 
              <th> Category </th>              
              <th> Current Quantity  </th> 
              <th> Minimum Qty  </th> 
              <th> Maximum Qty  </th> 
              <th> Status </th> 
              <th> Quantity Advised  </th>              
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

export default InventoryStatusList;

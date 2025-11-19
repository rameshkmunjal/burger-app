import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';
/* importing components */
import Footer from '../../../Component/Footer';
import Navbar from '../../../Component/Navbar';

import { capitaliseFirstLetter } from '../../../Functions/commonFunctions';

const ItemList = () =>{
    const url = 'http://localhost:5000';
    const [list, setList] = useState([]);

    const [itemNameFilter, setItemNameFilter] = useState('');
    const [itemCodeFilter, setItemCodeFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const navigate=useNavigate();

    useEffect(()=>{
      const getItemList = async () =>{
        let response = await axios.get(`${url}/item/list`);  
        console.log(response.data);      
        setList(response.data);
      }
  
      getItemList();      
    }, []);  

    const filteredList = list.filter((item) => {
      const matchCategory = categoryFilter === '' || item.category.toLowerCase().includes(categoryFilter.toLowerCase());
      const matchItemCode = itemCodeFilter === '' || item.itemCode.toLowerCase().includes(itemCodeFilter.toLowerCase());
      const matchItemName = itemNameFilter === '' || item.itemName.toLowerCase().includes(itemNameFilter.toLowerCase());
    
      return matchCategory && matchItemCode && matchItemName;
    });

    
    
    const deleteItem = async(id) =>{
      console.log(id);
      const response = await axios.delete(`${url}/item/delete/${id}`);
      console.log(response);
      navigate('/item/list');
  }

const renderedList=filteredList.map((i, index) =>{
          return (
            <tr key={`${i.id}-${index}`}>
                <td className='align-c'>{i.prodCode}</td>
                <td className='align-c'>{i.itemCode}</td>
                <td className='align-c tt-c'>{i.itemName}</td>
                <td className='align-c'>{capitaliseFirstLetter(i.category)}</td>
                <td className='align-c'>{capitaliseFirstLetter(i.measType)}</td>
                <td className='align-c tt-c'>{i.minLvl}</td>
                <td className='align-c tt-c'>{i.maxLvl}</td>

                <td className='align-c'>
                  <Link className='btn-success click-btn link' to={`/item/edit/${i.id}`} >
                      Edit 
                  </Link>
                </td> 
                 
                <td className='align-c'>
                  <button className="btn-div btn-danger" onClick={()=>deleteItem(i.id)}>
                      Delete
                  </button>
                </td>                
                
            </tr>
            
        )
        }
    )

    return (
      <div className="content-container">
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

          <h1 className="flex-center">Item List</h1>
          
          <table className="tbl">
              <thead>
                  <tr>                      
                      <th className='align-c'>Product Id</th> 
                      <th className='align-c'>Item Code</th>                      
                      <th className='align-c'>Item Name</th>
                      <th className='align-c'>Category</th>
                      <th className='align-c'>Meas Type</th>
                      <th className='align-c'>Min Level</th>
                      <th className='align-c'>Max Level</th>
                      <th className='align-c' colSpan={2}>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {renderedList}
              </tbody>  
      </table>
      <Footer/>
  </div>);
}
export default ItemList;

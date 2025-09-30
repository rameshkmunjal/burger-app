import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';
/* importing components */
import Footer from '../Component/Footer';
import Navbar from '../Component/Navbar';

import { capitaliseFirstLetter } from '../Functions/commonFunctions';

const ItemList = () =>{
    const url = 'http://localhost:5000';
    const [list, setList] = useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
      const getItemList = async () =>{
        let response = await axios.get(`${url}/item/list`);  
        console.log(response.data);      
        setList(response.data);
      }
  
      getItemList();      
    }, []);  

   

    
    
    const deleteItem = async(id) =>{
      console.log(id);
      const response = await axios.delete(`${url}/item/delete/${id}`);
      console.log(response);
      navigate('/item/list');
  }

const renderedList=list.map(i =>{
          return (
            <tr key="i._id">
                <td className='align-c'>{capitaliseFirstLetter(i.prodCode)}</td>
                <td className='align-c'>{capitaliseFirstLetter(i.category)}</td>
                <td className='align-c tt-c'>{i.itemName}</td>
                <td className='align-c tt-c'>{i.minLvl}</td>
                <td className='align-c tt-c'>{i.maxLvl}</td>

                <td className='align-c'>
                  <Link className='btn-success click-btn link' to={`/item/edit/${i.id}`} >
                      Edit 
                  </Link>
                </td> 
                 
                <td className='align-c'>
                  <button className="btn-div btn-danger" onClick={()=>deleteItem(i._id)}>
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
                <button className="btn-div">
                <Link className="link-btn" to={'/admin'}>Back</Link>
                </button>
            </div> 
          <h1 className="flex-center">Item List</h1>
          
          <table className="tbl">
              <thead>
                  <tr>                      
                      <th className='align-c'>Product Id</th>
                      <th className='align-c'>Category</th>
                      <th className='align-c'>Item Name</th>
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

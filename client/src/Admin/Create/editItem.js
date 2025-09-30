import Navbar  from '../../Component/Navbar';
import Footer  from '../../Component/Footer';
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Link , useNavigate, useParams} from 'react-router-dom';

const EditItem = () =>{
    const {id}=useParams();
    console.log(id);
    const [message, setMessage]=useState('');
    const [prodCode, setProdCode] = useState('');
    const [itemName, setItemName] = useState('');
    
    const [category, setCategory]=useState(''); 
    const [minLvl, setMinLvl]=useState(''); 
    const [maxLvl, setMaxLvl]=useState('');    
   
    const navigate=useNavigate();


    const url = "http://localhost:5000";

    useEffect(()=>{
        const getSingleItemDetails=async()=>{
            try{
                const response=await axios.get(`${url}/item/edit/${id}`);
                
                if(response.data){
                    setMessage('');
                    setProdCode(response.data.prodCode);
                    setItemName(response.data.itemName);
                    setCategory(response.data.category);
                    setMinLvl(response.data.minLvl);
                    setMaxLvl(response.data.maxLvl);
                } else{
                    setMessage('response data not  received');
                }            
            }catch(error){
                setMessage('Error falls in catch block. ');
            }        
        }
        
        getSingleItemDetails();
    }, [id, message]);



    const submitHandler = async(e) =>{
        console.log("create button clicked");
        e.preventDefault();
        let itemData={id, prodCode, itemName, category,  minLvl, maxLvl};           
        const response = await axios.put(`${url}/item/edit/${id}`, itemData);
        console.log(response.data);
        navigate('/admin');
    }        
     
    
    return (
        <div className='page-container'>
        <Navbar />

        {message && (
          <div
            className="flex-center message"
            style={{ color: 'red', margin: '20px 0' }}
          >
            {message}
          </div>
        )}

         <div className="content-container">
              <button className="btn-div">
                    <Link className="link" to={'/admin'}>Back</Link>
              </button>
          </div>       
        <div className="form-container">            
            <form className="create-inventory-form">
                <h1 className="centered">Edit Item</h1>                

                <div className="form-input-div">
                    <label>Product Code</label>
                        <input
                            type="text"
                            value={prodCode}
                            onChange={(e)=>setProdCode(e.target.value)}
                            className="form-input" placeholder="Product Code "
                        />
                </div>

                <div className="form-input-div">
                    <label>Item Name</label>
                        <input
                            type="text"
                            value={itemName}
                            onChange={(e)=>setItemName(e.target.value)}
                            className="form-input" placeholder="Item Name "
                        />
                </div>

                <div className="form-input-div">
                    <label>Category</label>                  

                    <input
                            type="text"
                            value={category}
                            onChange={(e)=>setCategory(e.target.value)}
                            className="form-input" placeholder="Category "
                        />
                </div>

                <div className="form-input-div">
                    <label>Min Level</label>                  

                    <input
                            type="text"
                            value={minLvl}
                            onChange={(e)=>setMinLvl(e.target.value)}
                            className="form-input" placeholder="Min Qty Level "
                        />
                </div>

                <div className="form-input-div">
                    <label>Max Qty Level</label>                  

                    <input
                            type="text"
                            value={maxLvl}
                            onChange={(e)=>setMaxLvl(e.target.value)}
                            className="form-input" placeholder="Max Qty Level "
                        />
                </div>
                
                <div className="form-input-div flex-center">
                        <button
                            onClick={submitHandler}
                            className="click-btn btn-danger"                            
                        >Submit</button>
                </div>
            </form>

            </div>
            <Footer/>
            </div>
    )
 }


export default EditItem;
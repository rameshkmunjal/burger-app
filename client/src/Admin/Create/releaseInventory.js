import React, { useState, useEffect} from 'react';
import axios from 'axios';

import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../Component/Navbar';
import Footer from '../../Component/Footer';
import { convertObj2Date } from '../../Functions/commonFunctions';

const ReleasePurchase = () =>{    
    const {id}=useParams();
    console.log(id);
    const [message, setMessage]=useState('');
    const [itemName, setItemName]=useState('');
    const [buyDate, setBuyDate]=useState('');
    const [balanceQty, setBalanceQty]=useState(0);

    const [currentReleaseQty, setCurrentReleaseQty ]=useState(0);

    const navigate=useNavigate();

    const url = "http://localhost:5000";
    
//const date = new Date("2025-07-18");

useEffect(()=>{
    const getSingleInventoryDetails=async()=>{
        try{
            const response=await axios.get(`${url}/inventory/item/${id}`);
            console.log(response.data);
            const item=response.data;
            if(response.data){
                setMessage('');
                setItemName(item.itemName);
                setBuyDate(item.buyDate);
                setBalanceQty(item.balanceQty);
            } else{
                setMessage('response data not  received');
                setItemName('');
            }            
        }catch(error){
            setMessage( error);
            setItemName('');
        }        
    }
    
    getSingleInventoryDetails();
}, [id]);

    const submitHandler = async(e) =>{
            console.log("create button clicked");
            e.preventDefault();
            let data={currentReleaseQty}; 
            console.log(data);            
            const response = await axios.put(`${url}/inventory/release/${id}`, data);
            console.log(response.data); 
            navigate(`/inventory/list`);
 } 

    return (
    <div className="page-container">
        <Navbar />
         <div  className="back-btn-div">
            <button className="btn-div">
                <Link className="link-btn" to={'/admin'}>Back</Link>
            </button>
      </div>  
      <div>{message}</div>     
        <div className="form-container">            
            <form className="create-inventory-form">
                <h1 className="centered">Release Inventory</h1>                

                <div  style={{paddingLeft:20, paddingBottom:20}}>
                    <h4>Item : {itemName}</h4>
                    <p>Date: {convertObj2Date(buyDate) || "—"}</p>
                    <p>Quantity Available : {balanceQty}</p>

                </div> 

                <div className="form-input-div">
                    <label>Current Quantity Reqd</label>
                    <input 
                        type="text" 
                        value={currentReleaseQty} 
                        onChange={(e)=>setCurrentReleaseQty(e.target.value)}
                        className="form-input"
                        placeholder="r" 
                    />
                </div>                
                
                <div className="form-input-div flex-center">
                        <button
                            onClick={submitHandler}
                            className="btn-div"                            
                        >Submit</button>
                </div>
            </form>

            </div>
            <Footer/>
        </div>
    )
 }


export default ReleasePurchase;


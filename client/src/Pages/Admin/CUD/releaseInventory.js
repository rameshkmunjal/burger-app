import React, { useState, useEffect} from 'react';
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../Component/Navbar';
import Footer from '../../../Component/Footer';
import { convertObj2Date, validateDate, formatDate } from '../../../Functions/commonFunctions';

const ReleasePurchase = () =>{    
    const {id}=useParams();
    console.log(id);
    const [message, setMessage]=useState('');
    const [itemId, setItemId]=useState('');
    const [itemName, setItemName]=useState('');
    const [buyDate, setBuyDate]=useState('');
    const [balanceQty, setBalanceQty]=useState(0);

    const [day, setDay]=useState(0);
    const [month, setMonth]=useState(0);
    const [year, setYear]=useState(0);
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
                setItemId(item.id);
                setItemName(item.itemName);
                setBuyDate(item.buyDate);
                setBalanceQty(item.balanceQty);
            } else{
                setMessage('response data not  received');
                setItemName('');
                setBuyDate('');
                setBalanceQty(0);
                setItemId('');
            }            
        }catch(error){
            setMessage( error);
            setItemName('');
                setBuyDate('');
                setBalanceQty(0);
                setItemId('');
        }        
    }
    
    getSingleInventoryDetails();
}, [id]);

    const submitHandler = async(e) =>{
            console.log("create button clicked");
            e.preventDefault();
            if(validateDate(year, month, day)){
                let date=formatDate(year, month, day);
                let data={date, currentReleaseQty}; 
                console.log(data);            
                const response = await axios.put(`${url}/inventory/release/${itemId}`, data);
                console.log(response.data); 
                navigate(`/inventory/list`);
            }
 } 

    return (
    <div className="page-container">
        <Navbar />
        <div className="back-btn-div">
            <button className="click-btn btn-danger" onClick={()=>{navigate(-1)}}>Back</button>
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
                    <label>Date</label>
                        <input
                            type="text"
                            value={day}
                            onChange={(e)=>setDay(e.target.value)}
                            className="form-input day-input" placeholder="Day "
                        />
                        <input
                            type="text"
                            value={month}
                            onChange={(e)=>setMonth(e.target.value)}
                            className="form-input month-input" placeholder="Month"
                        />
                        <input
                            type="text"
                            value={year}
                            onChange={(e)=>setYear(e.target.value)}
                            className="form-input year-input" placeholder="Year "
                        />
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
                            className="click-btn btn-danger"                            
                        >Submit</button>
                </div>
            </form>

            </div>
            <Footer/>
        </div>
    )
 }


export default ReleasePurchase;


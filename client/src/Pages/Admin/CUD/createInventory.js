import Navbar  from '../../../Component/Navbar';
import Footer  from '../../../Component/Footer';
import React, {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

const CreateInventory = () =>{ 
    const {id}=useParams();
    const [amount, setAmount]=useState(0);
    const [quantity, setQuantity]=useState(0);

    const [message, setMessage]=useState("");
    const navigate=useNavigate();
    

    const url = "http://localhost:5000";


    useEffect(()=>{
        const getSinglePUrchaseDetails=async()=>{
            try{
                const response=await axios.get(`${url}/purchase/item/${id}`);
                console.log(response.data);
                if(response.data){
                    setAmount(response.data.amount);
                    setQuantity(response.data.quantity);
                } else{
                    setMessage('response data not  received');
                }            
            }catch(error){
                setMessage('Error Happened : ', error);
            }        
        }
        
        getSinglePUrchaseDetails();
    }, [id]);        
     
    const submitHandler = async(e) =>{
            e.preventDefault();    
        
            let data={amount, quantity }; 
            console.log(data);            
            const response = await axios.post(`${url}/inventory/create/${id}`, data);
            console.log(response.data); 
            navigate('/purchase/list');
                        
        }                         
       
        return (
            <div className="page-container">
                <Navbar />
                 <div  className="back-btn-div">
                    <button>
                        <Link className="link click-btn btn-danger" to={'/admin'}>Back</Link>
                    </button>
              </div>  
              <div>{message}</div>     
                <div className="form-container">            
                    <form className="create-inventory-form">
                        <h1 className="centered">Edit Inventory</h1> 
        
                        <div className="form-input-div">
                            <label>Quantity</label>
                                <input
                                    type="text"
                                    value={quantity}
                                    onChange={(e)=>setQuantity(e.target.value)}
                                    className="form-input" placeholder="Quantity"
                                />
                        </div>
        
                        <div className="form-input-div">
                            <label>Amount</label>
                                <input
                                    type="text"
                                    value={amount}
                                    onChange={(e)=>setAmount(e.target.value)}
                                    className="form-input" placeholder="Amount"
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
        


export default CreateInventory;
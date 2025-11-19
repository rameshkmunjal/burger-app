import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../Component/Navbar';
import Footer from '../../../Component/Footer';
import { convertObj2Date } from '../../../Functions/commonFunctions';

const EditInventory = () => {
  const { id} = useParams();
  const [item, setItem] = useState({
    buyDate: '',
    category:'',
    itemCode:'',
    itemName:'',

    quantity:0,
    amount:0,
    balanceQty:0,
    balanceAmt:0,

  });


  const [message, setMessage] = useState('');
  const [balanceQty, setBalanceQty] = useState(0);
  const [balanceAmt, setBalanceAmt]=useState(0);

  const navigate = useNavigate();
  const url = "http://localhost:5000";


useEffect(()=>{
  const getSingleInventoryDetails=async()=>{
    try{
        const response=await axios.get(`${url}/inventory/item/${id}`);
        console.log(response.data);
        
        if(response.data){
            setMessage('');
            setItem(response.data);
            setBalanceAmt(response.data.balanceAmt);
            setBalanceQty(response.data.balanceQty);
        } else{
            setMessage('response data not  received');
        }            
    }catch(error){
        setMessage('Error Happened : ', error);
    } 
       
    }
    getSingleInventoryDetails();
}, [id]);


const submitHandler = async(e) =>{    
    e.preventDefault();
    
    let data={balanceAmt, balanceQty }; 
        console.log(data);            
        const response = await axios.put(`${url}/inventory/edit/${id}`, data);
        console.log(response.data); 
        navigate('/inventory/list');
                            
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
                    <label>Buy Date</label>
                        <input
                            type="text"
                            value={convertObj2Date(item.buyDate)}                            
                            className="form-input" placeholder="Day "
                            viewonly
                        />
                      
                </div> 
                <div className="form-input-div">
                    <label>Category</label> 
                    <input
                            type="text"
                            value={item.category}
                            className="form-input" placeholder="Category "
                            viewonly
                        /> 
                </div>

                <div className="form-input-div">
                    <label>Item Code</label>
                        <input
                            type="text"
                            value={item.itemCode}
                            className="form-input" placeholder="Item Code "
                            viewonly
                        />
                </div>

                <div className="form-input-div">
                    <label>Item Name</label>
                        <input
                            type="text"
                            value={item.itemName}
                            className="form-input" placeholder="Item Name "
                            viewonly
                        />
                </div>  
     

                <div className="form-input-div">
                    <label>Quantity</label>
                        <input
                            type="text"
                            value={item.quantity}
                            className="form-input" placeholder="Quantity"
                            viewonly
                        />
                </div>

                
                <div className="form-input-div">
                    <label>Amount</label>
                        <input
                            type="text"
                            value={item.amount}
                            className="form-input" placeholder="Amount"
                            viewonly
                        />
                </div>

                <div className="form-input-div">
                    <label>Balance Quantity</label>
                        <input
                            type="text"
                            value={balanceQty}
                            onChange={(e)=>setBalanceQty(e.target.value)}
                            className="form-input" placeholder="Balance Quantity "
                        />
                </div>  

                <div className="form-input-div">
                    <label>Balance Amount</label>
                        <input
                            type="text"
                            value={balanceAmt}
                            onChange={(e)=>setBalanceAmt(e.target.value)}
                            className="form-input" placeholder="Balance Amount"
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
 
};

export default EditInventory;

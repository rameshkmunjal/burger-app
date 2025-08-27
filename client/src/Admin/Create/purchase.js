import React, { useState} from 'react';
import axios from 'axios';
import { validateDate, formatDate} from '../../Functions/commonFunctions';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

const Purchase = () =>{    
    const [year, setYear]=useState(0);
    const [month, setMonth]=useState(0);
    const [day, setDay]=useState(0);
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [unitDesc, setUnitDesc]=useState('');
    const [quantity, setQuantity] = useState(0);
    const [measType, setMeasType]=useState('');
    const [amount, setAmount] = useState(0);
    const [source, setSource]=useState('');

    const navigate=useNavigate();

    const baseUrl = "http://localhost:5000";
    
//const date = new Date("2025-07-18");

    const submitHandler = async(e) =>{
            console.log("create button clicked");
            e.preventDefault();
            
            if(validateDate(year, month, day)){
                let date=formatDate(year, month, day);
                console.log(date);
                let data={
                        date, itemCode, itemName, category, 
                        quantity, unitDesc, measType, source,
                        amount
                    }; 
                console.log(data);            
                const response = await axios.post(`${baseUrl}/purchase/create`, data);
                console.log(response.data); 
                navigate('/purchase/list');
            } else {
                console.log("input date invalid");                
            }                         
    }   

    
    return (
    <div className="page-container">
        <Navbar />
         <div  className="back-btn-div">
            <button className="btn-div">
                <Link className="link-btn" to={'/admin'}>Back</Link>
            </button>
      </div>       
        <div className="form-container">            
            <form className="create-inventory-form">
                <h1 className="centered">Create Purchase</h1> 

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
                    <label>Category</label>                  

                    <select
                        className="selectDiv"
                        value={category}
                        onChange={(e)=>setCategory(e.target.value)} 
                    >  
                        <option>Select Category</option>                                     
                        <option value="grocery">Grocery</option>
                        <option value="spices">Spices</option>
                        <option value="packaging">Packaging</option>
                        <option value="frozen">Frozen Food</option>
                        <option value="sauces">Sauces Syrups</option> 
                        <option value="drinks">Cold Drinks</option> 
                        <option value="products">Products</option>                       
                    </select>
                </div>

                <div className="form-input-div">
                    <label>Item Code</label>
                        <input
                            type="text"
                            value={itemCode}
                            onChange={(e)=>setItemCode(e.target.value)}
                            className="form-input" placeholder="Item Code "
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
                    <label>Unit Description</label>
                        <input
                            type="text"
                            value={unitDesc}
                            onChange={(e)=>setUnitDesc(e.target.value)}
                            className="form-input" placeholder="Unit Description "
                        />
                </div> 

                           

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
                    <label>Measurement Type</label>
                        <input
                            type="text"
                            value={measType}
                            onChange={(e)=>setMeasType(e.target.value)}
                            className="form-input" placeholder="Measurement Type "
                        />
                </div>  

                <div className="form-input-div">
                    <label>Source</label>
                        <input
                            type="text"
                            value={source}
                            onChange={(e)=>setSource(e.target.value)}
                            className="form-input" placeholder="Supplier Name"
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
                            className="btn-div"                            
                        >Submit</button>
                </div>
            </form>

            </div>
            <Footer/>
        </div>
    )
 }


export default Purchase;


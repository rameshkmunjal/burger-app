import Navbar  from '../../Component/Navbar';
import Footer  from '../../Component/Footer';
import React, { useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { validateDate, formatDate } from '../../Functions/commonFunctions';

const Sales = () =>{    
    const [day, setDay]=useState(0);
    const [month, setMonth]=useState(0);
    const [year, setYear]=useState(0);
    const [outlet, setOutlet] = useState('');    
    const [amount, setAmount] = useState('');
    const navigate=useNavigate();

    const url = "http://localhost:5000";
    
    const submitHandler = async(e) =>{
        console.log("create button clicked");
            e.preventDefault();
            
            if(validateDate(year, month, day)){
                let date=formatDate(year, month, day);
                console.log(date);
                let data={
                        date,  outlet, amount
                    }; 
                console.log(data);            
                const response = await axios.post(`${url}/sales/create`, data);
                console.log(response.data); 
                navigate('/sales/list');
            } else {
                console.log("input date invalid");                
            }
    }       
    
    return (
        <>
        
           <Navbar />
           <div className="back-btn-div">
            <button className="btn-div">
              <Link className="link click-btn btn-danger" to={'/admin'}>Back</Link>
            </button>
          </div>      
        <div className="form-container">            
            <form className="create-inventory-form">
                <h1 className="centered">Create Sales</h1>                 

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
                    <label>Outlet </label>
                    <select
                        className="selectDiv"
                        value={outlet}
                        onChange={e => setOutlet(e.target.value)} 
                    >   
                        <option>Choose Outlet</option>
                        <option value="Outlet-76">Outlet-76</option>
                    </select>                        
                </div>


                <div className="form-input-div">
                    <label>Amount</label>
                        <input
                            type="text"
                            value={amount}
                            onChange={(e)=>setAmount(e.target.value)}
                            className="form-input" placeholder="Amount "
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
            </>
    )
 }


export default Sales;

// transaction is expense or purchase
// different form for both
// form for purchase - fields - seller , item id, amount, quantity of item purchased, meas type
// form for expenses - fields - reciever of payment, expense id, amount, 
//opening cash balance , transaction_id, closing cash balance
// 3 fields to be added - opening cash balance, transaction_id, closing cash balance
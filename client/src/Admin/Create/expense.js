import Navbar  from '../../Component/Navbar';
import Footer  from '../../Component/Footer';
import React, { useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { validateDate, formatDate } from '../../Functions/commonFunctions';

const Expense = () =>{    
    const [day, setDay]=useState(0);
    const [month, setMonth]=useState(0);
    const [year, setYear]=useState(0);
    const [paidTo, setPaidTo] = useState('');    
    const [amount, setAmount] = useState(0);
    const [head, setHead] = useState('');
    const [details, setDetails] = useState('');

    const navigate=useNavigate();

    const url = "http://localhost:5000";
    
    const submitHandler = async(e) =>{
        console.log("create button clicked");
            e.preventDefault();
            
            if(validateDate(year, month, day)){
                let date=formatDate(year, month, day);
                console.log(date);
                let data={
                        date,  paidTo, amount, head, details
                    }; 
                console.log(data);            
                const response = await axios.post(`${url}/expense/create`, data);
                console.log(response.data); 
                navigate('/expenses/list');
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
                <h1 className="centered">New Expense</h1>                 

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
                    <label>Head </label>
                    <select
                        className="selectDiv"
                        value={head}
                        onChange={e => setHead(e.target.value)} 
                    >   
                        <option>Choose Head</option>
                        <option value="electricity">Electricity</option>
                        <option value="rent">Rent</option>
                        <option value="cartage">Cartage</option>
                        <option value="misc">Misc</option>
                        <option value="cleansing">Cleansing</option>
                        <option value="gas">Gas and Fuel</option>
                        <option value="taxes">Taxes</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="salaries">Salaries</option>
                        <option value="telephone">Telephone & Internet</option>
                        <option value="repairs">Repairs</option>
                        <option value="bank charges">Bank Charges</option>
                        <option value="utensils">Utensils</option>
                        <option value="stationery">Stationery</option>
                    </select>                        
                </div>

                <div className="form-input-div">
                    <label>Details</label>
                        <input
                            type="text"
                            value={details}
                            onChange={(e)=>setDetails(e.target.value)}
                            className="form-input" placeholder="Details "
                        />
                </div>  

                

                <div className="form-input-div">
                    <label>Paid To</label>
                        <input
                            type="text"
                            value={paidTo}
                            onChange={(e)=>setPaidTo(e.target.value)}
                            className="form-input" placeholder="Paid To "
                        />
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


export default Expense;

// transaction is expense or purchase
// different form for both
// form for purchase - fields - seller , item id, amount, quantity of item purchased, meas type
// form for expenses - fields - reciever of payment, expense id, amount, 
//opening cash balance , transaction_id, closing cash balance
// 3 fields to be added - opening cash balance, transaction_id, closing cash balance





/*

    expenseDate
    paidTo
    amount
    head
    details
*/
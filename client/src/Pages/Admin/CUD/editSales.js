import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { validateDate, formatDate} from '../../../Functions/commonFunctions';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../Component/Navbar';
import Footer from '../../../Component/Footer';

const EditSales = () =>{    
    const {id}=useParams();
    console.log(id);
    const [message, setMessage]=useState('');
    const [day, setDay]=useState(0);
    const [month, setMonth]=useState(0);
    const [year, setYear]=useState(0);
    const [outlet, setOutlet]=useState('');
    const [amount, setAmount] = useState(0);

    const navigate=useNavigate();

    const url = "http://localhost:5000";
    
//const date = new Date("2025-07-18");

useEffect(()=>{
    const getSingleSalesDetails=async()=>{
        try{
            const response=await axios.get(`${url}/sales/${id}`);
            console.log(response.data);
            const item=response.data;
            if(response.data){
                setMessage('');
                setDay(item.day);
                setMonth(item.month);
                setYear(item.year);
                setAmount(item.amount);
                setOutlet(item.outlet);
                //setDate(item.saleDate);
            } else{
                setMessage('response data not  received');
            }            
        }catch(error){
            setMessage('Error Happened : ', error);
        }        
    }
    
    getSingleSalesDetails();
}, [id]);

    const submitHandler = async(e) =>{
            console.log("create button clicked");
            e.preventDefault();
            
            if(validateDate(year, month, day)){
                let date=formatDate(year, month, day);
                console.log(date);
                let data={
                       id, date,  outlet, amount
                    }; 
                console.log(data);            
                const response = await axios.put(`${url}/sales/edit/${id}`, data);
                console.log(response.data); 
                navigate('/sales/list');
            } else {
                console.log("input date invalid");                
            }                         
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
                <h1 className="centered">Edit Sales</h1> 

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
                    <label>Outlet</label>
                        <input
                            type="text"
                            value={outlet}
                            onChange={(e)=>setOutlet(e.target.value)}
                            className="form-input" placeholder="Outlet Name"
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


export default EditSales;


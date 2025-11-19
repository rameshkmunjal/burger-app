import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { validateDate, formatDate} from '../../../Functions/commonFunctions';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../../Component/Navbar';
import Footer from '../../../Component/Footer';

const NewPurchase = () =>{   
    const url = 'http://localhost:5000';
    //const [list, setList] = useState([]);
    const [itemCode, setItemCode] = useState('');
    const [year, setYear]=useState(2025);
    const [month, setMonth]=useState(0);
    const [day, setDay]=useState(0);
    //const [itemCode, setItemCode] = useState('');
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

useEffect(() => {
    const getItemList = async () => {
      try {
        const response = await axios.get(`${url}/item/list`);
        console.log("✅ API response received:", response.data);
  
        // Ensure it's an array
        if (Array.isArray(response.data) && response.data.length > 0) {
          localStorage.setItem("itemList", JSON.stringify(response.data));
          console.log("✅ itemList stored in localStorage");
        } else {
          console.warn("⚠️ Response is empty or not an array");
        }
  
        // Double-check immediately
        const check = localStorage.getItem("itemList");
        console.log("🔍 LocalStorage check:", check ? "Saved" : "Not saved");
  
      } catch (error) {
        console.error("❌ Error fetching item list:", error);
      }
    };
  
    getItemList();
  }, []);
  
  
  const handleChange = (e) => {
    const code = e.target.value;
    setItemCode(code);  // ✅ allow typing in the input

    const itemList = JSON.parse(localStorage.getItem('itemList')) || [];    
    const item = itemList.find(obj => obj.itemCode === code);
    
    if (item) {
      setItemName(item.itemName);
      setCategory(item.category);
      setMeasType(item.measType);
    } else {
      setItemName('');
      setCategory('');
      setMeasType('');
    }
  };
  
  
  


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
            <button>
                <Link className="link click-btn btn-danger" to={'/admin'}>Back</Link>
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
                    <label>Item Code</label>
                        <input
                            type="text"
                            value={itemCode}
                            onChange={handleChange}
                            className="form-input" placeholder="Item Code "
                        />
                </div>

                <div className="form-input-div">
                    <label>Item Name</label>
                        <input
                            type="text"
                            value={itemName}                            
                            className="form-input" readonly
                        />
                </div>  
                <div className="form-input-div">
                    <label>Category</label>                  

                    <input
                        type="text"
                        value={category}
                        className="form-input" readonly
                    />
                </div>

                <div className="form-input-div">
                    <label>Unit Description</label>
                        <input
                            type="text"
                            value={unitDesc}
                            onChange={(e)=>setUnitDesc(e.target.value)}
                            className="form-input" placeholder="Unit Description "
                        /><span>{measType}</span>
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
                            className="click-btn btn-danger"                            
                        >Submit</button>
                </div>
            </form>

            </div>
            <Footer/>
        </div>
    )
 }


export default NewPurchase;


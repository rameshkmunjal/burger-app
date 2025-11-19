import Navbar  from '../../../Component/Navbar';
import Footer  from '../../../Component/Footer';
import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const CreateItem = () =>{
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [prodCode, setProdCode]=useState(''); 
    const [category, setCategory]=useState(''); 
    const [measType, setMeasType]=useState(''); 
    const [minLvl, setMinLvl]=useState(''); 
    const [maxLvl, setMaxLvl]=useState('');    
   
    const navigate=useNavigate();


    const baseUrl = "http://localhost:5000";

    const submitHandler = async(e) =>{
        console.log("create button clicked");
        e.preventDefault();
        let itemData={itemName,itemCode, prodCode, category, measType, minLvl, maxLvl};           
        const response = await axios.post(`${baseUrl}/item/create`, itemData);
        console.log(response.data);
        navigate(-1);
    }        
     
    
    return (
        <div className='page-container'>
        <Navbar />
        <div className="back-btn-div">
                <button className="click-btn btn-danger" onClick={()=>{navigate(-1)}}>Back</button>
        </div>       
        <div className="form-container">            
            <form className="create-inventory-form">
                <h1 className="centered">Create Item Code</h1>                

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
                    <label>Prod Code</label>
                        <input
                            type="text"
                            value={prodCode}
                            onChange={(e)=>setProdCode(e.target.value)}
                            className="form-input" placeholder="Prod Code "
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
                            className="form-input" placeholder="Category  "
                        />
                </div>

                <div className="form-input-div">
                    <label>Meas Type</label>                  

                    <input
                            type="text"
                            value={measType}
                            onChange={(e)=>setMeasType(e.target.value)}
                            className="form-input" placeholder="Meas Type  "
                        />
                </div>

                <div className="form-input-div">
                    <label>Min Level</label>                  

                    <input
                            type="text"
                            value={minLvl}
                            onChange={(e)=>setMinLvl(e.target.value)}
                            className="form-input" placeholder="Minimum Level "
                        />
                </div>

                <div className="form-input-div">
                    <label>Max Level</label>                  

                    <input
                            type="text"
                            value={maxLvl}
                            onChange={(e)=>setMaxLvl(e.target.value)}
                            className="form-input" placeholder="Max Lvl  "
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


export default CreateItem;
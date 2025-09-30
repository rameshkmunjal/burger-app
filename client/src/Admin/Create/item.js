import Navbar  from '../../Component/Navbar';
import Footer  from '../../Component/Footer';
import React, { useState} from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';

const CreateItem = () =>{
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [cql, setCql]=useState('');    
   
    const navigate=useNavigate();


    const baseUrl = "http://localhost:5000";

    const submitHandler = async(e) =>{
        console.log("create button clicked");
        e.preventDefault();
        let itemData={itemName,itemCode,  cql};           
        const response = await axios.post(`${baseUrl}/item/create`, itemData);
        console.log(response.data);
        navigate('/admin');
    }        
     
    
    return (
        <div className='page-container'>
        <Navbar />
         <div className="content-container">
              <button className="btn-div">
                    <Link className="link" to={'/admin'}>Back</Link>
              </button>
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
                    <label>Item Name</label>
                        <input
                            type="text"
                            value={itemName}
                            onChange={(e)=>setItemName(e.target.value)}
                            className="form-input" placeholder="Item Name "
                        />
                </div>

                <div className="form-input-div">
                    <label>cql</label>                  

                    <input
                            type="text"
                            value={cql}
                            onChange={(e)=>setCql(e.target.value)}
                            className="form-input" placeholder="Critical Qty Level "
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


export default CreateItem;
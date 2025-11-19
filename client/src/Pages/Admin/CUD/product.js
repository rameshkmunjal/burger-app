import Navbar  from '../../../Component/Navbar';
import Footer  from '../../../Component/Footer';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () =>{
       const navigate=useNavigate();     
     
    
    return (
        <div className='page-container'>
        <Navbar />
        <div className="back-btn-div">
                <button className="click-btn btn-danger" onClick={()=>{navigate(-1)}}>Back</button>
        </div>       
        <div className="form-container">            
            <form className="create-inventory-form">
                <h1 className="centered">Create Product</h1>                

                
            </form>

            </div>
            <Footer/>
            </div>
    )
 }


export default CreateProduct;
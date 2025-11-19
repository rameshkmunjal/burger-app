import Navbar  from '../../../Component/Navbar';
import Footer  from '../../../Component/Footer';
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom';

const EditItem = () =>{
    const {id}=useParams();
    console.log(id);
    const [message, setMessage]=useState('');
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [prodCode, setProdCode]=useState(''); 
    const [category, setCategory]=useState(''); 
    const [measType, setMeasType]=useState(''); 
    const [minLvl, setMinLvl]=useState(''); 
    const [maxLvl, setMaxLvl]=useState('');  

   
    const navigate=useNavigate();


    const url = "http://localhost:5000";

    useEffect(()=>{
        const getSingleItemDetails=async()=>{
            try{
                const response=await axios.get(`${url}/item/${id}`);
                const i=response.data;
                
                if(response.data){
                    setMessage('');
                    setProdCode(i.itemCode);
                    setProdCode(i.prodCode);
                    setItemName(i.itemName);
                    setCategory(i.category);
                    setMeasType(i.measType);
                    setMinLvl(i.minLvl);
                    setMaxLvl(i.maxLvl);
                } else{
                    setMessage('response data not  received');
                }            
            }catch(error){
                setMessage('Error falls in catch block. ');
            }        
        }
        
        getSingleItemDetails();
    }, [id, message]);



    const submitHandler = async(e) =>{
        console.log("create button clicked");
        e.preventDefault();
        try{
            let itemData={id, prodCode, itemCode, itemName, category, measType,  minLvl, maxLvl};           
            const response = await axios.put(`${url}/item/edit/${id}`, itemData);
            console.log(response.data);
            const data=response.data;
            if (data && typeof data === 'object' && Object.keys(data).length > 0) {                
                navigate('/item/list');    
            } else {
                // Check for an empty object (optional, depending on API)
                setMessage("The server returned an empty object response.");
            }
        }catch(error){
                setMessage(
                    `Status:${error.response.status}, 
                    Message:${error.message} , 
                    Details : ${error.response.stateText}`);
        }
    }        
     
    
    return (
        <div className='page-container'>
        <Navbar />

        {message && (
          <div
            className="flex-center message"
            style={{ color: 'red', margin: '20px 0' }}
          >
            {message}
          </div>
        )}

         <div className="content-container">
            <div className="back-btn-div">
                <button className="click-btn btn-danger" onClick={()=>{navigate(-1)}}>Back</button>
            </div> 
          </div>       
          <div className="form-container">            
            <form className="create-inventory-form">
                <h1 className="centered">Edit Item</h1>                

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


export default EditItem;

/*
import axios from 'axios';

const handleAxiosResponse = async () => {
    const [response, setResponse] = useState(null);
    const [message, setMessage] = useState("Loading...");

    try {
        const result = await axios.get('/api/users'); 
        
        // This is a successful HTTP 200 response
        const data = result.data;

        // *** CONDITIONAL CHECK FOR "EMPTY" DATA ***
        if (Array.isArray(data) && data.length === 0) {
            setMessage("Search completed successfully, but no users were found.");
            setResponse([]); // Set state to an empty array to render "No Results Found" UI
            
        } else if (data && typeof data === 'object' && Object.keys(data).length === 0) {
            // Check for an empty object (optional, depending on API)
            setMessage("The server returned an empty object response.");
            setResponse({});

        } else {
            // Data is present and valid
            setMessage("Data loaded successfully.");
            setResponse(data);
        }

    } catch (error) {
        // This block runs ONLY if the HTTP status was 4xx or 5xx, or a network error
        if (error.response) {
            setMessage(`Server Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
        } else {
            setMessage(`Network Error: ${error.message}`);
        }
        setResponse(null); // Clear previous data if a real error occurred
    }
};
*/













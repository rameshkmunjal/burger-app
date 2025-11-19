import React, { useState } from "react";
import axios from "axios";

import Navbar  from '../../../Component/Navbar';
import Footer  from '../../../Component/Footer';

const BulkPurchase=()=> {
  const year=2025;
  const [month, setMonth]=useState(0);
  const [day, setDay]=useState(0);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [source, setSource] = useState("");
  const [message, setMessage]=useState("");

  const [items, setItems] = useState([
    { 
      itemCode: "",
      unitDesc:0, 
      quantity: 0, 
      amount: 0     
    }
  ]);

  const handleChange = (index, e) => {
    const newItems = [...items];
    newItems[index][e.target.name] = e.target.value;
    setItems(newItems);
  };

   const addItem = () => {
    setItems([...items, { 
      itemCode: "",
      unitDesc:0, 
      quantity: 0, 
      amount: 0     
    }]);
  };

  const handleSubmit = async () => {
    const date=new Date(year, month-1, day);
    try {
      const res = await axios.post("http://localhost:5000/bulk/purchase", {
        date,
        invoiceNo,
        source,
        items
      });
      console.log("Inserted:", res.data);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

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
    <div className="input-container">  
      <h2 className="align-c bg-1 bor-rad-5 p-10">Bulk Purchase Form</h2>
      
      <input
        type="text"
        placeholder="Invoice No"
        value={invoiceNo}
        onChange={(e) => setInvoiceNo(e.target.value)}
      />

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
      </div> 

      <input
        type="text"
        placeholder="Source of Purchase"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />

      {items.map((item, index) => (
        <div className="sub-container" key={index}>
          <input
            type="text"
            name="itemCode"
            placeholder="Item Code"
            value={item.itemCode}
            onChange={(e) => handleChange(index, e)}
          />
          <input
            type="text"
            name="unitDesc"
            placeholder="Unit Desc"
            value={item.unitDesc}
            onChange={(e) => handleChange(index, e)}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) => handleChange(index, e)}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={item.amount}
            onChange={(e) => handleChange(index, e)}
          />
        </div>
      ))}

      <button className="click-btn btn-success" onClick={addItem}>+ Add Item</button>
      <button className="click-btn btn-danger" onClick={handleSubmit}>Submit</button>
    </div>

    <Footer/>
            </div>
  );
  

}


export default BulkPurchase;
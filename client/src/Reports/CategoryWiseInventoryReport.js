import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

/* importing components */
import DateSearchBar from '../Component/DateSerachBar';
import Footer from '../Component/Footer';
import NavBar from '../Component/Navbar';


const CategoryReleaseList = () => {
  const [inventoryList, setInventoryList] = useState({});
  const [month, setMonth]=useState('August');
  const [year, setYear]=useState('2025');

  const url = 'http://localhost:5000';

  useEffect(() => {
    const getInventoryList = async () => {
      const response = await axios.get(`${url}/category/wise/release/list/${month}/${year}`);
      console.log('getInventoryList response data', response.data);

      if (response.data) {
        setInventoryList(response.data);
      } else {
        setInventoryList({});
      }
    };

    getInventoryList();
  }, [month, year]);

  const handleInput=async(obj)=>{
    setMonth(obj.month);
    setYear(obj.year);
    if(month && year){
      const response = await axios.get(`${url}/category/wise/release/list/${month}/${year}`);
        if(response){
            console.log(response.data);
            setInventoryList(response.data);     
            
        } else {
            console.log("no response received")
        }
    }
}

  return (
    <div className="page-container">
          <NavBar />
          <div className="back-btn-div">
            <button className="btn-div">
              <Link className="link-btn" to={'/reports'}>Back</Link>
            </button>
          </div>
          <div className="search-div">
              <DateSearchBar onSearch={handleInput} />
          </div>    
      

      <h1 className="flex-center">Category Wise Inventory Release Report : {month}  {year}</h1>

      {Object.keys(inventoryList).map((category) => {
        const items = inventoryList[category];

        if (!Array.isArray(items) || items.length === 0) return null;

        const categoryTotal = items.reduce(
          (acc, cur) => acc + (cur.amount || 0),
          0
        );

        return (
          <div key={category} style={{ marginBottom: '30px' }}>
            <div className="table-top-div"><span className='tt-c fw-b'>{category} </span><span>Total(Rs.): {categoryTotal.toFixed(2)} </span></div>
            <table className="tbl">
              <thead>
                <tr className="fs-15">
                  <th>Item Id</th>
                  <th className="left-aligned-cell">Item Name</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.itemId}>
                    <td className="align-c">{i.itemId}</td>
                    <td className="align-c">{i.itemName}</td>
                    <td className="align-c">{i.quantity}</td>
                    <td className="align-c">{i.amount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className="align-c fw-b fs-15">
                    Total
                  </td>
                  <td className="align-c fw-b fs-15">
                    {categoryTotal.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
      <Footer/>
    </div>
  );
};

export default CategoryReleaseList;



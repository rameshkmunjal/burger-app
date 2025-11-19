/* importing dependencies */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

/* importing components */
import {MonthsArray} from '../../../Component/MonthsArray';
import DateSearchBar from '../../../Component/DateSerachBar';
import Footer from '../../../Component/Footer';
import Navbar from '../../../Component/Navbar';

/*importing common functions*/
import { capitaliseFirstLetter, convertObj2Date } from '../../../Functions/commonFunctions';

const PurchaseList = () => {
  const url = 'http://localhost:5000';
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [monthName, setMonthName] = useState(MonthsArray[today.getMonth()].monthName);

  const [categoryFilter, setCategoryFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');

  const [list, setList] = useState([]);
  const [grandTotal, setGrandTotal]=useState([]);
  const [message, setMessage] = useState('');

  const navigate=useNavigate();

  useEffect(() => {    
    const getPurchaseList = async () => {
      try {
        const response = await axios.get(`${url}/purchase/list/${month}/${year}`);
        console.log('getPurchaseList response data', response.data);

        if (response.data && response.data.length > 0) {
          setList(response.data);
          setMessage('');
        } else {
          setList([]);
          setMessage('No Purchase data to display.');
        }
      } catch (error) {
        console.error('Error fetching purchase:', error);
        setList([]);
        setMessage('Failed to fetch purchase data.');
      }
    };    
      getPurchaseList();
    
  }, [month, year]);

  const filteredList = list.filter((item) => {
    const matchCategory = categoryFilter === '' || item.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchSource = sourceFilter === '' || item.source.toLowerCase().includes(sourceFilter.toLowerCase());
  
    return matchCategory && matchSource ;
  });

  useEffect(()=>{
    const changeGrandTotal=async()=>{
      const gt = filteredList.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.amount;
      }, 0);        
      
      setGrandTotal(gt);
    }
    changeGrandTotal();
  }, [filteredList]);

  function handleInput(obj) {
    console.log('object with month and year : ', obj.month, obj.year);
    setMonth(obj.month);
    setMonthName(obj.monthName);
    setYear(obj.year);
  }


  const deletePurchase = async (id) => {
    try {
      const response=await axios.delete(`${url}/purchase/delete/${id}`);
      console.log(response);
      // Re-fetch after deletion
      setList(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting purchase:', error);
      setMessage('Failed to delete purchase item.');
    }
  };

  

  const renderedList = filteredList.map((i) => (
    <tr key={i._id}>
      <td className="align-c">{convertObj2Date(i.buyDate)}</td>  
      <td className="align-c">{i.itemId}</td>      
      <td className="align-l">{i.itemName}-{i.unitDesc}{i.measType}</td>
      <td className="align-l">{capitaliseFirstLetter(i.category)}</td>
      <td className="align-l">{i.source}</td>
      <td className="align-c">{i.quantity}</td>
      <td className="align-r">{i.amount.toFixed(2)}</td>
            
      <td className="align-c">
        <button>
          <Link className="click-btn btn-danger link" to={`/purchase/edit/${i.id}`}>
            Edit
          </Link>
        </button>
      </td>
      <td className="align-c">
        <button className="click-btn btn-danger" 
                onClick={
                  (e)=>{
                    e.preventDefault(); 
                    deletePurchase(i.id)
                  }
                }>
                Delete
        </button>
      </td>    
    </tr>
  ));
  
  

  return (
    <div className="page-container">
      <Navbar />
      <div className="back-btn-div">
            <button className="click-btn btn-danger" onClick={()=>{navigate(-1)}}>Back</button>
      </div> 
      <div className="search-div">
        <DateSearchBar onSearch={handleInput} />
      </div>    

      <h1 className="flex-center">
        Purchases During Month :{monthName} {year}
      </h1>

        <div className="filter-box">
          <input
            type="text"
            placeholder="Filter by Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          />          
        </div>

        <div className="filter-box">
          <input
            type="text"
            placeholder="Filter by Supplier"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          />          
        </div>

      {message && (
        <div className="flex-center message" style={{ color: 'red', margin: '20px 0' }}>
          {message}
        </div>
      )}

      {list.length > 0 && (
        <table className="tbl">
          <thead>
          <tr>
            <th>Buy Date</th>          
            <th>Item ID</th>            
            <th>Item Name</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th colSpan={2}>Action</th>
          </tr>
          </thead>
          <tbody>
            {renderedList}
            <tr>
              <td className='fw-b fs-15 align-c' colSpan={(6)} >Total</td>
              <td className=" fw-b fs-15 align-r">{grandTotal.toFixed(2)}</td>
              <td colSpan={(3)}></td>
            </tr>
           
          </tbody>
        </table>
      )}

      <Footer />
    </div>
  );
};

export default PurchaseList;


// SearchBar.js
import React, { useState } from 'react';

const DateSearchBar = ({ onSearch }) => {  
  const [month, setMonth] = useState(0);
  const [monthName, setMonthName]=useState('');
  const [year, setYear]= useState(0);

  const options=[
    {label:'January', monthName:'January' , value:1},
    {label:'February', monthName:'February' , value:2},
    {label:'March', monthName:'March' , value:3 },
    {label:'April', monthName:'April' , value:4 },
    {label:'May', monthName:'May' , value:5},
    {label:'June', monthName:'June' , value:6 },

    {label:'July', monthName:'July' , value:7 },
    {label:'August', monthName:'August' , value:8 },
    {label:'September', monthName:'September' , value:9},
    {label:'October', monthName:'October' , value:10 },
    {label:'November', monthName:'November' , value:11},
    {label:'December', monthName:'December' , value:12 }
  ]

  const handleSelect = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    const monthName=event.target.value;
    const object = options.find(obj => obj.monthName === monthName);
    if(object !== undefined){
      setMonth(object.value);
      setMonthName(object.monthName);
      setYear(2025);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({month:month, monthName:monthName, year:year}); // Send data to parent
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex-right-row gap-2">
      <div className="date-search-bar">
          <select  onChange={handleSelect}>
                <option value=''>Select Month</option>
                {options.map(option=>(
                    <option value={option.monthName} key={option.label}>{option.label}</option>
                ))}
          </select>
        </div>
        <button type="submit" disabled={!month}>Submit</button>
        
    </form>
  );
};

export default DateSearchBar;
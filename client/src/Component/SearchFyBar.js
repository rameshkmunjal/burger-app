// SearchBar.js
import React, { useState } from 'react';

const SearchFyBar = ({ onSearch }) => {  
  const [year, setYear]= useState('');

  const options=[
    {label:'2025-2026', value:'2025-2026'},
    {label:'2026-2027', value:'2026-2027'}
  ]

  const handleSelect = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setYear(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(year); // Send data to parent
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex-right-row gap-2">
      <div className="date-search-bar">
          <select  onChange={handleSelect}>
                <option value=''>Select FY</option>
                {options.map(option=>(
                    <option value={option.value} key={option.label}>{option.label}</option>
                ))}
          </select>
        </div>
        <button type="submit" disabled={!year}>Submit</button>        
    </form>
  );
};

export default SearchFyBar;
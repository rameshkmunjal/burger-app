import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DateSearchBar from '../../../Component/DateSerachBar';
import Footer from '../../../Component/Footer';
import NavBar from '../../../Component/Navbar';

const ReleaseList = () => {
  const [list, setList] = useState([]);
  const [month, setMonth] = useState(0);
  const [monthName, setMonthName] = useState('');
  const [year, setYear] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('');

  const url = 'http://localhost:5000';

  useEffect(() => {
    const getInventoryReleaseList = async () => {
      try {
        const response = await axios.get(`${url}/inventory/report/release/month/${month}/${year}`);
        console.log('getInventoryReleaseList response data', response.data);
        setList(Array.isArray(response.data.revisedList) ? response.data.revisedList : []);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setList([]);
      }
    };

    if (month && year) getInventoryReleaseList();
  }, [month, year]);

  useEffect(() => {
    const todayDate = new Date();
    setMonth(todayDate.getMonth() + 1);
    setMonthName(todayDate.toLocaleString('default', { month: 'long' }));
    setYear(todayDate.getFullYear());
  }, []);

  const filteredList = list.filter((item) => {
    const category = (item.category || '').toLowerCase();
    const search = categoryFilter.trim().toLowerCase();
    return category.includes(search);
  });

  const filteredTotal = filteredList.reduce((sum, i) => sum + i.amount, 0);

  console.log('Full list sample:', list.slice(0, 2));
console.log('Filter text:', categoryFilter);
console.log('Filtered list sample:', filteredList.slice(0, 2));


  function handleInput(obj) {
    console.log('object with month and year : ', obj.month, obj.year);
    setMonth(obj.month);
    setMonthName(obj.monthName);
    setYear(obj.year);
  }

  console.log('Filter:', categoryFilter, '| list:', list.length, '| filtered:', filteredList.length);

  return (
    <div className="page-container">
      <NavBar />
      <div className="back-btn-div">
        <button>
          <Link className="link click-btn btn-danger" to={'/admin'}>
            Back
          </Link>
        </button>
      </div>

      <div className="search-div">
        <DateSearchBar onSearch={handleInput} />
      </div>

      <h1 className="flex-center">
        Release List for Month : {monthName} {year}
      </h1>

      <div className="filter-box">
        <input
          type="text"
          placeholder="Filter by Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />
      </div>

      {filteredList.length > 0 ? (
        <table className="tbl">
          <thead>
            <tr className="fs-15">
              <th>Date</th>
              <th>Item Id</th>
              <th>Category</th>
              <th>Item Name</th>
              <th>Pack Size</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Released To</th>
              <th>Released By</th>
            </tr>
          </thead>
          <tbody>
  {filteredList.map((i, index) => (
    <tr className="align-c" key={`${i.id}-${i.serial}-${index}`}>
      <td>{i.date}</td>
      <td>{i.itemId}</td>
      <td className="tt-c">{i.category}</td>
      <td>{i.itemName}</td>
      <td>{i.unitDesc} {i.measType}</td>
      <td>{i.quantity}</td>
      <td>{i.amount.toFixed(2)}</td>
      <td>{i.releasedTo}</td>
      <td>{i.releasedBy}</td>
    </tr>
  ))}
  <tr>
    <td colSpan={6}>Total</td>
    <td className="align-c fw-b">{filteredTotal.toFixed(2)}</td>
    <td colSpan={2}></td>
  </tr>
</tbody>

        </table>
      ) : (
        <p className="flex-center">No records found for this filter.</p>
      )}

      <Footer />
    </div>
  );
};

export default ReleaseList;

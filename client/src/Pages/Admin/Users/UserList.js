import Footer from '../../../Component/Footer';
import Navbar from '../../../Component/Navbar';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const UserList = () => {
  const url = 'http://localhost:5000';  

  const [list, setList] = useState([]);
  const [message, setMessage] = useState('');
  const navigate=useNavigate();
 
  const getUserList = async () => {      
    try {        
      const response = await axios.get(`${url}/user/list`);
      console.log('getUserList response data', response.data);

      if (response.data && response.data.length > 0) {
        setList(response.data);
        setMessage('');
      } else {
        setList([]);
        setMessage('No user data to display.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setList([]);
      setMessage('Failed to fetch users data.');
    }
}; 

useEffect(() => {       
      getUserList();    
  }, []);

  


  const deleteUser = async (id) => {
    try {
      const response=await axios.delete(`${url}/user/delete/${id}`);
      console.log(response);
      // Re-fetch after deletion
      getUserList();
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Failed to delete user.');
    }
  };

  

  const renderedList = list.map((i) => (
    <tr key={i.id}>
      <td className="align-c">{i.id}</td>  
      <td className="align-l">{i.name}</td>
      <td className="align-r">{i.email}</td>
      
      
      <td className="align-c">
        <button>
          <Link className="link click-btn btn-success" to={`/user/edit/${i.id}`}>
            Edit
          </Link>
        </button>
      </td>
      <td className="align-c">
        <button className="click-btn btn-danger" 
                onClick={
                  (e)=>{
                    e.preventDefault(); 
                    deleteUser(i.id)
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

        <div className="back-btn-div flex-between">
                <button className="click-btn btn-danger" onClick={()=>{navigate(-1)}}>Back</button>
        </div> 
      <div>      
    </div>

              
      <h1 className="flex-center">User List</h1>
      

      {message && (
        <div className="flex-center message" style={{ color: 'red', margin: '20px 0' }}>
          {message}
        </div>
      )}

      {list.length > 0 && (
        <table className="tbl">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>E-Mail</th>
          </tr>
          </thead>
          <tbody>
            {renderedList}
          </tbody>
        </table>
      )}

      <Footer />
    </div>
  );
};

export default UserList;


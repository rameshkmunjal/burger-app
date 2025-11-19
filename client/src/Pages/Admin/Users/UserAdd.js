import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../../Component/Navbar';
import Footer from '../../../Component/Footer';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const url = 'http://localhost:5000';

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return setMessage('All fields are required');
    }

    if (password !== confirmPassword) {
      return setMessage('Passwords do not match');
    }

    try {
      const { data, status } = await axios.post(`${url}/user/register`, {
        name, email, password
      });

      if (status === 201) {
        setMessage('User Created Successfully');
        console.log(data);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Network Error');
    }
  };

  return (
    <div className="page-container">
      <Navbar />

      <div className="back-btn-div">
        <button>
          <Link className="link click-btn btn-danger" to="/admin">
            Back
          </Link>
        </button>
      </div>

      <div>{message}</div>

      <div className="form-container">
        <form className="create-inventory-form" onSubmit={submitHandler}>
          <h1 className="centered">Add User</h1>

          <div className="form-input-div">
            <label>Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-input-div">
            <label>E-mail</label>
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-input-div">
            <label>Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-input-div">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="form-input-div flex-center">
            <button className="click-btn btn-danger">Submit</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AddUser;

import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const UserContext = React.createContext();

const Update = () => {
  const { state } = useLocation();
  const { user, index } = state;
  const [formData, setFormData] = useState({ ...user });
  const navigate = useNavigate();


  const updateUser = useContext(UserContext)[1];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUsers = [...updateUser];
    updatedUsers[index] = formData;

    updateUser(updatedUsers);
    navigate('/read');
  };

  return (
    <div className='form-container'>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} required />
        <label>Last Name:</label>
        <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} required />
        <label>Address:</label>
        <textarea name='address' value={formData.address} onChange={handleChange} required></textarea>
        <label>Pincode:</label>
        <input type='text' name='pincode' value={formData.pincode} onChange={handleChange} required />
        <label>Gender:</label>
        <input type='radio' name='gender' value='Male' onChange={handleChange} checked={formData.gender === 'Male'} /> Male
        <input type='radio' name='gender' value='Female' onChange={handleChange} checked={formData.gender === 'Female'} /> Female
        <button type='submit'>Update</button>
      </form>
    </div>
  );
};

export default Update;


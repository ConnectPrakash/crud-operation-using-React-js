import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.css'; // Make sure to import the CSS file

const Create = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', address: '', pincode: '', gender: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const storedData = JSON.parse(localStorage.getItem('users')) || [];
    storedData.push(formData);
    localStorage.setItem('users', JSON.stringify(storedData));
    navigate('/read');
  };

  return (
    <div className='form-container1'>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='firstName'>First Name:</label>
        <input
          type='text'
          id='firstName'
          name='firstName'
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        {errors.firstName && <div className='error-message'>{errors.firstName}</div>}
        
        <label htmlFor='lastName'>Last Name:</label>
        <input
          type='text'
          id='lastName'
          name='lastName'
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        {errors.lastName && <div className='error-message'>{errors.lastName}</div>}
        
        <label htmlFor='address'>Address:</label>
        <textarea
          id='address'
          name='address'
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>
        {errors.address && <div className='error-message'>{errors.address}</div>}
        
        <label htmlFor='pincode'>Pincode:</label>
        <input
          type='text'
          id='pincode'
          name='pincode'
          value={formData.pincode}
          onChange={handleChange}
          required
          pattern="\d*"
        />
        {errors.pincode && <div className='error-message'>{errors.pincode}</div>}
        
        <label>Gender:</label>
        <label>
          <input
            type='radio'
            name='gender'
            value='Male'
            onChange={handleChange}
            checked={formData.gender === 'Male'}
          />
          Male
        </label>
        <label>
          <input
            type='radio'
            name='gender'
            value='Female'
            onChange={handleChange}
            checked={formData.gender === 'Female'}
          />
          Female
        </label>
        {errors.gender && <div className='error-message'>{errors.gender}</div>}
        
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Create;

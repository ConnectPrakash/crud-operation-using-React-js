import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Read.css'

const Read = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('users')) || [];
    setData(storedData);
  }, []);

  const handleDelete = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
    localStorage.setItem('users', JSON.stringify(updatedData));
  };

  const handleEdit = () => {
    navigate('/update');
  };

  const handleAddNew = () => {
    navigate('/');
  };

  return (
    <div className='table-container'>
      <h2>Read Users</h2>
      
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.address}</td>
              <td>{user.pincode}</td>
              <td>{user.gender}</td>
              <td>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={() => handleDelete(index)} style={{ marginLeft: '10px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='add-user-button' onClick={handleAddNew}>Add New User</button>
    </div>
  );
};

export default Read;

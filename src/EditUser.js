import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUser = ({ match }) => {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${match.params.id}`)
      .then(response => setUser(response.data));
  }, [match.params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://jsonplaceholder.typicode.com/users/${match.params.id}`, user)
      .then(() => setMessage('User updated successfully!'))
      .catch(() => setMessage('Failed to update user.'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
      <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
      <input type="text" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} required />
      <button type="submit">Update User</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default EditUser;

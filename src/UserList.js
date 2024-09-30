import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; // Import the ClipLoader
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        setError('Failed to fetch users.');
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  // Delete user function
  const deleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id)); // Remove the deleted user from the state
      })
      .catch(() => alert('Failed to delete user.'));
  };

  // Display loading spinner if data is still being fetched
  if (loading) return <ClipLoader size={150} />;

  // Display error message if there's any error fetching data
  if (error) return <div>{error}</div>;

  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <button>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <p>Create User <Link to={"/create"}>CREATE USER</Link></p>
    </div>
  );
};

export default UserList;

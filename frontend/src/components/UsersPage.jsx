import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Navbar from './Navbar';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('token');

    // Fetch users data from the admin API endpoint with the JWT token
    fetch('http://localhost:8080/admin/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-primary">Users Page</h2>
        <div className="mt-4 mb-4 text-primary underline underline-offset-4 flex items-center justify-start gap-6">
          {/* Add links to other pages */}
          <Link to="/admin">Dashboard</Link> {' '}
          <Link to="/admin/books">Books</Link> {' '}
        </div>
        {isLoading ? (
          <p className="mt-4 text-secondary">Loading users...</p>
        ) : (
          <ul className="mt-4">
            {users.map((user) => (
              <li key={user.id} className="text-secondary mb-2">
                {user.firstname} {user.lastname} ({user.email}) - {user.role}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UsersPage;

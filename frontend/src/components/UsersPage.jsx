import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  const deleteUser = (id) => {
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('token');

    // Send a DELETE request to the backend to delete the user
    fetch(`http://localhost:8080/admin/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log('ID : ', id);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Remove the deleted user from the state
        setUsers(users.filter((user) => user.ID !== id));
        console.log('User deleted successfully');
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-primary">Users Page</h2>
        <div className="mt-4 mb-4 text-primary underline underline-offset-4 flex items-center justify-start gap-6">
          {/* Add links to other pages */}
          <Link to="/admin">Dashboard</Link> {' '}
          <Link to="/admin/users">Users</Link> {' '}
          <Link to="/admin/books">Books</Link> {' '}
        </div>
        {isLoading ? (
          <p className="mt-4 text-secondary">Loading users...</p>
        ) : (
          <ul className="mt-8 flex flex-col items-start justify-center w-full gap-5">
            {users.map((user) => (
              <li key={user.id} className="text-secondary mb-2 w-full">
                <div className='flex items-center justify-between w-full'>
                  <div>
                    {user.firstname} {user.lastname} ({user.email}) - {user.role}
                  </div>
                  <div>

                    <button
                      onClick={() => deleteUser(user.ID)}
                      className=" hover:scale-110 transform transition-all duration-150 ease-in-out"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UsersPage;

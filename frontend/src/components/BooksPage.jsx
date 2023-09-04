import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const UserHome = () => {
  // State to store user's name
  const [userName, setUserName] = useState('');

  // State to store the list of books
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Check if the token exists
    if (token) {
      // Fetch the user's name from your backend API
      fetch('http://localhost:8080/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Set the user's name from the API response
          setUserName(data.name);
        })
        .catch((error) => {
          console.error('Error fetching user name:', error);
        });

      // Fetch the list of books from your backend API
      fetch('http://localhost:8080/user/books', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the headers
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Set the list of books from the API response
          console.log(data.books);
          setBooks(data.books);
        })
        .catch((error) => {
          console.error('Error fetching books:', error);
        });
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-primary text-primary">
      <div className="flex items-center justify-center flex-col gap-12 mb-20 ">
        <Navbar />


        {books && books.length > 0 ? (
          <div className='w-full px-40'>
            <h2 className="text-2xl font-semibold text-primary">Books Page</h2>
            <div className="mt-4 mb-4 text-primary underline underline-offset-4 flex items-center justify-start gap-6">
              {/* Add links to other pages */}
              <Link to="/admin">Dashboard</Link> {' '}
              <Link to="/admin/users">Users</Link> {' '}
            </div>
            <div className="grid grid-cols-3 gap-4"> {/* Adjust the number of columns as needed */}
              {books.map((book) => (
                <Link key={book.id} to={`/book/${book.id}`} className="bg-secondary rounded-lg flex items-start h-full justify-start gap-4 shadow-md p-4 transition-all duration-200 hover:scale-105 hover:bg-[#F59E0B] group hover:text-[#1E293B]">
                  <img src={book.image} alt={book.title} className="w-32 h-48 object-cover rounded-lg" />
                  <div className='flex flex-col items-start justify-center gap-1'>
                    <h3 className="text-xl text-primary font-semibold group-hover:text-[#1E293B]">{book.title}</h3>
                    <p className="text-slate-400 group-hover:text-[#1E293B]">{book.author}</p>
                    <p className="text-secondary mt-2 group-hover:text-[#1E293B]">{book.genre}</p>
                    <p className="text-primary text-xl mt-6 flex items-center justify-start gap-1 group-hover:text-[#1E293B]">
                      $
                      {book.price}
                    </p>
                    <p className="text-secondary text-base mt-2 group-hover:text-[#1E293B] flex items-center justify-start gap-1">
                      {book.average_rating}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-start gap-4 h-screen'>
            Please login to see the books
            <Link to="/login" className="text-primary hover:text-accent text-3xl font-bold">
              Login
            </Link>
          </div>
        )}
      </div>
    </div >
  );
};

export default UserHome;

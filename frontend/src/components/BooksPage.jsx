import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const UserHome = () => {
  const [userName, setUserName] = useState('');
  const [books, setBooks] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    price: 0,
    quantity: 0,
    description: '',
    image: '',
    path: '',
    average_rating: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('http://localhost:8080/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.name);
        })
        .catch((error) => {
          console.error('Error fetching user name:', error);
        });

      fetch('http://localhost:8080/user/books', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setBooks(data.books);
        })
        .catch((error) => {
          console.error('Error fetching books:', error);
        });
    }
  }, []);

  const deleteBook = (bookId) => {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:8080/user/book/${bookId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setBooks(books.filter((book) => book.id !== bookId));
      })
      .catch((error) => console.error('Error deleting book:', error));
  };

  const openUpdateModal = (book) => {
    setSelectedBook(book);
    setBookData(book); // Initialize the form with the selected book's data
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setSelectedBook(null);
    setShowUpdateModal(false);
  };

  // Step 1: Create a function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!selectedBook) {
      console.error('No book selected for update');
      return;
    }

    fetch(`http://localhost:8080/book/${selectedBook.id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Close the update modal after successful update
        closeUpdateModal();
      })
      .catch((error) => console.error('Error updating book:', error));
  };

  // Step 2: Create a function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-primary text-primary">
      <div className="flex items-center justify-center flex-col gap-12 mb-20">
        <Navbar />
        <div className='w-full px-40'>
          <h2 className="text-2xl font-semibold text-primary">Books Page</h2>
          <div className="mt-4 mb-4 text-primary underline underline-offset-4 flex items-center justify-start gap-6">
            <Link to="/admin">Dashboard</Link> {' '}
            <Link to="/admin/users">Users</Link> {' '}
            <Link to="/admin/books">Books</Link> {' '}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {books.map((book) => (
              <div key={book.id} className="bg-secondary rounded-lg flex items-start h-full justify-start gap-4 shadow-md p-4 transition-all duration-200 hover:scale-105 hover:bg-[#F59E0B] group hover:text-[#1E293B]">
                <img src={book.image} alt={book.title} className="w-32 h-48 object-cover rounded-lg" />
                <div className='flex flex-col items-start justify-between gap-1 w-full'>
                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-xl text-primary font-semibold group-hover:text-[#1E293B] w-full">
                      {book.title}
                    </h3>
                    <div className="relative group">
                      <button
                        className="text-primary focus:outline-none hover:text-accent"
                        onClick={() => openUpdateModal(book)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                      </button>
                      <ul className={`absolute ${showUpdateModal ? 'block' : 'hidden'} right-0 mt-2 space-y-2 bg-dark border border-gray-300 rounded-lg shadow-lg`}>
                        <li>
                          <button
                            className="block px-4 py-2 text-primary hover:bg-black rounded-xl w-full"
                            onClick={() => {
                              // Handle the update action
                            }}
                          >
                            Update
                          </button>
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 text-primary hover:bg-black rounded-xl w-full"
                            onClick={() => deleteBook(book.id)}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-slate-400 group-hover:text-[#1E293B]">{book.author}</p>
                  <p className="text-secondary mt-2 group-hover:text-[#1E293B]">{book.genre}</p>
                  <p className="text-primary text-xl mt-6 flex items-center justify-start gap-1 group-hover:text-[#1E293B]">
                    ${book.price}
                  </p>
                  <p className="text-secondary text-base mt-2 group-hover:text-[#1E293B] flex items-center justify-start gap-1">
                    {book.average_rating}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Update Book Modal */}
      {selectedBook && (
        <div className={`fixed inset-0 w-full flex items-center justify-center ${showUpdateModal ? 'block' : 'hidden'}`}>
          <div className="modal-container bg-dark w-[1000px]  mx-auto rounded shadow-lg z-50 overflow-y-auto overflow-scroll">
            <div className="modal-content py-4 text-left px-6">
              <h3 className="text-2xl font-semibold text-primary mb-4">Update Book</h3>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className='flex items-center justify-between p-10 gap-20 w-full'>
                  <div className='w-full'>
                    {/* Title */}
                    <div className="mb-4">
                      <label htmlFor="title" className="block text-sm font-medium text-secondary">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={bookData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    {/* Author */}
                    <div className="mb-4">
                      <label htmlFor="author" className="block text-sm font-medium text-secondary">
                        Author
                      </label>
                      <input
                        type="text"
                        id="author"
                        name="author"
                        value={bookData.author}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    {/* ISBN */}
                    <div className="mb-4">
                      <label htmlFor="isbn" className="block text-sm font-medium text-secondary">
                        ISBN
                      </label>
                      <input
                        type="text"
                        id="isbn"
                        name="isbn"
                        value={bookData.isbn}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    {/* Genre */}
                    <div className="mb-4">
                      <label htmlFor="genre" className="block text-sm font-medium text-secondary">
                        Genre
                      </label>
                      <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={bookData.genre}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    {/* Price */}
                    <div className="mb-4">
                      <label htmlFor="price" className="block text-sm font-medium text-secondary">
                        Price
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={bookData.price}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    {/* Quantity */}
                    <div className="mb-4">
                      <label htmlFor="quantity" className="block text-sm font-medium text-secondary">
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={bookData.quantity}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>

                  <div className='w-full'>
                    {/* Description */}
                    <div className="mb-4">
                      <label htmlFor="description" className="block text-sm font-medium text-secondary">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={bookData.description}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    {/* Image URL */}
                    <div className="mb-4">
                      <label htmlFor="image" className="block text-sm font-medium text-secondary">
                        Image URL
                      </label>
                      <input
                        type="text"
                        id="image"
                        name="image"
                        value={bookData.image}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    {/* Path */}
                    <div className="mb-4">
                      <label htmlFor="path" className="block text-sm font-medium text-secondary">
                        Path (PDF URL)
                      </label>
                      <input
                        type="text"
                        id="path"
                        name="path"
                        value={bookData.path}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    {/* Average Rating */}
                    <div className="mb-4">
                      <label htmlFor="average_rating" className="block text-sm font-medium text-secondary">
                        Average Rating
                      </label>
                      <input
                        type="number"
                        id="average_rating"
                        name="average_rating"
                        value={bookData.average_rating}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className='flex items-center justify-start gap-6 w-full'>
                    <button className="bg-[#F59E0B] hover:bg-[#2D3748] hover:text-[#FFFFFF] text-accent py-2 px-4 rounded-full transition duration-300">
                      Update Book
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 hover:text-[#FFFFFF] text-white py-2 px-4 rounded-full transition duration-300"
                      onClick={() => deleteBook(book.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="bg-secondary text-primary px-4 py-2 rounded-full hover:bg-[#F59E0B] hover:text-[#1E293B] transition-all duration-200"
                      onClick={closeUpdateModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHome;

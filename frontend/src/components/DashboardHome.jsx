import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    price: 0, // Default value for price
    quantity: 0, // Default value for quantity
    description: '',
    image: '',
    path: '',
    average_rating: 0, // Default value for average_rating
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookData({
      ...bookData,
      [name]: name === 'price' || name === 'quantity' || name === 'average_rating' ? parseInt(value) : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Assuming you have the JWT token stored in localStorage as 'token'
    const token = localStorage.getItem('token');

    fetch('http://localhost:8080/admin/book', {
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
        // Handle success here, e.g., show a success message
        console.log('Book created successfully');
        // Clear the form fields
        setBookData({
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
      })
      .catch((error) => {
        console.error('Error creating book:', error);
        // Handle error here, e.g., show an error message
      });
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-primary">Dashboard Home</h2>
        <div className="mt-4 mb-4 text-primary underline underline-offset-4 flex items-center justify-start gap-6">
          {/* Add links to other pages */}
          <Link to="/admin/users">Users</Link> {' '}
          <Link to="/admin/books">Books</Link> {' '}
        </div>
        <p className="mt-4 text-secondary">
          Welcome to your dashboard! This is the home page of your dashboard.
        </p>
        <h3 className="mt-6 text-lg font-semibold text-secondary">
          Create a New Book
        </h3>
        <form onSubmit={handleSubmit} className="mt-4">
          {/* Add input fields for the new book */}
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
          <div className="mt-6">
            <button className="bg-[#F59E0B] hover:bg-[#2D3748] hover:text-[#FFFFFF] text-accent py-2 px-4 rounded-full transition duration-300">
              Create Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardHome;

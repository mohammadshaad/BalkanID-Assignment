import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import ReviewSection from './ReviewSection';

const BookDetail = () => {
    const [book, setBook] = useState(null);
    const [quantity, setQuantity] = useState(1); // Default quantity is 1
    const { id } = useParams();

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:8080/user/book/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch book details');
                }

                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    const handleDownload = () => {
        if (book && book.path) {
            // Open the book download URL in a new tab
            window.open(book.path, '_blank');
        } else {
            console.error('Download URL not available');
        }
    };

    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }

            // Ensure that quantity is a number (convert it to a number)
            const quantityAsNumber = parseInt(quantity);

            const response = await fetch(`http://localhost:8080/user/cart`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ book_id: parseInt(id), quantity: quantityAsNumber }),
            });

            if (response.ok) {
                console.log('Book added to cart');
                alert('Book added to cart');
            } else {
                console.error('Failed to add book to cart');
                console.error('Response Status:', response.status);
                console.error('Response Body:', await response.text());
            }
        } catch (error) {
            console.error('Error adding book to cart:', error);
        }
    };



    if (!book) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    return (
        <div className="bg-dark w-full h-full shadow-lg flex items-center justify-center flex-col">
            <Navbar />
            <div className="flex items-start justify-start gap-10 p-10">
                <img
                    src={book.image}
                    alt={book.title}
                    className="h-[30rem]"
                />
                <div className="flex flex-col items-start justify-start h-full">
                    <p className="mb-6 text-secondary font-semibold">{book.genre}</p>
                    <h2 className="text-7xl mb-2 font-bold text-primary">{book.title}</h2>
                    <p className="mb-10 text-secondary">Author: {book.author}</p>
                    <p className="mb-8 max-w-lg text-2xl font-light text-secondary">{book.description}</p>
                    <div className="mb-2 text-lg font-normal text-secondary flex items-center justify-center gap-4">
                        <div className="flex items-center justify-center gap-1 font-bold">
                            {book.average_rating}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                        </div>
                        Average Rating
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={handleDownload} className="bg-primary hover:bg-[#F59E0B] text-primary hover:text-[#1E293B] py-2 px-4 rounded-full transition duration-300">
                            Download
                        </button>
                        <div className="flex items-center gap-2">
                            <label htmlFor="quantity" className="text-secondary">Quantity:</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-12 px-2 py-1 border border-secondary rounded"
                            />
                        </div>
                        <button onClick={handleAddToCart} className="bg-[#F59E0B] hover:bg-[#2D3748] hover:text-[#FFFFFF] text-accent py-2 px-4 rounded-full transition duration-300">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            <ReviewSection bookId={id} />
        </div>
    );
};

export default BookDetail;

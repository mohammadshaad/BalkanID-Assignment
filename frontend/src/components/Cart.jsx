import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchCartItems = async () => {
            try {
                const response = await fetch('http://localhost:8080/user/cart', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }

                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const fetchBookDetails = async (bookId) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:8080/user/book/${bookId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch book details');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    };

    const [bookDetails, setBookDetails] = useState({});

    useEffect(() => {
        const fetchDetailsForCartItems = async () => {
            const details = {};

            for (const item of cartItems) {
                const bookId = item.book_id;
                const bookDetail = await fetchBookDetails(bookId);
                details[bookId] = bookDetail;
            }

            setBookDetails(details);
        };

        fetchDetailsForCartItems();
    }, [cartItems]);

    useEffect(() => {
        let total = 0;
        for (const item of cartItems) {
            total += item.subtotal;
        }
        setTotalAmount(total);
    }, [cartItems]);

    const removeFromCart = async (bookId) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:8080/user/cart/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }

            const updatedCartItems = cartItems.filter((item) => item.book_id !== bookId);
            setCartItems(updatedCartItems);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    return (
        <div className="flex items-center justify-center flex-col gap-6">
            <Navbar />
            <h2 className="text-4xl font-semibold mb-3 text-primary text-left w-full px-20 py-10">Cart</h2>
            
            {cartItems.length === 0 ? (
                <p className="text-primary">Your cart is empty.</p>
            ) : (
                <div className='w-full flex flex-col items-center justify-center gap-6'>
                    <ul className="flex items-center justify-center flex-col gap-4 w-full px-20">
                        {cartItems.map((item) => (
                            <div key={item.id} className="w-full flex flex-col items-center justify-center">
                                <li key={item.id} className="border rounded-lg overflow-hidden shadow-md h-full w-full">
                                    <div className="p-4 flex items-center justify-between gap-6">
                                        <div className='flex items-center justify-start gap-4'>

                                            <img
                                                src={bookDetails[item.book_id]?.image}
                                                alt={bookDetails[item.book_id]?.name}
                                                className=" h-40 mb-2"
                                            />
                                            <p className="text-lg font-semibold text-gray-800">
                                                {bookDetails[item.book_id]?.name}
                                            </p>

                                            <div className='flex items-start justify-center gap-4 flex-col'>
                                                <p className="text-primary font-bold text-4xl">{bookDetails[item.book_id]?.title}</p>
                                                <div className='flex items-center justify-center gap-6'>
                                                    <p className="text-primary font-semibold">Price: ${bookDetails[item.book_id]?.price}</p>
                                                    <p className="text-primary font-semibold">Quantity: {item.quantity}</p>
                                                </div>
                                                <div>
                                                    <p className="text-primary font-semibold">Subtotal: ${item.subtotal}</p>
                                                </div>

                                            </div>
                                        </div>

                                        <div>
                                            <button
                                                className="bg-[#F59E0B] hover:bg-[#2D3748] hover:text-[#FFFFFF] text-accent py-2 px-8 rounded-full transition duration-300"
                                                onClick={() => removeFromCart(item.book_id)}
                                            >
                                                Remove
                                            </button>
                                        </div>

                                    </div>
                                </li>
                            </div>
                        ))}
                    </ul>
                    <div className="text-primary font-semibold text-2xl mt-4 ">
                        Total Amount: ${totalAmount.toFixed(2)}
                    </div>

                    <div className='flex items-center justify-center gap-4 mb-20'>
                        <button className="bg-[#F59E0B] hover:bg-[#2D3748] hover:text-[#FFFFFF] text-accent py-2 px-10 rounded-full transition duration-300">
                            Checkout
                        </button>
                        <button className="bg-[#F59E0B] hover:bg-[#2D3748] hover:text-[#FFFFFF] text-accent py-2 px-4 rounded-full transition duration-300">
                            Continue Shopping
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

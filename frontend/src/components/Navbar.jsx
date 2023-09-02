import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; // Import the JWT decode library

const Navbar = () => {
    // State to manage the visibility of the profile dropdown
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [userId, setUserId] = useState(null); // State to store the userId
    const [userRole, setUserRole] = useState(null); // Initialize userRole to null

    // Function to toggle the profile dropdown
    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    // Function to close the profile dropdown
    const closeProfileDropdown = () => {
        setIsProfileDropdownOpen(false);
    };



    // Use the useEffect hook to decode the JWT token and extract the userId
    useEffect(() => {
        const token = localStorage.getItem('token'); // Assuming your token is stored in local storage
        if (token) {
            // Decode the token to get the user information
            const decodedToken = jwtDecode(token);
            if (decodedToken && decodedToken.user_id) {
                setUserId(decodedToken.user_id);
            }
        }
    }, []);

    // Function to fetch the user's role based on the user ID
    const fetchUserRole = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken && decodedToken.user_id) {
                const userId = decodedToken.user_id;
                // Make a GET request to fetch the user's role
                fetch(`http://localhost:8080/admin/role/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data && data.role) {
                            setUserRole(data.role); // Set the userRole state
                            console.log(data.role);
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching user role:', error);
                    });
            }
        }
    };

    useEffect(() => {
        fetchUserRole(); // Fetch the user's role when the component mounts
    }, []);


    return (
        <nav className="bg-transparent py-4 px-10 flex justify-between items-center w-screen">
            <Link to='/home' className="text-white text-4xl font-semibold">BookStore</Link>
            <div className="relative">
                {/* Profile icon or button */}
                <button
                    className="text-white  focus:outline-none flex items-center justify-center gap-1"
                    onClick={toggleProfileDropdown}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>

                {/* Profile dropdown */}
                {isProfileDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-[#F59E0B] ring-opacity-5 focus:outline-none">
                        <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                        >
                            {userId && (
                                <Link
                                    to={`/profile/${userId}`}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                    onClick={closeProfileDropdown}
                                >
                                    Profile
                                </Link>
                            )}
                            <Link
                                to="/cart"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                                onClick={closeProfileDropdown}
                            >
                                Cart
                            </Link>
                            <Link
                                to="/login"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                                onClick={closeProfileDropdown}
                            >
                                Logout
                            </Link>

                            {/* Conditionally render the "Dashboard" link based on the user's role */}
                            {userRole === 'admin' && (
                                <Link
                                    to="/admin"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                    onClick={closeProfileDropdown}
                                >
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

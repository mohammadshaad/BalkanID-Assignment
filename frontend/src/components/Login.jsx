import React, { useState } from 'react';
import '../App.css';
import LoginImg from '../../public/login-img.svg';

function Login() {
    // State to store user input
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send user input to backend for login
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // Get response from the backend
        const body = await response.json();

        // Check for successful login or display an error message
        if (response.status === 200) {
            // Assuming the backend returns a 'token' field in the response
            const { token } = body;

            // Store the token in localStorage or a more secure storage method
            localStorage.setItem('token', token);

            // Redirect to the user's home page
            window.location.href = '/home';
        } else {
            // Handle login failure
            alert("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className="min-h-screen w-full flex items-center justify-between bg-dark">
                <div className='bg-primary h-screen flex items-center justify-center px-28 rounded-r-[40px]'>
                    <img src={LoginImg} alt="Login" className="w-96 " />
                </div>
                <div className='flex text-primary  items-center justify-center px-52  h-screen'>
                    <div className="bg-primary p-8 rounded-2xl shadow-xl w-[30rem]">
                        <h2 className="text-4xl font-semibold mb-12">Login</h2>
                        <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col w-full gap-4'>
                            <div className="mb-4 w-full">
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    className="w-full border-b bg-transparent py-2 px-3 focus:outline-none focus:border-b focus:border-b-[#F59E0B] focus:border-0 active:bg-transparent autofill:bg-transparent backdrop:bg-transparent placeholder:bg-transparent selection:bg-transparent "
                                    required
                                />
                            </div>
                            <div className="mb-4 w-full">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full border-b bg-transparent py-2 px-3 focus:outline-none focus:border-b focus:border-b-[#F59E0B] focus:border-0 active:bg-transparent"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-[#F59E0B] w-full hover:bg-dark text-accent py-2 px-4 rounded-full  transition duration-300"
                            >
                                Login
                            </button>

                            <div className='text-sm'>
                                Don't have an account? {' '}
                                <span className='text-[#F59E0B] font-semibold'>
                                    <a href='/register' className=''>Sign Up</a>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

import React, { useState } from 'react';
import '../App.css';
import LoginImg from '../../public/login-img.svg';

function Registration() {
    // State to store user input
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: 'user', // Set the default role to 'user'
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

        // Send user registration data to the backend
        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // Get response from the backend
        const body = await response.json();

        // Check for successful registration or display an error message
        if (response.status === 200) {
            alert('Registration successful! You can now log in.');
            window.location.href = '/login'; // Redirect to the login page
        } else {
            alert(body.message); // Display registration error message
        }
    };

    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className="min-h-screen w-full flex items-center justify-between bg-dark">
                <div className='bg-primary h-screen flex items-center justify-center px-28 rounded-r-[40px]'>
                    <img src={LoginImg} alt="Login" className="w-96 " />
                </div>
                <div className='flex text-primary items-center justify-center px-52 h-screen'>
                    <div className="bg-primary p-8 rounded-2xl shadow-xl w-[30rem]">
                        <h2 className="text-4xl font-semibold mb-12">Sign Up</h2>

                        <form onSubmit={handleSubmit} className='flex items-start justify-center flex-col w-full gap-4'>
                            <div className="mb-4 w-full">
                                <input
                                    type='text'
                                    id='firstname'
                                    name='firstname'
                                    placeholder='First Name'
                                    value={formData.firstname}
                                    onChange={handleInputChange}
                                    autoComplete='off'
                                    className='caret-[#F59E0B] w-full border-b bg-transparent py-2 px-3 focus:outline-none focus:border-b focus:border-b-[#F59E0B] focus:border-0 active:bg-transparent autofill:bg-transparent backdrop:bg-transparent placeholder:bg-transparent selection:bg-transparent '
                                    required
                                />
                            </div>
                            <div className="mb-4 w-full">
                                <input
                                    type='text'
                                    id='lastname'
                                    name='lastname'
                                    placeholder='Last Name'
                                    value={formData.lastname}
                                    onChange={handleInputChange}
                                    autoComplete='off'
                                    className='caret-[#F59E0B] w-full border-b bg-transparent py-2 px-3 focus:outline-none focus:border-b focus:border-b-[#F59E0B] focus:border-0 active:bg-transparent autofill:bg-transparent backdrop:bg-transparent placeholder:bg-transparent selection:bg-transparent '
                                    required
                                />
                            </div>
                            <div className="mb-4 w-full">
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    className="caret-[#F59E0B] w-full border-b bg-transparent py-2 px-3 focus:outline-none focus:border-b focus:border-b-[#F59E0B] focus:border-0 active:bg-transparent autofill:bg-transparent backdrop:bg-transparent placeholder-bg-transparent selection-bg-transparent "
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
                                    className="caret-[#F59E0B] w-full border-b bg-transparent py-2 px-3 focus:outline-none focus:border-b focus:border-b-[#F59E0B] focus:border-0 active-bg-transparent"
                                    required
                                />
                            </div>
                            <div className='flex items-center justify-center gap-2'>
                                <input
                                    type="checkbox"
                                    id="user"
                                    name="role"
                                    value="user"
                                    onChange={handleInputChange}
                                    className="accent-[#F59E0B] block w-5 h-5 rounded-full transition duration-300 checked:bg-[#F59E0B] checked:border-transparent focus:outline-none "
                                    required
                                    checked
                                />
                                <label htmlFor="user" className="mr-2">User</label>
                            </div>
                            
                            <div className='flex flex-col items-center justify-center w-full gap-4'>
                                <button
                                    type="submit"
                                    className="bg-[#F59E0B] w-full hover-bg-dark text-accent py-2 px-4 rounded-full transition duration-300"
                                >
                                    Register
                                </button>

                                <div className='text-sm'>
                                    Already have an account? {' '}
                                    <span className='text-[#F59E0B] font-semibold'>
                                        <a href='/login' className=''>Log in</a>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;

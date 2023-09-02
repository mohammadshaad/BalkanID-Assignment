import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../App.css';
import LandingPageImg from '../../public/landing-img.svg';
import UserImg from '../../public/user.svg';
import AdminImg from '../../public/admin.svg';

function LandingPage() {
    return (
        <div className="flex items-center bg-dark text-primary justify-center h-screen">
            <div className='flex flex-col items-center justify-center gap-6 h-full px-20'>
                <h1 className="text-6xl font-semibold mb-8">
                    Hey 👋
                    Welcome to the Book Store 📚</h1>
                <div className="flex gap-4 w-full">
                    {/* User Login/Register */}
                    <div className="bg-primary p-4 rounded-xl shadow-md w-full">
                        <div className='w-full flex items-center justify-center flex-col'>
                            <img src={UserImg} alt="User" className="w-40 mb-4" />

                            <h2 className="text-2xl font-semibold mb-4">User</h2>

                            <div className='flex items-center justify-between w-full'>
                                <Link to="/login" className="text-[#F59E0B] hover:underline">Login</Link>
                                <Link to="/register" className="text-[#F59E0B] hover:underline">Register</Link>
                            </div>
                        </div>

                    </div>

                    {/* Admin Login */}
                    <div className="bg-primary p-4 rounded-xl shadow-md w-full">
                        <div className='flex items-center justify-center flex-col'>
                            <img src={AdminImg} alt="Admin" className="w-40 mb-4" />

                            <h2 className="text-2xl font-semibold mb-4">Admin</h2>

                            <Link to="/login" className="text-[#F59E0B] hover:underline">Login</Link>
                        </div>

                    </div>
                </div>
            </div>
            {/* <div className='bg-primary h-screen flex items-center justify-center px-10 rounded-l-[40px]'>
                <img src={LandingPageImg} alt="Landing Page" className="w-[30rem]" />
            </div> */}
        </div>
    );
}

export default LandingPage;

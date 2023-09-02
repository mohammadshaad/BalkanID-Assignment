import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProfileInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        firstname: userData.firstname || '',
        lastname: userData.lastname || '',
        email: userData.email || '',
        password: '', // You can add password editing functionality here
    });

    // Function to save the edited data
    const saveChanges = () => {
        // Send edited data to the server and update user data on success
        // Make a PUT request to update the user's profile
        fetch(`http://localhost:8080/user/profile/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedData),
        })
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
                setIsEditing(false);
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
            });
    };

    // Function to deactivate the user account
    const deactivateAccount = () => {
        fetch(`http://localhost:8080/user/deactivate/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .then(() => {
                // Redirect to the login page after deactivation
                localStorage.removeItem('token'); // Clear the token
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error deactivating account:', error);
            });
    };

    // Function to delete the user account
    const deleteAccount = () => {
        fetch(`http://localhost:8080/user/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .then(() => {
                // Redirect to the login page after deletion
                localStorage.removeItem('token'); // Clear the token
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error deleting account:', error);
            });
    };

    useEffect(() => {
        // Fetch user profile data
        fetch(`http://localhost:8080/user/profile/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <Navbar />
            <div className='flex items-center justify-center h-screen w-full'>
                <div className="max-w-xl mx-auto px-8 py-10 bg-gray-100 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
                    {isEditing ? (
                        <div className="mb-4">
                            <label className="font-semibold">First Name:</label>
                            <input
                                type="text"
                                value={editedData.firstname}
                                onChange={(e) => setEditedData({ ...editedData, firstname: e.target.value })}
                            />
                        </div>
                    ) : (
                        <div className="mb-4">
                            <p className="font-semibold">First Name:</p>
                            <p>{userData.firstname}</p>
                        </div>
                    )}

                    {isEditing ? (
                        <div className="mb-4">
                            <label className="font-semibold">Last Name:</label>
                            <input
                                type="text"
                                value={editedData.lastname}
                                onChange={(e) => setEditedData({ ...editedData, lastname: e.target.value })}
                            />
                        </div>
                    ) : (
                        <div className="mb-4">
                            <p className="font-semibold">Last Name:</p>
                            <p>{userData.lastname}</p>
                        </div>
                    )}

                    {isEditing ? (
                        <div className="mb-4">
                            <label className="font-semibold">Email:</label>
                            <input
                                type="email"
                                value={editedData.email}
                                onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                            />
                        </div>
                    ) : (
                        <div className="mb-10">
                            <p className="font-semibold">Email:</p>
                            <p>{userData.email}</p>
                        </div>
                    )}

                    {isEditing ? (
                        <div className="mb-4">
                            <label className="font-semibold">Password:</label>
                            <input
                                type="password"
                                value={editedData.password}
                                onChange={(e) => setEditedData({ ...editedData, password: e.target.value })}
                            />
                        </div>
                    ) : null}

                    <div className="flex space-x-4">
                        {isEditing ? (
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full transition duration-300"
                                onClick={saveChanges}
                            >
                                Save Changes
                            </button>
                        ) : (
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </button>
                        )}

                        <button
                            className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-full transition duration-300"
                            onClick={deactivateAccount}
                        >
                            Deactivate Account
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition duration-300"
                            onClick={deleteAccount}
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;

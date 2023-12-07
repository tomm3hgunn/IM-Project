import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import UsersOnline from '../components/UsersOnline';
import Logout from '../components/Logout'; // Import Logout component

const LandingPage: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-blue-100">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="mb-6">
                    <Login />
                </div>
                <div className="mb-6">
                    <Register />
                </div>
                <div className="mb-6">
                    <Logout /> {/* Add Logout button */}
                </div>
            </div>
            <div className="max-w-md mx-auto mt-6">
                <UsersOnline /> {/* UsersOnline component */}
            </div>
        </div>
    );
};

export default LandingPage;

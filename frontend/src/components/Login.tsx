// src/components/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Create a navigate instance

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            if (response.data.access_token) {
                localStorage.setItem('token', response.data.access_token); // Store the token
                localStorage.setItem('username', username); // Store the username
                navigate('/message'); // Navigate to messages page
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="p-2 border-2 border-gray-300 rounded-md mb-4"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="p-2 border-2 border-gray-300 rounded-md mb-4"
            />
            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white p-2 rounded-md"
            >
                Login
            </button>
        </div>
    );
};

export default Login;

// src/components/Register.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post('https://im-backend-6uzp.onrender.com/register', { username, password });
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Registration failed:', error);
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
                onClick={handleRegister}
                className="bg-blue-500 text-white p-2 rounded-md"
            >
                Register
            </button>
        </div>
    );
};

export default Register;

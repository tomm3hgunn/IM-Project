import React from 'react';

const Logout: React.FC = () => {
    const handleLogout = async () => {
        const token = localStorage.getItem('token'); 
        if (token) {
            try {
                const response = await fetch('http://localhost:5000/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    console.log('Logged out successfully');
                    localStorage.removeItem('token');
                    window.location.reload(); 
                } else {
                    console.error('Failed to log out');
                }
            } catch (error) {
                console.error('Error during logout:', error);
            }
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;

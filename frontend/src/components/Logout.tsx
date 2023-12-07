import React from 'react';

const Logout: React.FC = () => {
    const handleLogout = async () => {
        const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
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
                    localStorage.removeItem('token'); // Clear the token from localStorage
                    window.location.reload(); // Refresh the page
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

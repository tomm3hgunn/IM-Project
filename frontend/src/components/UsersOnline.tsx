import React, { useState, useEffect } from 'react';

interface User {
    username: string;
    is_online: boolean;
}

const UsersOnline: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://https://im-backend-6uzp.onrender.com/users');
            if (response.ok) {
                const data = await response.json() as User[];
                setUsers(data);
            } else {
                console.error('Failed to fetch users');
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index} style={{ color: user.is_online ? 'green' : 'red' }}>
                        {user.username} - {user.is_online ? 'Online' : 'Offline'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersOnline;

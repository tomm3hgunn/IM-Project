

import React, { useState, useEffect } from 'react';

interface IMessage {
    sender: string;
    content: string;
    timestamp: string;
}

const Message: React.FC = () => {
    const [message, setMessage] = useState('');
    const [receiver, setReceiver] = useState('');
    const [messages, setMessages] = useState<IMessage[]>([]);
    const loggedInUsername = localStorage.getItem('username');

    useEffect(() => {
        getMyMessages();
    }, []);
    useEffect(() => {
        const intervalId = setInterval(() => {
            getMyMessages();
        }, 5000); 

        return () => clearInterval(intervalId); 
    }, []);
    const sendMessage = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ receiver, content: message }),
            });

            if (response.ok) {
                console.log('Message sent successfully');
                setMessage(''); 
                getMessages(receiver); 
            } else {
                console.error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const getMessages = async (receiverUsername: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/messages/${receiverUsername}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(data); // Update state with retrieved messages
            } else {
                console.error('Failed to retrieve messages');
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };
    const getMyMessages = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/my_messages`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(data); // Update state with retrieved messages
            } else {
                console.error('Failed to retrieve messages');
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage();
    };

    return (
        <div>
            <h2>
                logged in as: {loggedInUsername}
            </h2>
            
            <button onClick={() => window.location.href = '/'}>Back</button>
           
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    placeholder="Receiver's username"
                />
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here"
                />
                <button type="submit">Send</button>
            </form>
            <div className="message-container">
                <div>
                    <h3>Received Messages</h3>
                    {messages.filter(msg => msg.sender !== loggedInUsername).map((msg, index) => (
                        <div key={index}> <p>{msg.sender}: {msg.content}</p></div>
                    ))}
                </div>
                <br></br>
                <div>
                    <h3>Sent Messages</h3>
                    {messages.filter(msg => msg.sender === loggedInUsername).map((msg, index) => (
                        <div key={index}> <p>{msg.sender}: {msg.content}</p></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Message;
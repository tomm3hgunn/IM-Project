import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Message from './components/Message';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/message" element={<Message />} />
                <Route path="/logout" element={<LandingPage />} />
                <Route path="/users" element={<LandingPage />} />
            </Routes>
        </Router>
    );
}

export default App;

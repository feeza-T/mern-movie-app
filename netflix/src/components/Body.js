import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';
import List from './List'; // Import List component

const Body = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/list" element={<List />} /> {/* Add List route */}
            </Routes>
        </Router>
    );
};

export default Body;

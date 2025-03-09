import React from 'react';
import axios from 'axios';

const Logout = () => {
    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout');
            console.log('Logged out');
        } catch (err) {
            console.error(err);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
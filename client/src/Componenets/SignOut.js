import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../CustomHooks/UserContext.js'; // Corrected import

const SignOut = () => {
    const navigate = useNavigate();
    const { setUser } = useUser(); // Use the useUser hook correctly

    useEffect(() => {
        // Here you would also clear any authentication tokens or user data from storage
        setUser(null); // Clear the user from context or however you're managing state
        navigate('/login'); // Redirect to login page
    }, [setUser, navigate]);

    return null; // This component doesn't render anything
};

export default SignOut;

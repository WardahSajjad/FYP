import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context for the user
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const isAuthenticated = () => {
        return !!user;
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    );
};

// Create a custom hook to use the UserContext
export const useUser = () => {
    return useContext(UserContext);
};

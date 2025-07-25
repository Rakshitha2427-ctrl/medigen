import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for the application
export const AppContext = createContext();

// Provider component to wrap around the application
export const AppProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch products from the backend API
    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <AppContext.Provider value={{ products, loading, error }}>
            {children}
        </AppContext.Provider>
    );
};
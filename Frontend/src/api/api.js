import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Base URL for the Flask API

// Function to handle API calls for product data
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Function to handle API calls for salt content
export const fetchSaltContent = async () => {
    try {
        const response = await axios.get(`${API_URL}/salt-content`);
        return response.data;
    } catch (error) {
        console.error('Error fetching salt content:', error);
        throw error;
    }
};

// Function to handle API calls for reviews
export const fetchReviews = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/reviews/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

// Function to handle API calls for product descriptions
export const fetchDescription = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/descriptions/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching description:', error);
        throw error;
    }
};
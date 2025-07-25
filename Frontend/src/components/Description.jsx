import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { fetchDescription } from '../api/api';

const Description = () => {
    const { state } = useContext(AppContext);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDescription = async () => {
            try {
                const data = await fetchDescription(state.productId);
                setDescription(data.description);
            } catch (err) {
                setError('Failed to load description');
            } finally {
                setLoading(false);
            }
        };

        loadDescription();
    }, [state.productId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="description-container">
            <h2>Product Description</h2>
            <p>{description}</p>
        </div>
    );
};

export default Description;
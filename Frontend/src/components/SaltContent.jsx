import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { fetchSaltContent } from '../api/api';

const SaltContent = () => {
    const { state } = useContext(AppContext);
    const [saltData, setSaltData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadSaltContent = async () => {
            try {
                const data = await fetchSaltContent(state.token);
                setSaltData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadSaltContent();
    }, [state.token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="salt-content">
            <h2>Salt Content</h2>
            <ul>
                {saltData.map((salt) => (
                    <li key={salt.id}>
                        <h3>{salt.name}</h3>
                        <p>{salt.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SaltContent;
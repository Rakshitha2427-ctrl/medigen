import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './ReviewSection.css';

const ReviewSection = () => {
    const { productId } = useContext(AppContext);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`/api/reviews/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [productId]);

    if (loading) return <div>Loading reviews...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="review-section">
            <h2>Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <h3>{review.title}</h3>
                            <p>{review.content}</p>
                            <p><strong>Rating:</strong> {review.rating}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewSection;
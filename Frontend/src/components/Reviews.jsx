import { useState, useEffect } from "react";
import apiService from "../services/apiService";

export default function Reviews({ productId = 1 }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddReview, setShowAddReview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newReview, setNewReview] = useState({
    user_name: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getProductReviews(productId);
      setReviews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const submitReview = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await apiService.addProductReview(productId, newReview);

      // Reset form and refresh reviews
      setNewReview({ user_name: "", rating: 5, comment: "" });
      setShowAddReview(false);
      fetchReviews();
    } catch (err) {
      alert("Error submitting review: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-bold mb-4">Ratings & Reviews</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded shadow animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-bold mb-4">Ratings & Reviews</h3>
        <div className="text-red-600">
          <p>Error loading reviews: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 p-6 rounded-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Ratings & Reviews</h3>
        <button
          onClick={() => setShowAddReview(!showAddReview)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add Review
        </button>
      </div>

      {showAddReview && (
        <form
          onSubmit={submitReview}
          className="bg-white p-4 rounded shadow mb-4"
        >
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name (optional)
            </label>
            <input
              type="text"
              value={newReview.user_name}
              onChange={(e) =>
                setNewReview({ ...newReview, user_name: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Anonymous"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: parseInt(e.target.value) })
              }
              className="border border-gray-300 rounded px-3 py-2"
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num !== 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comment
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 h-20"
              placeholder="Share your experience..."
              required
            />
          </div>{" "}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
            <button
              type="button"
              onClick={() => setShowAddReview(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className="text-gray-600">
          No reviews yet. Be the first to review this medicine!
        </p>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-yellow-500 text-lg">
                    {renderStars(review.rating)}
                  </span>
                  <span className="text-gray-600 ml-2 font-medium">
                    {review.user_name || "Anonymous"}
                  </span>
                </div>
                {review.created_at && (
                  <span className="text-gray-400 text-sm">
                    {formatDate(review.created_at)}
                  </span>
                )}
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

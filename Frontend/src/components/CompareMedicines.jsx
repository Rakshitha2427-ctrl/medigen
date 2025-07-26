import { useState, useEffect } from "react";
import apiService from "../services/apiService";

export default function CompareMedicines({ productId = 1 }) {
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAlternatives();
  }, [productId]);

  const fetchAlternatives = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getProductAlternatives(productId);
      setAlternatives(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Compare Medicines</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="bg-white p-4 shadow rounded animate-pulse"
            >
              <div className="h-24 bg-gray-200 mb-2 rounded"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Compare Medicines</h3>
        <div className="text-red-600">
          <p>Error loading alternatives: {error}</p>
        </div>
      </section>
    );
  }

  if (alternatives.length === 0) {
    return (
      <section className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Compare Medicines</h3>
        <p className="text-gray-600">
          No alternative medicines available for comparison.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 p-6 rounded-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">Compare Medicines</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {alternatives.map((med) => (
          <div
            key={med.id}
            className="bg-white p-4 shadow rounded hover:shadow-lg transition-shadow"
          >
            <div className="h-24 bg-gradient-to-br from-blue-100 to-blue-200 mb-3 rounded flex items-center justify-center">
              <span className="text-blue-600 text-sm font-medium">
                Medicine
              </span>
            </div>
            <h4 className="font-bold text-gray-800 mb-1">{med.name}</h4>
            <p className="text-green-600 font-semibold">₹{med.price}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 mr-1">⭐</span>
              <span className="text-gray-600 text-sm">{med.rating}</span>
            </div>
            <button className="w-full mt-3 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import apiService from "../services/apiService";

export default function MedicineDetails({ productId = 1 }) {
  const [medicineData, setMedicineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMedicineDetails();
  }, [productId]);

  const fetchMedicineDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getProduct(productId);
      setMedicineData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="p-6 bg-white shadow-md rounded-lg mb-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-6 bg-white shadow-md rounded-lg mb-6">
        <div className="text-red-600">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (!medicineData) {
    return null;
  }

  return (
    <section className="p-6 bg-white shadow-md rounded-lg mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">About {medicineData.name}</h2>
          {medicineData.generic_name && (
            <p className="text-gray-600 text-sm">
              Generic: {medicineData.generic_name}
              {medicineData.brand_name &&
                ` | Brand: ${medicineData.brand_name}`}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">
            ₹{medicineData.price}
          </p>
          {medicineData.rating > 0 && (
            <div className="flex items-center justify-end mt-1">
              <span className="text-yellow-500 mr-1">⭐</span>
              <span className="text-gray-600">{medicineData.rating}</span>
            </div>
          )}
        </div>
      </div>

      <p className="mb-4 text-gray-700 leading-relaxed">
        {medicineData.description}
      </p>

      {medicineData.salt_contents && medicineData.salt_contents.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">
            Active Ingredients:
          </h3>
          <div className="flex flex-wrap gap-2">
            {medicineData.salt_contents.map((salt) => (
              <span
                key={salt.id}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {salt.salt_name} ({salt.concentration})
              </span>
            ))}
          </div>
        </div>
      )}

      {medicineData.uses && medicineData.uses.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Uses:</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            {medicineData.uses.map((use) => (
              <li key={use.id}>{use.use_case}</li>
            ))}
          </ul>
        </div>
      )}

      {!medicineData.is_available && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4">
          <p className="font-semibold">Currently Out of Stock</p>
        </div>
      )}
    </section>
  );
}

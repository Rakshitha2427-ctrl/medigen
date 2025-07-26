import { useState, useEffect } from "react";
import MedicineDetails from "./components/MedicineDetails";
import CompareMedicines from "./components/CompareMedicines";
import FAQ from "./components/FAQ";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import apiService from "./services/apiService";

function App() {
  const [productId, setProductId] = useState(1); // Default to DOLO 650MG
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError(
        "Failed to load products. Please check if the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (query) => {
    if (!query.trim()) {
      fetchProducts();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await apiService.searchProducts(query);
      setProducts(data);
    } catch (error) {
      console.error("Failed to search products:", error);
      setError("Failed to search products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchProducts(searchQuery);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-blue-600">MediGen</h1>
              {loading && (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              )}
            </div>

            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicines..."
                className="border border-gray-300 rounded px-4 py-2 w-64"
                disabled={loading}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                Search
              </button>
            </form>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <div className="flex items-center justify-between">
                <span>{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="text-red-700 hover:text-red-900"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Product Selection */}
          {products.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Medicine:
              </label>
              <select
                value={productId}
                onChange={(e) => setProductId(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-3 py-2 w-full md:w-auto"
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ₹{product.price}
                    {product.rating > 0 && ` (★${product.rating})`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* No Products Message */}
          {!loading && products.length === 0 && !error && (
            <div className="mt-4 text-center text-gray-500">
              <p>No products found. Make sure the backend server is running.</p>
              <button
                onClick={fetchProducts}
                className="mt-2 text-blue-600 hover:text-blue-800 underline"
              >
                Retry Loading Products
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4">
        {products.length > 0 ? (
          <>
            <MedicineDetails productId={productId} />
            <CompareMedicines productId={productId} />
            <FAQ productId={productId} />
            <Reviews productId={productId} />
          </>
        ) : (
          !loading &&
          !error && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                <p>Welcome to MediGen!</p>
                <p className="mt-2">
                  Start the backend server to load medicine data.
                </p>
              </div>
            </div>
          )
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;

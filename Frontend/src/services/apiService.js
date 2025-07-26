import config from "../config/environment.js";

class ApiService {
  constructor() {
    this.baseURL = config.API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const mergedOptions = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, mergedOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      throw error;
    }
  }

  // Product APIs
  async getProducts() {
    return this.request("/products");
  }

  async getProduct(productId) {
    return this.request(`/products/${productId}`);
  }

  async searchProducts(query) {
    return this.request(`/products/search?q=${encodeURIComponent(query)}`);
  }

  async createProduct(productData) {
    return this.request("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  }

  // Review APIs
  async getProductReviews(productId) {
    return this.request(`/products/${productId}/reviews`);
  }

  async addProductReview(productId, reviewData) {
    return this.request(`/products/${productId}/reviews`, {
      method: "POST",
      body: JSON.stringify(reviewData),
    });
  }

  // FAQ APIs
  async getProductFaqs(productId) {
    return this.request(`/products/${productId}/faqs`);
  }

  // Alternative Medicine APIs
  async getProductAlternatives(productId) {
    return this.request(`/products/${productId}/alternatives`);
  }

  // Authentication APIs
  async login(username, password) {
    return this.request("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  }
}

export default new ApiService();

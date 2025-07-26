// Environment configuration for MediGen Frontend
const config = {
  development: {
    API_BASE_URL: "http://localhost:5000/api",
    APP_NAME: "MediGen",
    DEBUG: true,
  },
  production: {
    API_BASE_URL: "/api", // Relative URL for production
    APP_NAME: "MediGen",
    DEBUG: false,
  },
};

const environment = import.meta.env.MODE || "development";
export default config[environment];

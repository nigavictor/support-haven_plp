// API configuration
// In production, this will use VITE_API_URL from environment variables
// In development, it uses the proxy from vite.config.js

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const getApiUrl = (endpoint) => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  if (API_BASE_URL) {
    // Production: use full URL
    return `${API_BASE_URL}/${cleanEndpoint}`;
  } else {
    // Development: use relative URL (proxy will handle it)
    return `/api/${cleanEndpoint}`;
  }
};

export default getApiUrl;


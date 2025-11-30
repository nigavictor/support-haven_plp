// API configuration
// In production, this will use VITE_API_URL from environment variables
// In development, it uses the proxy from vite.config.js

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const getApiUrl = (endpoint) => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  // Check if we're in development (localhost)
  // Always use proxy in development, even if VITE_API_URL is set
  const isDevelopment = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || 
     window.location.hostname === '127.0.0.1' ||
     window.location.hostname === '');
  
  // In development, always use relative URL (proxy handles it)
  if (isDevelopment) {
    return `/api/${cleanEndpoint}`;
  }
  
  // Production: use full URL from env variable
  if (API_BASE_URL) {
    // VITE_API_URL should be the full backend URL (e.g., https://support-haven-plp.onrender.com)
    // Remove trailing slash and add /api/ before endpoint
    const baseUrl = API_BASE_URL.replace(/\/$/, '').replace(/\/api$/, '');
    return `${baseUrl}/api/${cleanEndpoint}`;
  }
  
  // Fallback: use relative URL
  return `/api/${cleanEndpoint}`;
};

export default getApiUrl;


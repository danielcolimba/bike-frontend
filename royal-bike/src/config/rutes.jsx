const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API_AUTH_BASE_URL = import.meta.env.VITE_API_AUTH_BASE_URL || 'http://localhost:8001';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_AUTH_BASE_URL}/auth/login/`,
  REGISTER: `${API_AUTH_BASE_URL}/auth/register/user/`,
  
  // Product endpoints
  PRODUCTS: `${API_BASE_URL}/products/`,
  
  // Cart endpoints
  CART_VIEW: `${API_BASE_URL}/cart/view/`,
  CART_ADD: `${API_BASE_URL}/cart/add/`,
  CART_UPDATE: `${API_BASE_URL}/cart/update/`,
  CART_REMOVE: `${API_BASE_URL}/cart/remove/`,
  
  // Purchase endpoints
  BUY_CHECKOUT: `${API_BASE_URL}/buy/checkout/`,
  // Discount endpoints
  GEAR_DISCOUNTS: `${API_BASE_URL}/gear-discounts/`,
  // Top bicycles endpoint
  TOP_BICYCLES: `${API_BASE_URL}/top-bicycles/`
};


export default API_BASE_URL;
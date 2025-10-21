/**
 * Configuration des endpoints API pour le backend
 * Centralise toutes les URLs des requêtes HTTP
 */

// Base URL de l'API (à configurer selon l'environnement)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Endpoints d'authentification
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  VERIFY_EMAIL: '/auth/verify-email',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  ME: '/auth/me', // Récupérer l'utilisateur connecté
}

// Endpoints produits
export const PRODUCT_ENDPOINTS = {
  GET_ALL: '/products',
  GET_BY_ID: (id) => `/products/${id}`,
  GET_BY_CATEGORY: (categoryId) => `/products/category/${categoryId}`,
  SEARCH: '/products/search',
  FEATURED: '/products/featured',
  RELATED: (id) => `/products/${id}/related`,
  CREATE: '/products', // Admin only
  UPDATE: (id) => `/products/${id}`, // Admin only
  DELETE: (id) => `/products/${id}`, // Admin only
}

// Endpoints catégories
export const CATEGORY_ENDPOINTS = {
  GET_ALL: '/categories',
  GET_BY_ID: (id) => `/categories/${id}`,
  CREATE: '/categories', // Admin only
  UPDATE: (id) => `/categories/${id}`, // Admin only
  DELETE: (id) => `/categories/${id}`, // Admin only
}

// Endpoints panier
export const CART_ENDPOINTS = {
  GET: '/cart',
  ADD_ITEM: '/cart/add',
  UPDATE_ITEM: (itemId) => `/cart/item/${itemId}`,
  REMOVE_ITEM: (itemId) => `/cart/item/${itemId}`,
  CLEAR: '/cart/clear',
  SYNC: '/cart/sync', // Synchroniser panier local avec backend
}

// Endpoints commandes
export const ORDER_ENDPOINTS = {
  GET_ALL: '/orders', // Commandes de l'utilisateur
  GET_BY_ID: (id) => `/orders/${id}`,
  CREATE: '/orders',
  UPDATE_STATUS: (id) => `/orders/${id}/status`, // Admin only
  CANCEL: (id) => `/orders/${id}/cancel`,
  GET_ALL_ADMIN: '/admin/orders', // Admin: toutes les commandes
}

// Endpoints utilisateur
export const USER_ENDPOINTS = {
  GET_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile',
  CHANGE_PASSWORD: '/user/change-password',
  GET_ADDRESSES: '/user/addresses',
  ADD_ADDRESS: '/user/addresses',
  UPDATE_ADDRESS: (id) => `/user/addresses/${id}`,
  DELETE_ADDRESS: (id) => `/user/addresses/${id}`,
  GET_WISHLIST: '/user/wishlist',
  ADD_TO_WISHLIST: '/user/wishlist',
  REMOVE_FROM_WISHLIST: (productId) => `/user/wishlist/${productId}`,
}

// Endpoints paiement
export const PAYMENT_ENDPOINTS = {
  CREATE_INTENT: '/payment/create-intent',
  CONFIRM: '/payment/confirm',
  WEBHOOK: '/payment/webhook', // Pour les notifications du service de paiement
  MOBILE_MONEY: '/payment/mobile-money', // Orange Money, Wave, etc.
}

// Endpoints administrateur
export const ADMIN_ENDPOINTS = {
  DASHBOARD_STATS: '/admin/dashboard/stats',
  GET_USERS: '/admin/users',
  UPDATE_USER_ROLE: (userId) => `/admin/users/${userId}/role`,
  DELETE_USER: (userId) => `/admin/users/${userId}`,
}

// Fonction helper pour construire l'URL complète
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`
}

// Exemples d'utilisation :
// fetch(buildApiUrl(PRODUCT_ENDPOINTS.GET_ALL))
// fetch(buildApiUrl(PRODUCT_ENDPOINTS.GET_BY_ID('123')))
// fetch(buildApiUrl(ORDER_ENDPOINTS.CREATE), { method: 'POST', ... })

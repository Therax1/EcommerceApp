/**
 * Configuration centralisée des routes de l'application
 * Facilite la maintenance et l'intégration avec le backend
 */

// Routes publiques (accessibles sans authentification)
export const PUBLIC_ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/product/:id',
  CATEGORY: '/category/:slug',
  CONTACT: '/contact',
  ABOUT: '/about',
  SEARCH: '/search',
}

// Routes d'authentification
export const AUTH_ROUTES = {
  LOGIN: '/connexion',
  REGISTER: '/inscription',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  VERIFY_EMAIL: '/verify-email/:token',
}

// Routes protégées (nécessitent authentification)
export const PROTECTED_ROUTES = {
  // Cart & Checkout
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_SUCCESS: '/order-success/:orderId',
  
  // User Account
  PROFILE: '/account/profile',
  ORDERS: '/account/orders',
  ORDER_DETAIL: '/account/orders/:orderId',
  ADDRESSES: '/account/addresses',
  WISHLIST: '/account/wishlist',
  SETTINGS: '/account/settings',
}

// Routes administrateur
export const ADMIN_ROUTES = {
  DASHBOARD: '/admin/dashboard',
  PRODUCTS: '/admin/products',
  PRODUCT_ADD: '/admin/products/add',
  PRODUCT_EDIT: '/admin/products/edit/:id',
  ORDERS: '/admin/orders',
  ORDER_DETAIL: '/admin/orders/:id',
  CUSTOMERS: '/admin/customers',
  CATEGORIES: '/admin/categories',
  SETTINGS: '/admin/settings',
}

// Routes d'erreur
export const ERROR_ROUTES = {
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
  SERVER_ERROR: '/500',
}

// Fonction helper pour générer des URLs dynamiques
export const generatePath = (route, params = {}) => {
  let path = route
  Object.keys(params).forEach(key => {
    path = path.replace(`:${key}`, params[key])
  })
  return path
}

// Exemples d'utilisation :
// generatePath(PROTECTED_ROUTES.ORDER_DETAIL, { orderId: '123' })
// → '/account/orders/123'
//
// generatePath(PUBLIC_ROUTES.PRODUCT_DETAIL, { id: 'laptop-hp-victus' })
// → '/product/laptop-hp-victus'

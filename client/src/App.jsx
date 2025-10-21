import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import ProtectedLayout from './layouts/ProtectedLayout'
import AdminLayout from './layouts/AdminLayout'

// Pages publiques
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import ContactUs from './pages/ContactUs'

// Pages d'authentification
import Connexion from './auth/Connexion'
import Inscription from './auth/Inscription'

// Pages protégées
import Cart from './pages/Cart'

// Configuration des routes
import { 
  PUBLIC_ROUTES, 
  AUTH_ROUTES, 
  PROTECTED_ROUTES,
  ERROR_ROUTES 
} from './routes/routes.config'

/**
 * Configuration principale des routes de l'application
 * Structure organisée par layout pour faciliter la maintenance
 */
export default function App() {
    return (
        <Routes>
            {/* ========== ROUTES PUBLIQUES (avec NavBar + Footer) ========== */}
            <Route element={<MainLayout />}>
                <Route path={PUBLIC_ROUTES.HOME} element={<Home />} />
                <Route path={PUBLIC_ROUTES.CONTACT} element={<ContactUs />} />
                <Route path={PUBLIC_ROUTES.PRODUCT_DETAIL} element={<ProductPage />} />
                
                {/* TODO: Ajouter d'autres routes publiques */}
                {/* <Route path={PUBLIC_ROUTES.SHOP} element={<Shop />} /> */}
                {/* <Route path={PUBLIC_ROUTES.CATEGORY} element={<Category />} /> */}
                {/* <Route path={PUBLIC_ROUTES.ABOUT} element={<About />} /> */}
            </Route>

            {/* ========== ROUTES D'AUTHENTIFICATION ========== */}
            <Route element={<AuthLayout />}>
                <Route path={AUTH_ROUTES.LOGIN} element={<Connexion />} />
                <Route path={AUTH_ROUTES.REGISTER} element={<Inscription />} />
                
                {/* TODO: Ajouter récupération mot de passe */}
                {/* <Route path={AUTH_ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} /> */}
                {/* <Route path={AUTH_ROUTES.RESET_PASSWORD} element={<ResetPassword />} /> */}
            </Route>

            {/* ========== ROUTES PROTÉGÉES (nécessitent authentification) ========== */}
            <Route element={<ProtectedLayout />}>
                <Route path={PROTECTED_ROUTES.CART} element={<Cart />} />
                
                {/* TODO: Ajouter les pages du compte utilisateur */}
                {/* <Route path={PROTECTED_ROUTES.CHECKOUT} element={<Checkout />} /> */}
                {/* <Route path={PROTECTED_ROUTES.PROFILE} element={<Profile />} /> */}
                {/* <Route path={PROTECTED_ROUTES.ORDERS} element={<Orders />} /> */}
                {/* <Route path={PROTECTED_ROUTES.ORDER_DETAIL} element={<OrderDetail />} /> */}
                {/* <Route path={PROTECTED_ROUTES.WISHLIST} element={<Wishlist />} /> */}
            </Route>

            {/* ========== ROUTES ADMINISTRATEUR ========== */}
            <Route element={<AdminLayout />}>
                {/* TODO: Ajouter les pages admin */}
                {/* <Route path={ADMIN_ROUTES.DASHBOARD} element={<AdminDashboard />} /> */}
                {/* <Route path={ADMIN_ROUTES.PRODUCTS} element={<AdminProducts />} /> */}
                {/* <Route path={ADMIN_ROUTES.ORDERS} element={<AdminOrders />} /> */}
            </Route>

            {/* ========== ROUTES D'ERREUR ========== */}
            <Route path={ERROR_ROUTES.NOT_FOUND} element={<NotFound />} />
            <Route path={ERROR_ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
            
            {/* Redirection par défaut pour les routes non trouvées */}
            <Route path="*" element={<Navigate to={ERROR_ROUTES.NOT_FOUND} replace />} />
        </Routes>
    )
}

/**
 * Composants d'erreur temporaires
 * TODO: Créer des pages d'erreur dédiées dans /pages/errors/
 */
function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Page non trouvée</p>
                <a href="/" className="text-amber-600 hover:text-amber-700 font-semibold">
                    Retour à l'accueil
                </a>
            </div>
        </div>
    )
}

function Unauthorized() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">401</h1>
                <p className="text-xl text-gray-600 mb-8">Accès non autorisé</p>
                <a href="/" className="text-amber-600 hover:text-amber-700 font-semibold">
                    Retour à l'accueil
                </a>
            </div>
        </div>
    )
}

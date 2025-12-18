import { Navigate, Outlet } from 'react-router-dom'
import { AUTH_ROUTES } from '../routes/routes.config'
import { useAuth } from '../context/AuthContext'

/**
 * Layout pour les routes protégées
 * Redirige vers login si non authentifié
 */
export default function ProtectedLayout() {
    const { isAuthenticated, loading } = useAuth()
    
    // Afficher un loader pendant la vérification de l'authentification
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement...</p>
                </div>
            </div>
        )
    }
    
    // Si non authentifié, rediriger vers login
    if (!isAuthenticated()) {
        return <Navigate to={AUTH_ROUTES.LOGIN} replace />
    }
    
    return (
        <div className="flex flex-col min-h-screen">
            {/* NavBar pourrait être différente pour les pages protégées */}
            <main className="flex-1 bg-gray-50">
                <Outlet />
            </main>
        </div>
    )
}

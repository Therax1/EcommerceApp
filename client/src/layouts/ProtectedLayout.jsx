import { Navigate, Outlet } from 'react-router-dom'
import { AUTH_ROUTES } from '../routes/routes.config'

/**
 * Layout pour les routes protégées
 * Redirige vers login si non authentifié
 * 
 * TODO: Remplacer isAuthenticated par la vraie logique d'auth (Context/Redux)
 */
export default function ProtectedLayout() {
    // Pour l'instant, simulation
    // TODO: Récupérer depuis AuthContext ou localStorage
    const isAuthenticated = localStorage.getItem('authToken') !== null
    
    // Si non authentifié, rediriger vers login
    if (!isAuthenticated) {
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

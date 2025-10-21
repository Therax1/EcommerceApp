import { Navigate, Outlet } from 'react-router-dom'
import { PUBLIC_ROUTES } from '../routes/routes.config'

/**
 * Layout pour les pages d'authentification
 * Redirige vers home si déjà authentifié
 */
export default function AuthLayout() {
    // TODO: Récupérer depuis AuthContext
    const isAuthenticated = localStorage.getItem('authToken') !== null
    
    // Si déjà authentifié, rediriger vers home
    if (isAuthenticated) {
        return <Navigate to={PUBLIC_ROUTES.HOME} replace />
    }
    
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Outlet />
        </div>
    )
}

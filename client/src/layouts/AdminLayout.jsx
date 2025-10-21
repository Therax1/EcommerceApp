import { Navigate, Outlet } from 'react-router-dom'
import { AUTH_ROUTES } from '../routes/routes.config'

/**
 * Layout pour le panel administrateur
 * Nécessite authentification + rôle admin
 * 
 * TODO: Vérifier le rôle utilisateur depuis le backend
 */
export default function AdminLayout() {
    // TODO: Récupérer depuis AuthContext
    const isAuthenticated = localStorage.getItem('authToken') !== null
    const isAdmin = localStorage.getItem('userRole') === 'admin'
    
    // Si non authentifié, rediriger vers login
    if (!isAuthenticated) {
        return <Navigate to={AUTH_ROUTES.LOGIN} replace />
    }
    
    // Si pas admin, rediriger vers home
    if (!isAdmin) {
        return <Navigate to="/" replace />
    }
    
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar Admin */}
            <aside className="w-64 bg-gray-900 text-white p-6">
                <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
                {/* Navigation admin ici */}
            </aside>
            
            {/* Contenu principal */}
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    )
}

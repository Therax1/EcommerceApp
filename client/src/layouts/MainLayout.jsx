import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

/**
 * Layout principal pour les pages publiques
 * Inclut la NavBar et le Footer
 */
export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

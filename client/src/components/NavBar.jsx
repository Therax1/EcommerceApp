import { faBars, faTimes, faSearch, faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { useState } from "react"
import CartPopUp from "./CartPopUp"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [isSearchFocused, setIsSearchFocused] = useState(false)
    
    const { getCartCount } = useCart()
    const cartCount = getCartCount()
    
    const { user, logout, isAuthenticated } = useAuth()

    return(
        <>
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`flex items-center justify-between transition-all duration-300 ease-in-out overflow-hidden ${
                        isSearchFocused ? 'h-0 md:h-16' : 'h-16'
                    }`}>
                        
                        {/* Logo - masqué quand recherche focus sur mobile */}
                        <Link to="/" className="flex-shrink-0">
                            <span className="text-3xl font-bold text-gray-900">
                                WestAf
                            </span>
                        </Link>

                        {/* Barre de recherche - Desktop */}
                        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                            <div className="w-full">
                                <div className="relative flex rounded-lg focus-within:ring-2 focus-within:ring-amber-500 focus-within:shadow-lg focus-within:shadow-amber-500/20 transition-all">
                                    <input
                                        type="search"
                                        placeholder="Rechercher un produit..."
                                        className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-l-lg focus:outline-none focus:border-transparent"
                                    />
                                    <button className="px-6 bg-amber-500 hover:bg-amber-600 text-white rounded-r-lg transition-colors">
                                        <FontAwesomeIcon icon={faSearch} className="text-lg" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Actions - Desktop */}
                        <div className="hidden md:flex items-center gap-6">
                            
                            {/* Panier */}
                            <button 
                                onClick={() => setIsCartOpen(!isCartOpen)}
                                className="relative flex items-center gap-2 text-gray-700 hover:text-amber-500 transition-colors"
                            >
                                <FontAwesomeIcon icon={faCartShopping} className="w-6 h-6" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                        {cartCount}
                                    </span>
                                )}
                                <span className="text-base font-medium">Mon panier</span>
                            </button>

                            {/* Compte utilisateur */}
                            {isAuthenticated() ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center gap-2 text-gray-700 hover:text-amber-500 transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <span className="text-base font-medium max-w-[100px] truncate">
                                            {user?.nom_prenom}
                                        </span>
                                    </button>
                                    
                                    {/* Dropdown */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{user?.nom_prenom}</p>
                                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                            </div>
                                            <Link
                                                to="/profil"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                Mon profil
                                            </Link>
                                            <Link
                                                to="/commandes"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                Mes commandes
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setIsUserMenuOpen(false)
                                                    logout()
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100"
                                            >
                                                Déconnexion
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    to="/connexion"
                                    className="flex items-center gap-2 text-gray-700 hover:text-amber-500 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                                    <span className="text-base font-medium">Me connecter</span>
                                </Link>
                            )}
                        </div>

                        {/* Menu mobile - masqué quand recherche focus */}
                        <div className="md:hidden flex items-center gap-4">
                            <button 
                                onClick={() => setIsCartOpen(!isCartOpen)}
                                className="relative text-gray-700"
                            >
                                <FontAwesomeIcon icon={faCartShopping} className="w-6 h-6" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-700"
                            >
                                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Barre de recherche - Mobile */}
                    <div className={`md:hidden transition-all duration-300 ease-in-out ${
                        isSearchFocused ? 'py-3' : 'pb-4'
                    }`}>
                        <div className="relative flex rounded-lg focus-within:ring-2 focus-within:ring-amber-500 focus-within:shadow-lg focus-within:shadow-amber-500/20 transition-all">
                            <input
                                type="search"
                                placeholder="Rechercher..."
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                                className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-l-lg focus:outline-none focus:border-transparent"
                            />
                            <button className="px-6 bg-amber-500 hover:bg-amber-600 text-white rounded-r-lg transition-colors">
                                <FontAwesomeIcon icon={faSearch} className="text-lg" />
                            </button>
                        </div>
                    </div>

                    {/* Menu mobile déroulant */}
                    {isMenuOpen && (
                        <div className="md:hidden border-t border-gray-200 py-4">
                            {isAuthenticated() ? (
                                <div className="space-y-2">
                                    <div className="px-4 py-2 bg-gray-50 rounded-lg">
                                        <p className="text-sm font-semibold text-gray-900">{user?.nom_prenom}</p>
                                        <p className="text-xs text-gray-500">{user?.email}</p>
                                    </div>
                                    <Link
                                        to="/profil"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Mon profil
                                    </Link>
                                    <Link
                                        to="/commandes"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Mes commandes
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false)
                                            logout()
                                        }}
                                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        Déconnexion
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Link
                                        to="/connexion"
                                        className="block px-4 py-2 text-center bg-amber-500 text-white rounded-lg font-semibold"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Connexion
                                    </Link>
                                    <Link
                                        to="/inscription"
                                        className="block px-4 py-2 text-center border border-amber-500 text-amber-500 rounded-lg font-semibold"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Inscription
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>

            {/* Cart Popup */}
            <CartPopUp 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)}
                cartItems={[]}
            />
        </>
    )
}
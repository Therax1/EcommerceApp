import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faShoppingCart, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

/**
 * Page Cart - Panier complet de l'utilisateur
 * 
 * Fonctionnalités :
 * - Affichage de tous les articles avec images
 * - Modification de la quantité (+ / -)
 * - Suppression d'articles
 * - Calcul automatique du subtotal et total
 * - Bouton checkout pour valider la commande
 * - État vide avec CTA pour continuer les achats
 */
export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
    const [isClearing, setIsClearing] = useState(false)
    
    // Fonction pour formater les prix
    const formatPrice = (price) => {
        return `Rs. ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
    
    // Fonction pour augmenter la quantité
    const handleIncrease = (itemId, currentQuantity) => {
        updateQuantity(itemId, currentQuantity + 1)
    }
    
    // Fonction pour diminuer la quantité
    const handleDecrease = (itemId, currentQuantity) => {
        if (currentQuantity > 1) {
            updateQuantity(itemId, currentQuantity - 1)
        }
    }
    
    // Fonction pour supprimer un article
    const handleRemove = (itemId, itemName) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${itemName}" du panier ?`)) {
            removeFromCart(itemId)
        }
    }
    
    // Fonction pour vider le panier
    const handleClearCart = () => {
        if (window.confirm('Êtes-vous sûr de vouloir vider tout le panier ?')) {
            setIsClearing(true)
            setTimeout(() => {
                clearCart()
                setIsClearing(false)
            }, 300)
        }
    }
    
    // Calculer le total
    const total = getCartTotal()
    const subtotal = total // Pour l'instant, pas de taxes ou frais
    
    // État du panier vide
    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
                <div className="text-center max-w-md">
                    <div className="mb-6">
                        <FontAwesomeIcon 
                            icon={faShoppingCart} 
                            className="text-gray-300 text-8xl mb-4"
                        />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Votre panier est vide
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Vous n'avez pas encore ajouté d'articles à votre panier.
                        Commencez vos achats maintenant !
                    </p>
                    <Link 
                        to="/"
                        className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Continuer les achats
                    </Link>
                </div>
            </div>
        )
    }
    
    return (
        <div className="min-h-screen bg-gray-50 py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb / Navigation */}
                <div className="mb-8">
                    <Link 
                        to="/"
                        className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Continuer les achats
                    </Link>
                </div>
                
                {/* En-tête */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Panier ({cartItems.length} {cartItems.length > 1 ? 'articles' : 'article'})
                    </h1>
                    <button
                        onClick={handleClearCart}
                        disabled={isClearing}
                        className="text-red-600 hover:text-red-700 font-medium transition-colors disabled:opacity-50"
                    >
                        Vider le panier
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Section des articles du panier */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* En-tête du tableau (Desktop) */}
                            <div className="hidden md:grid md:grid-cols-12 gap-4 bg-amber-50 px-6 py-4 font-semibold text-gray-900 border-b border-gray-200">
                                <div className="col-span-5">Product</div>
                                <div className="col-span-2 text-center">Price</div>
                                <div className="col-span-2 text-center">Quantity</div>
                                <div className="col-span-2 text-center">Subtotal</div>
                                <div className="col-span-1"></div>
                            </div>

                            {/* Liste des articles */}
                            <div className="divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <article 
                                        key={item.id}
                                        className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6 hover:bg-gray-50 transition-colors"
                                    >
                                        {/* Produit (Image + Nom) */}
                                        <div className="md:col-span-5 flex items-center gap-4">
                                            <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-amber-50 rounded-lg overflow-hidden">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 text-base md:text-lg truncate">
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 md:hidden mt-1">
                                                    {formatPrice(item.price)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Prix (Desktop) */}
                                        <div className="hidden md:flex md:col-span-2 items-center justify-center">
                                            <span className="text-gray-700 font-medium">
                                                {formatPrice(item.price)}
                                            </span>
                                        </div>

                                        {/* Quantité */}
                                        <div className="md:col-span-2 flex items-center justify-start md:justify-center">
                                            <div className="inline-flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                                                <button
                                                    onClick={() => handleDecrease(item.id, item.quantity)}
                                                    disabled={item.quantity <= 1}
                                                    className="px-3 py-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    aria-label="Diminuer la quantité"
                                                >
                                                    <span className="text-lg font-bold text-gray-600">−</span>
                                                </button>
                                                <span className="px-4 py-2 font-medium text-gray-900 min-w-[3rem] text-center border-x-2 border-gray-300">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleIncrease(item.id, item.quantity)}
                                                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                                    aria-label="Augmenter la quantité"
                                                >
                                                    <span className="text-lg font-bold text-gray-600">+</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Subtotal */}
                                        <div className="md:col-span-2 flex items-center justify-start md:justify-center">
                                            <span className="text-gray-900 font-bold text-lg">
                                                {formatPrice(item.price * item.quantity)}
                                            </span>
                                        </div>

                                        {/* Bouton Supprimer */}
                                        <div className="md:col-span-1 flex items-center justify-start md:justify-center">
                                            <button
                                                onClick={() => handleRemove(item.id, item.name)}
                                                className="p-2 text-amber-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                aria-label={`Supprimer ${item.name}`}
                                            >
                                                <FontAwesomeIcon icon={faTrash} className="text-xl" />
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        {/* Actions supplémentaires (Desktop) */}
                        <div className="mt-6 flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/"
                                className="flex-1 text-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Continuer les achats
                            </Link>
                            <button
                                onClick={handleClearCart}
                                className="flex-1 px-6 py-3 border-2 border-red-500 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors"
                            >
                                Vider le panier
                            </button>
                        </div>
                    </div>

                    {/* Section Cart Totals (Sidebar) */}
                    <div className="lg:col-span-1">
                        <div className="bg-amber-50 rounded-lg shadow-md p-6 sticky top-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Cart Totals
                            </h2>

                            {/* Subtotal */}
                            <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-300">
                                <span className="text-gray-700 font-medium">Subtotal</span>
                                <span className="text-gray-600">
                                    {formatPrice(subtotal)}
                                </span>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center pb-6 mb-6 border-b border-gray-300">
                                <span className="text-gray-900 font-bold text-lg">Total</span>
                                <span className="text-amber-600 font-bold text-2xl">
                                    {formatPrice(total)}
                                </span>
                            </div>

                            {/* Bouton Checkout */}
                            <Link
                                to="/checkout"
                                className="block w-full text-center bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
                            >
                                Check Out
                            </Link>

                            {/* Informations supplémentaires */}
                            <div className="mt-6 space-y-3">
                                <div className="flex items-start gap-2 text-sm text-gray-600">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Livraison gratuite à partir de 100.000 XOF</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm text-gray-600">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Paiement sécurisé</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm text-gray-600">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Retour gratuit sous 30 jours</span>
                                </div>
                            </div>
                        </div>

                        {/* Code Promo (Bonus) */}
                        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Code Promo
                            </h3>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Entrez votre code"
                                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                                <button className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                                    Appliquer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
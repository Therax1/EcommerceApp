import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faShoppingBag } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

/**
 * Composant CartPopUp - Panier latéral en overlay
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Contrôle l'affichage du popup
 * @param {Function} props.onClose - Fonction pour fermer le popup
 * 
 * @example
 * <CartPopUp isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
 */
export default function CartPopUp({ isOpen, onClose }) {
    // Récupération des données et fonctions du contexte global
    const { cartItems, removeFromCart, getCartTotal } = useCart()

    // Calculer le subtotal depuis le contexte
    const subtotal = getCartTotal()

    // Fonction pour supprimer un article
    const handleRemoveItem = (itemId) => {
        removeFromCart(itemId)
        console.log(`Article ${itemId} supprimé du panier`)
    }

    // Fonction pour formater le prix
    const formatPrice = (price) => {
        return `XOF. ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }

    return (
        <>
            {/* Overlay sombre (backdrop) */}
            <div 
                className={`fixed inset-0 bg-[#00000059] bg-opacity-50 z-40 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Panel du panier (slide depuis la droite) */}
            <div 
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] md:w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Header du panier */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Votre Panier
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close cart"
                    >
                        <FontAwesomeIcon icon={faTimes} className="w-5 h-5 text-gray-600" />
                    </button>
                </div>


                {/* Liste des articles
                Si le panier est vide, alors on affiche un message : Votre Panier est vide */}
                <div className="flex-1 overflow-y-auto px-6 py-4 max-h-[calc(100vh-300px)]">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <FontAwesomeIcon 
                                icon={faShoppingBag} 
                                className="w-16 h-16 text-gray-300 mb-4"
                            />
                            <p className="text-gray-500 text-lg">Votre Panier est vide</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <article 
                                    key={item.id}
                                    className="flex gap-4 items-start"
                                >
                                    {/* Image du produit */}
                                    <div className="w-20 h-20 flex-shrink-0 bg-amber-50 rounded-lg overflow-hidden">
                                        <img 
                                            src={item.image} 
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Détails du produit */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-900 truncate">
                                            {item.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-2 text-sm">
                                            <span className="text-gray-600">
                                                {item.quantity}
                                            </span>
                                            <span className="text-gray-400">x</span>
                                            <span className="text-amber-600 font-semibold">
                                                {formatPrice(item.price)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bouton supprimer */}
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-300 hover:bg-red-500 hover:text-white text-gray-600 flex items-center justify-center transition-colors"
                                        aria-label={`Remove ${item.name}`}
                                    >
                                        <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                                    </button>
                                </article>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer avec subtotal et boutons */}
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-5">
                    {/* Subtotal */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-900 font-medium">Subtotal</span>
                        <span className="text-amber-600 text-xl font-bold">
                            {formatPrice(subtotal)}
                        </span>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex gap-3">
                        <Link 
                            to="/cart"
                            onClick={onClose}
                            className="flex-1 py-2.5 border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-gray-900 hover:text-white transition-colors text-center"
                        >
                            Cart
                        </Link>
                        <Link 
                            to="/checkout"
                            onClick={onClose}
                            className="flex-1 py-2.5 border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-gray-900 hover:text-white transition-colors text-center"
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
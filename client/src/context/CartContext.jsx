import { createContext, useContext, useState } from 'react'

/**
 * Context pour gérer l'état global du panier
 * Permet de partager les données du panier entre tous les composants
 */
const CartContext = createContext()

/**
 * Hook personnalisé pour accéder au contexte du panier
 * @returns {Object} Contexte du panier avec items et fonctions
 */
export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart doit être utilisé à l\'intérieur d\'un CartProvider')
    }
    return context
}

/**
 * Provider du panier - Enveloppe l'application pour fournir l'état global
 * @param {Object} props
 * @param {React.ReactNode} props.children - Composants enfants
 */
export const CartProvider = ({ children }) => {
    // Panier initialement vide
    const [cartItems, setCartItems] = useState([])

    /**
     * Ajouter un article au panier
     * @param {Object} item - Article à ajouter (doit contenir id, name, price, image, quantity)
     */
    const addToCart = (item) => {
        setCartItems(prevItems => {
            // Vérifier si l'article existe déjà
            const existingItem = prevItems.find(i => i.id === item.id)
            
            if (existingItem) {
                // Si existe, augmenter la quantité avec la quantité fournie
                return prevItems.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                        : i
                )
            } else {
                // Sinon, ajouter le nouvel article avec sa quantité
                return [...prevItems, { ...item, quantity: item.quantity || 1 }]
            }
        })
    }

    /**
     * Supprimer un article du panier
     * @param {number} itemId - ID de l'article à supprimer
     */
    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId))
    }

    /**
     * Mettre à jour la quantité d'un article
     * @param {number} itemId - ID de l'article
     * @param {number} quantity - Nouvelle quantité
     */
    const updateQuantity = (itemId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(itemId)
            return
        }
        
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId
                    ? { ...item, quantity }
                    : item
            )
        )
    }

    /**
     * Vider complètement le panier
     */
    const clearCart = () => {
        setCartItems([])
    }

    /**
     * Calculer le nombre total d'articles dans le panier
     * @returns {number} Nombre total d'articles
     */
    const getCartCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0)
    }

    /**
     * Calculer le montant total du panier
     * @returns {number} Montant total
     */
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    // Valeurs exposées par le contexte
    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartTotal
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

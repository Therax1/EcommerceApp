import { useCart } from '../context/CartContext'

/**
 * Composant bouton "Ajouter au panier" réutilisable
 * 
 * @param {Object} props
 * @param {Object} props.product - Produit à ajouter (id, name, price, image)
 * @param {number} props.quantity - Quantité à ajouter (défaut: 1)
 * @param {string} props.className - Classes CSS personnalisées
 * @param {boolean} props.showNotification - Afficher une notification après ajout
 * @param {React.ReactNode} props.children - Contenu du bouton (défaut: "Add to Cart")
 * 
 * @example
 * <AddToCartButton product={product} quantity={2} />
 */
export default function AddToCartButton({ 
    product, 
    quantity = 1, 
    className = "", 
    showNotification = true,
    children = "Add to Cart"
}) {
    const { addToCart } = useCart()
    
    const handleClick = () => {
        if (!product || !product.id) {
            console.error('Product data is required')
            return
        }
        
        const productToAdd = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        }
        
        addToCart(productToAdd)
        
        if (showNotification) {
            alert(`${quantity} x ${product.name} ajouté(s) au panier !`)
        }
    }
    
    return (
        <button
            onClick={handleClick}
            className={`bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg active:scale-[0.98] ${className}`}
        >
            {children}
        </button>
    )
}

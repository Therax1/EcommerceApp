import { useState, useEffect } from 'react'
import { getAllProducts, searchProducts } from '../services/product.service'
import ProductCard from '../components/ProductCard'

/**
 * EXEMPLE D'INTÉGRATION BACKEND
 * 
 * Ce fichier montre comment utiliser les services API
 * pour récupérer des données du backend et gérer les états
 */

export default function ShopPage() {
    // États pour gérer les données et l'UI
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    
    // ========== RÉCUPÉRATION DES PRODUITS ==========
    useEffect(() => {
        fetchProducts()
    }, [page]) // Recharge quand la page change
    
    const fetchProducts = async () => {
        try {
            setLoading(true)
            setError(null)
            
            // Appel API via le service
            const response = await getAllProducts({
                page: page,
                limit: 12,
                sort: 'createdAt:desc'
            })
            
            // Mise à jour des états
            setProducts(response.products)
            setTotalPages(response.totalPages)
            
        } catch (err) {
            // Gestion des erreurs
            setError(err.message || 'Erreur lors du chargement des produits')
            console.error('Error fetching products:', err)
        } finally {
            setLoading(false)
        }
    }
    
    // ========== RECHERCHE DE PRODUITS ==========
    const handleSearch = async (e) => {
        e.preventDefault()
        
        if (!searchQuery.trim()) {
            fetchProducts() // Recharger tous les produits si recherche vide
            return
        }
        
        try {
            setLoading(true)
            setError(null)
            
            const response = await searchProducts(searchQuery, {
                page: 1,
                limit: 12
            })
            
            setProducts(response.products)
            setPage(1) // Reset à la page 1
            
        } catch (err) {
            setError(err.message || 'Erreur lors de la recherche')
        } finally {
            setLoading(false)
        }
    }
    
    // ========== PAGINATION ==========
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(prev => prev + 1)
        }
    }
    
    const handlePrevPage = () => {
        if (page > 1) {
            setPage(prev => prev - 1)
        }
    }
    
    // ========== RENDU CONDITIONNEL ==========
    
    // État de chargement
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement des produits...</p>
                </div>
            </div>
        )
    }
    
    // État d'erreur
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md p-6">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={fetchProducts}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        )
    }
    
    // État vide (pas de produits)
    if (products.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="text-gray-300 text-8xl mb-4">📦</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Aucun produit trouvé
                    </h2>
                    <p className="text-gray-600">
                        {searchQuery 
                            ? `Aucun résultat pour "${searchQuery}"` 
                            : 'Aucun produit disponible pour le moment'
                        }
                    </p>
                </div>
            </div>
        )
    }
    
    // ========== RENDU PRINCIPAL ==========
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Barre de recherche */}
                <div className="mb-8">
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Rechercher un produit..."
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                Rechercher
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* Grille de produits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={page === 1}
                        className="px-6 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Précédent
                    </button>
                    
                    <span className="text-gray-700 font-medium">
                        Page {page} sur {totalPages}
                    </span>
                    
                    <button
                        onClick={handleNextPage}
                        disabled={page === totalPages}
                        className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    )
}

/**
 * NOTES D'IMPLÉMENTATION :
 * 
 * 1. Ce composant utilise le service product.service.js
 * 2. Les états (loading, error, data) sont gérés proprement
 * 3. La pagination est fonctionnelle
 * 4. La recherche est intégrée
 * 5. Gestion complète des cas d'erreur
 * 
 * AVANT D'UTILISER :
 * - Configurer VITE_API_URL dans .env
 * - S'assurer que le backend répond sur /api/products
 * - Le backend doit retourner : { products: [...], totalPages: X }
 * 
 * FORMAT ATTENDU DU BACKEND :
 * {
 *   products: [
 *     {
 *       id: "1",
 *       name: "HP Victus",
 *       price: 300000,
 *       image: "url",
 *       description: "...",
 *       category: "laptops"
 *     },
 *     ...
 *   ],
 *   page: 1,
 *   totalPages: 5,
 *   totalProducts: 50
 * }
 */

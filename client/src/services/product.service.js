import apiClient, { extractData, handleApiError } from './api.service'
import { PRODUCT_ENDPOINTS } from '../config/api.config'

/**
 * Service pour gérer les appels API liés aux produits
 * Toutes les fonctions retournent des Promises
 */

/**
 * Récupérer tous les produits
 * @param {Object} params - Paramètres de pagination et filtrage
 * @returns {Promise<Array>}
 */
export const getAllProducts = async (params = {}) => {
  try {
    const response = await apiClient.get(PRODUCT_ENDPOINTS.GET_ALL, { params })
    return extractData(response)
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Récupérer un produit par son ID
 * @param {string} id - ID du produit
 * @returns {Promise<Object>}
 */
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(PRODUCT_ENDPOINTS.GET_BY_ID(id))
    return extractData(response)
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Rechercher des produits
 * @param {string} query - Terme de recherche
 * @param {Object} filters - Filtres additionnels (prix, catégorie, etc.)
 * @returns {Promise<Array>}
 */
export const searchProducts = async (query, filters = {}) => {
  try {
    const response = await apiClient.get(PRODUCT_ENDPOINTS.SEARCH, {
      params: { q: query, ...filters }
    })
    return extractData(response)
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Récupérer les produits d'une catégorie
 * @param {string} categoryId - ID de la catégorie
 * @returns {Promise<Array>}
 */
export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await apiClient.get(PRODUCT_ENDPOINTS.GET_BY_CATEGORY(categoryId))
    return extractData(response)
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Récupérer les produits connexes
 * @param {string} productId - ID du produit
 * @returns {Promise<Array>}
 */
export const getRelatedProducts = async (productId) => {
  try {
    const response = await apiClient.get(PRODUCT_ENDPOINTS.RELATED(productId))
    return extractData(response)
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Récupérer les produits mis en avant
 * @returns {Promise<Array>}
 */
export const getFeaturedProducts = async () => {
  try {
    const response = await apiClient.get(PRODUCT_ENDPOINTS.FEATURED)
    return extractData(response)
  } catch (error) {
    throw handleApiError(error)
  }
}

// ========== FONCTIONS ADMIN ==========

/**
 * Créer un nouveau produit (Admin)
 * @param {Object} productData - Données du produit
 * @returns {Promise<Object>}
 */
export const createProduct = async (productData) => {
  try {
    const response = await apiClient.post(PRODUCT_ENDPOINTS.CREATE, productData)
    return extractData(response)
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Mettre à jour un produit (Admin)
 * @param {string} id - ID du produit
 * @param {Object} updates - Données à mettre à jour
 * @returns {Promise<Object>}
 */
export const updateProduct = async (id, updates) => {
  try {
    const response = await apiClient.put(PRODUCT_ENDPOINTS.UPDATE(id), updates)
    return extractData(response)
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Supprimer un produit (Admin)
 * @param {string} id - ID du produit
 * @returns {Promise<void>}
 */
export const deleteProduct = async (id) => {
  try {
    await apiClient.delete(PRODUCT_ENDPOINTS.DELETE(id))
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Exemple d'utilisation dans un composant :
 * 
 * import { getAllProducts } from '../services/product.service'
 * 
 * const ProductList = () => {
 *   const [products, setProducts] = useState([])
 *   const [loading, setLoading] = useState(true)
 *   const [error, setError] = useState(null)
 * 
 *   useEffect(() => {
 *     const fetchProducts = async () => {
 *       try {
 *         const data = await getAllProducts({ page: 1, limit: 10 })
 *         setProducts(data)
 *       } catch (err) {
 *         setError(err.message)
 *       } finally {
 *         setLoading(false)
 *       }
 *     }
 *     
 *     fetchProducts()
 *   }, [])
 * 
 *   if (loading) return <div>Chargement...</div>
 *   if (error) return <div>Erreur: {error}</div>
 *   
 *   return (
 *     <div>
 *       {products.map(product => (
 *         <ProductCard key={product.id} product={product} />
 *       ))}
 *     </div>
 *   )
 * }
 */

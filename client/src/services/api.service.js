import axios from 'axios'
import { API_BASE_URL } from '../config/api.config'
import { AUTH_ROUTES } from '../routes/routes.config'

/**
 * Instance Axios configurée pour les appels API
 * Gère automatiquement les tokens, les erreurs et les redirections
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 secondes
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepteur pour ajouter le token à chaque requête
apiClient.interceptors.request.use(
  (config) => {
    // Récupérer le token depuis localStorage
    const token = localStorage.getItem('authToken')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercepteur pour gérer les erreurs de réponse
apiClient.interceptors.response.use(
  (response) => {
    // Si la réponse est OK, retourner les données
    return response
  },
  async (error) => {
    const originalRequest = error.config
    
    // Si erreur 401 (non autorisé) et ce n'est pas déjà une tentative de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        // Essayer de rafraîchir le token
        const refreshToken = localStorage.getItem('refreshToken')
        
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          })
          
          const { token } = response.data
          
          // Sauvegarder le nouveau token
          localStorage.setItem('authToken', token)
          
          // Réessayer la requête originale avec le nouveau token
          originalRequest.headers.Authorization = `Bearer ${token}`
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        // Si le refresh échoue, déconnecter l'utilisateur
        localStorage.removeItem('authToken')
        localStorage.removeItem('refreshToken')
        window.location.href = AUTH_ROUTES.LOGIN
        return Promise.reject(refreshError)
      }
    }
    
    // Si erreur 403 (interdit), rediriger vers page non autorisé
    if (error.response?.status === 403) {
      window.location.href = '/401'
    }
    
    // Si erreur 500 (serveur), rediriger vers page d'erreur
    if (error.response?.status >= 500) {
      // Optionnel : afficher une notification d'erreur
      console.error('Erreur serveur:', error.response.data)
    }
    
    return Promise.reject(error)
  }
)

/**
 * Helper pour extraire les données de la réponse
 */
export const extractData = (response) => response.data

/**
 * Helper pour gérer les erreurs
 */
export const handleApiError = (error) => {
  if (error.response) {
    // Erreur de réponse du serveur
    return {
      message: error.response.data.message || 'Une erreur est survenue',
      status: error.response.status,
      data: error.response.data,
    }
  } else if (error.request) {
    // Pas de réponse du serveur
    return {
      message: 'Impossible de contacter le serveur',
      status: 0,
    }
  } else {
    // Erreur lors de la configuration de la requête
    return {
      message: error.message || 'Une erreur est survenue',
      status: 0,
    }
  }
}

export default apiClient

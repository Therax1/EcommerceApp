import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    // Vérifier si l'utilisateur est déjà connecté au chargement
    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    // Fonction de connexion
    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:8000/api/auth/connexion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (response.ok) {
                // Stocker le token et l'utilisateur
                localStorage.setItem('token', data.access_token)
                localStorage.setItem('user', JSON.stringify(data.user))
                
                setToken(data.access_token)
                setUser(data.user)
                
                return { success: true, user: data.user }
            } else {
                return { 
                    success: false, 
                    error: data.detail || 'Email ou mot de passe incorrect' 
                }
            }
        } catch (error) {
            return { 
                success: false, 
                error: 'Impossible de se connecter au serveur' 
            }
        }
    }

    // Fonction d'inscription
    const register = async (nom_prenom, email, password) => {
        try {
            const response = await fetch('http://localhost:8000/api/auth/inscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nom_prenom, email, password })
            })

            const data = await response.json()

            if (response.ok) {
                // Après l'inscription, connecter automatiquement l'utilisateur
                return await login(email, password)
            } else {
                return { 
                    success: false, 
                    error: data.detail || 'Erreur lors de l\'inscription' 
                }
            }
        } catch (error) {
            return { 
                success: false, 
                error: 'Impossible de se connecter au serveur' 
            }
        }
    }

    // Fonction de déconnexion
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
        navigate('/connexion')
    }

    // Vérifier si l'utilisateur est authentifié
    const isAuthenticated = () => {
        return !!token && !!user
    }

    const value = {
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

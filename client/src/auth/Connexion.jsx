import AuthInput from '../components/AuthInput'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Connexion() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('http://localhost:8000/api/auth/connexion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user))
                alert(`Bienvenue ${data.user.nom_prenom} !`)
                navigate('/')
            } else {
                setError(data.detail || 'Email ou mot de passe incorrect')
            }
        } catch (err) {
            setError('Impossible de se connecter au serveur. Vérifiez que le backend est lancé.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <div className="w-full max-w-md">
                {/* Logo ou titre du site */}
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">WestAf</h1>
                    <p className="text-gray-600">E-Commerce</p>
                </div>

                {/* Formulaire de connexion */}
                <div className="bg-white border border-gray-300 rounded-lg p-8">
                    <h2 className="text-2xl font-normal mb-6">Se connecter</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold mb-1">
                                Email
                            </label>
                            <AuthInput
                                type="email"
                                name="email"
                                id="email"
                                placeholder=""
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Mot de passe */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-bold mb-1">
                                Mot de passe
                            </label>
                            <AuthInput 
                                type="password"
                                name="password"
                                id="password"
                                placeholder=""
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Mot de passe oublié */}
                        <div className="text-right">
                            <Link 
                                to="/mot-de-passe-oublie" 
                                className="text-sm text-blue-600 hover:text-amber-600 hover:underline"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>

                        {/* Bouton Se connecter */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 rounded-md text-sm font-medium transition-all duration-200 border border-amber-600 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Connexion...' : 'Se connecter'}
                        </button>
                    </form>
                </div>

                {/* Lien vers inscription */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Pas encore de compte ?{' '}
                        <Link 
                            to="/inscription" 
                            className="text-blue-600 hover:text-amber-600 hover:underline font-medium"
                        >
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </div>
        </div>        
    )
}
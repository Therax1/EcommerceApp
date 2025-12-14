import AuthInput from '../components/AuthInput'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Inscription() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nom_prenom: '',
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
            const response = await fetch('http://localhost:8000/api/auth/inscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.ok) {
                alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.')
                navigate('/connexion')
            } else {
                setError(data.detail || 'Une erreur est survenue')
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

                {/* Formulaire d'inscription */}
                <div className="bg-white border border-gray-300 rounded-lg p-8">
                    <h2 className="text-2xl font-normal mb-6">Créer un compte</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        {/* Nom et Prénoms */}
                        <div>
                            <label htmlFor="nom_prenom" className="block text-sm font-bold mb-1">
                                Nom et Prénoms
                            </label>
                            <AuthInput
                                type="text"
                                name="nom_prenom"
                                id="nom_prenom"
                                placeholder=""
                                value={formData.nom_prenom}
                                onChange={handleChange}
                                required
                            />
                        </div>

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
                            <p className="text-xs text-gray-600 mt-1">
                                Le mot de passe doit contenir au moins 6 caractères
                            </p>
                        </div>

                        {/* Bouton S'inscrire */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 rounded-md text-sm font-medium transition-all duration-200 border border-amber-600 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Création en cours...' : 'Créer votre compte'}
                        </button>

                        <p className="text-xs text-gray-600 mt-2">
                            En créant un compte, vous acceptez les{' '}
                            <a href="#" className="text-blue-600 hover:text-amber-600 hover:underline">
                                Conditions d'utilisation
                            </a>{' '}
                            et la{' '}
                            <a href="#" className="text-blue-600 hover:text-amber-600 hover:underline">
                                Politique de confidentialité
                            </a>{' '}
                            de WestAf.
                        </p>
                    </form>

                    {/* Séparateur */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">ou</span>
                        </div>
                    </div>

                    {/* Bouton Commander en tant qu'invité */}
                    <Link
                        to="/checkout"
                        className="block w-full py-2 bg-white hover:bg-gray-50 text-gray-900 rounded-md text-sm font-medium transition-all duration-200 border border-gray-300 text-center"
                    >
                        Commander en tant qu'invité
                    </Link>
                </div>

                {/* Lien vers connexion */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Déjà un compte ?{' '}
                        <Link 
                            to="/connexion" 
                            className="text-blue-600 hover:text-amber-600 hover:underline font-medium"
                        >
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </div>        
    )
}
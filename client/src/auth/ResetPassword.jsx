import AuthInput from '../components/AuthInput'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function ResetPassword() {
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email || ''
    const code = location.state?.code || ''
    
    const [formData, setFormData] = useState({
        new_password: '',
        confirm_password: ''
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    // Rediriger si pas d'email ou de code
    useEffect(() => {
        if (!email || !code) {
            navigate('/mot-de-passe-oublie')
        }
    }, [email, code, navigate])

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

        // Validation
        if (formData.new_password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères')
            return
        }

        if (formData.new_password !== formData.confirm_password) {
            setError('Les mots de passe ne correspondent pas')
            return
        }

        setLoading(true)

        try {
            const response = await fetch('http://localhost:8000/api/auth/reset-password', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    code,
                    new_password: formData.new_password
                })
            })

            const data = await response.json()

            if (response.ok) {
                setSuccess(true)
                // Rediriger vers la connexion après 2 secondes
                setTimeout(() => {
                    navigate('/connexion')
                }, 2000)
            } else {
                setError(data.detail || 'Erreur lors de la réinitialisation')
            }
        } catch (err) {
            setError('Impossible de se connecter au serveur')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-xl px-4">
            {/* Logo ou titre du site */}
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold text-gray-800 mb-2">WestAf</h1>
                <p className="text-gray-600 text-lg">E-Commerce</p>
            </div>

            {/* Formulaire */}
            <div className="bg-white border border-gray-300 rounded-lg p-10 shadow-md">
                <h2 className="text-3xl font-normal mb-4">Nouveau mot de passe</h2>
                <p className="text-gray-600 mb-8">
                    Créez un nouveau mot de passe sécurisé pour votre compte.
                </p>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
                        ✅ Mot de passe réinitialisé avec succès !
                        <br />
                        <span className="text-xs">Redirection vers la connexion...</span>
                    </div>
                )}

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    {/* Nouveau mot de passe */}
                    <div>
                        <label htmlFor="new_password" className="block text-sm font-bold mb-2">
                            Nouveau mot de passe
                        </label>
                        <AuthInput
                            type="password"
                            name="new_password"
                            id="new_password"
                            placeholder="Min. 6 caractères"
                            value={formData.new_password}
                            onChange={handleChange}
                            required
                            disabled={success}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Au moins 6 caractères
                        </p>
                    </div>

                    {/* Confirmer mot de passe */}
                    <div>
                        <label htmlFor="confirm_password" className="block text-sm font-bold mb-2">
                            Confirmer le mot de passe
                        </label>
                        <AuthInput
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            placeholder="Ressaisissez votre mot de passe"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            required
                            disabled={success}
                        />
                    </div>

                    {/* Bouton Réinitialiser */}
                    <button
                        type="submit"
                        disabled={loading || success}
                        className="w-full py-3 bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 rounded-md text-base font-medium transition-all duration-200 border border-amber-600 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Réinitialisation...' : success ? 'Réussi !' : 'Réinitialiser le mot de passe'}
                    </button>
                </form>

                {/* Lien retour connexion */}
                <div className="mt-6 text-center">
                    <Link 
                        to="/connexion" 
                        className="text-sm text-blue-600 hover:text-amber-600 hover:underline"
                    >
                        ← Retour à la connexion
                    </Link>
                </div>
            </div>
        </div>
    )
}

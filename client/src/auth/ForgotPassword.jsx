import AuthInput from '../components/AuthInput'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('http://localhost:8000/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            })

            const data = await response.json()

            if (response.ok) {
                setSuccess(true)
                // Rediriger vers la page de vérification après 2 secondes
                setTimeout(() => {
                    navigate('/verify-code', { state: { email } })
                }, 2000)
            } else {
                setError(data.detail || 'Une erreur est survenue')
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
                <h2 className="text-3xl font-normal mb-4">Mot de passe oublié ?</h2>
                <p className="text-gray-600 mb-8">
                    Entrez votre email et nous vous enverrons un code à 5 chiffres pour réinitialiser votre mot de passe.
                </p>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
                        ✅ Un code de vérification a été envoyé à votre email !
                        <br />
                        <span className="text-xs">Redirection en cours...</span>
                    </div>
                )}

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold mb-2">
                            Email
                        </label>
                        <AuthInput
                            type="email"
                            name="email"
                            id="email"
                            placeholder="votre@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={success}
                        />
                    </div>

                    {/* Bouton Envoyer */}
                    <button
                        type="submit"
                        disabled={loading || success}
                        className="w-full py-3 bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 rounded-md text-base font-medium transition-all duration-200 border border-amber-600 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Envoi en cours...' : success ? 'Code envoyé !' : 'Envoyer le code'}
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

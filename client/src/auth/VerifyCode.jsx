import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function VerifyCode() {
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email || ''
    
    const [code, setCode] = useState(['', '', '', '', ''])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // Rediriger si pas d'email
    useEffect(() => {
        if (!email) {
            navigate('/mot-de-passe-oublie')
        }
    }, [email, navigate])

    const handleChange = (index, value) => {
        // Ne garder que les chiffres
        if (value && !/^\d$/.test(value)) return

        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)
        setError('')

        // Auto-focus sur le prochain champ
        if (value && index < 4) {
            const nextInput = document.getElementById(`code-${index + 1}`)
            nextInput?.focus()
        }
    }

    const handleKeyDown = (index, e) => {
        // Gestion du backspace
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`)
            prevInput?.focus()
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').trim()
        
        // Vérifier que c'est 5 chiffres
        if (/^\d{5}$/.test(pastedData)) {
            const newCode = pastedData.split('')
            setCode(newCode)
            // Focus sur le dernier champ
            document.getElementById('code-4')?.focus()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const fullCode = code.join('')
        
        if (fullCode.length !== 5) {
            setError('Veuillez saisir le code complet à 5 chiffres')
            return
        }

        setError('')
        setLoading(true)

        try {
            const response = await fetch('http://localhost:8000/api/auth/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, code: fullCode })
            })

            const data = await response.json()

            if (response.ok) {
                // Rediriger vers la page de réinitialisation
                navigate('/reset-password', { state: { email, code: fullCode } })
            } else {
                setError(data.detail || 'Code invalide')
                setCode(['', '', '', '', ''])
                document.getElementById('code-0')?.focus()
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
                <h2 className="text-3xl font-normal mb-4">Vérification du code</h2>
                <p className="text-gray-600 mb-8">
                    Un code à 5 chiffres a été envoyé à <strong>{email}</strong>
                    <br />
                    <span className="text-sm">Le code expire dans 15 minutes</span>
                </p>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                        {error}
                    </div>
                )}

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    {/* Inputs pour le code à 5 chiffres */}
                    <div>
                        <label className="block text-sm font-bold mb-4 text-center">
                            Entrez le code reçu par email
                        </label>
                        <div className="flex justify-center gap-3">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`code-${index}`}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={index === 0 ? handlePaste : undefined}
                                    className="w-14 h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Bouton Vérifier */}
                    <button
                        type="submit"
                        disabled={loading || code.join('').length !== 5}
                        className="w-full py-3 bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 rounded-md text-base font-medium transition-all duration-200 border border-amber-600 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Vérification...' : 'Vérifier le code'}
                    </button>
                </form>

                {/* Lien renvoyer le code */}
                <div className="mt-6 text-center space-y-2">
                    <p className="text-sm text-gray-600">
                        Vous n'avez pas reçu le code ?{' '}
                        <button 
                            onClick={() => navigate('/mot-de-passe-oublie', { state: { email } })}
                            className="text-blue-600 hover:text-amber-600 hover:underline font-medium"
                        >
                            Renvoyer
                        </button>
                    </p>
                    <Link 
                        to="/connexion" 
                        className="block text-sm text-blue-600 hover:text-amber-600 hover:underline"
                    >
                        ← Retour à la connexion
                    </Link>
                </div>
            </div>
        </div>
    )
}

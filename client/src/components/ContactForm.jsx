import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faMapMarkerAlt, // faMapMarkerAlt : Icone pour l'adresse physique
    faPhone, // faPhone : Icone pour le téléphone
    faClock // faClock : Icone pour les horaires
} from '@fortawesome/free-solid-svg-icons'


/**
 * Composant ContactForm - Formulaire de contact avec informations de l'entreprise
 * 
 * Affiche un formulaire de contact avec validation côté client et les coordonnées
 * (adresse, téléphone, horaires)
 * 
 * @returns {JSX.Element} Section de contact complète
 */

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Gestion des changements dans les champs
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Nettoyer l'erreur du champ modifié
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    // Validation niveau client du formulaire
    const validate = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Le nom est requis'
        }

        if (!formData.email.trim()) {
            newErrors.email = "L'email est requis"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email invalide'
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Le message est requis'
        }

        return newErrors
    }

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault()
        
        const newErrors = validate()
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setIsSubmitting(true)

        // Simulation d'envoi 
        // TODO: Remplacer par un vrai appel API backend
        setTimeout(() => {
            console.log('Form submitted:', formData)
            alert('Message envoyé avec succès !')
            
            // Reset du formulaire
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            })
            setIsSubmitting(false)
        }, 1500)
    }

    return (
        <section className="w-full bg-white py-12 md:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* En-tête */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Entrez en Contact avec Nous
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Pour plus d'informations sur nos produits et services, n'hésitez pas à nous envoyer<br />
                        un email. Notre équipe est toujours là pour vous aider. N'hésitez pas !
                    </p>
                </div>

                {/* Contenu principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Colonne gauche - Informations de contact */}
                    <div className="space-y-8">
                        {/* Adresse */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon 
                                    icon={faMapMarkerAlt} 
                                    className="text-gray-900 text-xl"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Adresse
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    236 5th SE Avenue, New<br />
                                    York NY10000, États-<br />
                                    Unis
                                </p>
                            </div>
                        </div>

                        {/* Téléphone */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon 
                                    icon={faPhone} 
                                    className="text-gray-900 text-xl"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Téléphone
                                </h3>
                                <p className="text-gray-600">
                                    Mobile : +(84) 546-6789<br />
                                    Ligne directe : +(84) 456-6789
                                </p>
                            </div>
                        </div>

                        {/* Horaires */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon 
                                    icon={faClock} 
                                    className="text-gray-900 text-xl"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Horaires d'Ouverture
                                </h3>
                                <p className="text-gray-600">
                                    Lundi-Vendredi : 9h00 -<br />
                                    22h00<br />
                                    Samedi-Dimanche : 9h00 -<br />
                                    21h00
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Colonne droite - Formulaire */}
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Nom */}
                            <div>
                                <label 
                                    htmlFor="name" 
                                    className="block text-gray-900 font-medium mb-2"
                                >
                                    Votre nom
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Jean Dupont"
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                        errors.name 
                                            ? 'border-red-500 focus:ring-red-500' 
                                            : 'border-gray-300 focus:ring-amber-500'
                                    }`}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label 
                                    htmlFor="email" 
                                    className="block text-gray-900 font-medium mb-2"
                                >
                                    Adresse email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="exemple@email.com"
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                        errors.email 
                                            ? 'border-red-500 focus:ring-red-500' 
                                            : 'border-gray-300 focus:ring-amber-500'
                                    }`}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>

                            {/* Sujet */}
                            <div>
                                <label 
                                    htmlFor="subject" 
                                    className="block text-gray-900 font-medium mb-2"
                                >
                                    Sujet
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Facultatif"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label 
                                    htmlFor="message" 
                                    className="block text-gray-900 font-medium mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Bonjour ! J'aimerais en savoir plus sur..."
                                    rows="5"
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                                        errors.message 
                                            ? 'border-red-500 focus:ring-red-500' 
                                            : 'border-gray-300 focus:ring-amber-500'
                                    }`}
                                />
                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                                )}
                            </div>

                            {/* Bouton Submit */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full md:w-auto px-12 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-all duration-200 ${
                                        isSubmitting 
                                            ? 'opacity-50 cursor-not-allowed' 
                                            : 'hover:shadow-lg active:scale-[0.98]'
                                    }`}
                                >
                                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
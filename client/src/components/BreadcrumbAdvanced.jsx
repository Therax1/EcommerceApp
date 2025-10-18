import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons'

/**
 * Composant Breadcrumb (Fil d'Ariane) avec labels personnalisables
 * 
 * @param {Object} props
 * @param {Object} props.customLabels - Objet pour personnaliser les noms affichés
 * @param {string} props.className - Classes CSS additionnelles
 * 
 * @example
 * <Breadcrumb customLabels={{ product: "Produit", connexion: "Se connecter" }} />
 */
export default function BreadcrumbAdvanced({ customLabels = {}, className = "" }) {
    const location = useLocation()

    // Labels par défaut pour les routes courantes
    const defaultLabels = {
        shop: "Shop",
        product: "Product",
        connexion: "Connexion",
        inscription: "Inscription",
        about: "About",
        contact: "Contact",
        cart: "Cart",
        checkout: "Checkout",
        ...customLabels // Les labels personnalisés écrasent les défauts
    }

    // Divise le chemin en segments
    const pathSegments = location.pathname
        .split('/')
        .filter(segment => segment !== '')

    // Fonction pour obtenir le label à afficher
    const getLabel = (segment) => {
        // Cherche d'abord dans les labels personnalisés/défauts
        if (defaultLabels[segment.toLowerCase()]) {
            return defaultLabels[segment.toLowerCase()]
        }
        // Sinon, formate le segment (capitalize + remplace tirets)
        return segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    }

    // Construit le chemin complet jusqu'à un index
    const buildPath = (index) => {
        return '/' + pathSegments.slice(0, index + 1).join('/')
    }

    return (
        <nav 
            aria-label="Breadcrumb navigation" 
            className={`bg-gradient-to-r from-gray-50 to-gray-100 py-8 px-4 border-b border-gray-200 ${className}`}
        >
            <div className="max-w-7xl mx-auto">
                <ol className="flex items-center flex-wrap gap-2 text-sm md:text-base">
                    {/* Lien Home */}
                    <li className="flex items-center gap-2">
                        <Link 
                            to="/" 
                            className="group flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white transition-all duration-200"
                            aria-label="Go to homepage"
                        >
                            <FontAwesomeIcon 
                                icon={faHome} 
                                className="w-4 h-4 text-gray-500 group-hover:text-amber-600 transition-colors" 
                            />
                            <span className="text-gray-600 group-hover:text-amber-600 font-medium transition-colors">
                                Home
                            </span>
                        </Link>
                        {pathSegments.length > 0 && (
                            <FontAwesomeIcon 
                                icon={faChevronRight} 
                                className="text-gray-300 w-3 h-3" 
                            />
                        )}
                    </li>

                    {/* Segments du chemin */}
                    {pathSegments.map((segment, index) => {
                        const isLast = index === pathSegments.length - 1
                        const path = buildPath(index)
                        const label = getLabel(segment)

                        return (
                            <li key={path} className="flex items-center gap-2">
                                {isLast ? (
                                    // Page actuelle (pas de lien)
                                    <span 
                                        className="px-3 py-1.5 bg-amber-50 text-amber-700 font-semibold rounded-lg"
                                        aria-current="page"
                                    >
                                        {label}
                                    </span>
                                ) : (
                                    // Page intermédiaire (avec lien)
                                    <>
                                        <Link 
                                            to={path}
                                            className="px-3 py-1.5 text-gray-600 hover:text-amber-600 hover:bg-white font-medium rounded-lg transition-all duration-200"
                                        >
                                            {label}
                                        </Link>
                                        <FontAwesomeIcon 
                                            icon={faChevronRight} 
                                            className="text-gray-300 w-3 h-3" 
                                        />
                                    </>
                                )}
                            </li>
                        )
                    })}
                </ol>
            </div>
        </nav>
    )
}

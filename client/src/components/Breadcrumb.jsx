import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons'

/**
 * Fil d'Ariane qui affiche le chemin de navigation à partir de l'URL courante.
 *
 * - Affiche toujours un lien pour l'accueil puis chaque segment de l'URL (les segments intermédiaires sont cliquables, le dernier est du texte simple).
 * - Accessibilité: <nav aria-label="Breadcrumb"> et liste ordonnée.
 * - Style avec Tailwind CSS (espacements, couleurs, responsive).
 *
 * @returns {JSX.Element} Fil d'Ariane correspondant à la route active.
 * @example
 * 
 * <Breadcrumb />
 */

export default function Breadcrumb() {
    // Récupération de l'URL actuelle
    const location = useLocation()

    // Retourne un tableau de segments de chemin (String) et filtre les vides
    const pathSegments = location.pathname
        .split('/')
        .filter(segment => segment !== '')


    // Fonction pour formater le nom affiché (Première lettre en majuscule)
    const formatName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    // Fonction pour construire le chemin complet jusqu'à un segment
    // Pour l'utilisation dans les liens générés
    const buildPath = (index) => {
        return '/' + pathSegments.slice(0, index + 1).join('/')
    }

    return (
        <nav 
            aria-label="Breadcrumb" 
            className="bg-gray-50 py-6 px-4"
        >
            <div className="max-w-7xl mx-auto">
                <ol className="flex items-center flex-wrap gap-2 text-sm md:text-base">
                    {/* Lien vers l'accueil (toujours présent) */}
                    <li className="flex items-center gap-2">
                        <Link 
                            to="/" 
                            className="text-gray-600 hover:text-amber-600 transition-colors flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
                            <span>Home</span>
                        </Link>
                        {pathSegments.length > 0 && (
                            <FontAwesomeIcon 
                                icon={faChevronRight} 
                                className="text-gray-400 w-3 h-3" 
                            />
                        )}
                    </li>

                    {/* Génération dynamique des segments du chemin */}
                    {pathSegments.map((segment, index) => {
                        const isLast = index === pathSegments.length - 1
                        const path = buildPath(index)

                        return (
                            <li key={path} className="flex items-center gap-2">
                                {/* Si c'est le dernier segment, pas de lien (car c'est la page actuelle) */}
                                {isLast ? (
                                    <span className="text-gray-900 font-semibold">
                                        {formatName(segment)}
                                    </span>
                                ) : (
                                    <>
                                        <Link 
                                            to={path}
                                            className="text-gray-600 hover:text-amber-600 transition-colors"
                                        >
                                            {formatName(segment)}
                                        </Link>
                                        <FontAwesomeIcon 
                                            icon={faChevronRight} 
                                            className="text-gray-400 w-3 h-3" 
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
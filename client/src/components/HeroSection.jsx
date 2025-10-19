import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Categorie1 from '../assets/img/Categories/Categorie1.jpg'
import Categorie2 from '../assets/img/Categories/Categorie2.jpg'
import Categorie3 from '../assets/img/Categories/Categorie3.jpg'
import Categorie4 from '../assets/img/Categories/Categorie4.jpg'
import Product1 from '../assets/img/Products/product1.jpg'
import Product2 from '../assets/img/Products/product2.jpg'
import Product3 from '../assets/img/Products/product3.jpg'
import Product4 from '../assets/img/Products/product4.jpg'
import Product5 from '../assets/img/Products/product5.jpg'
import Product6 from '../assets/img/Products/product6.jpg'
import Product7 from '../assets/img/Products/product7.jpg'
import Product8 from '../assets/img/Products/product8.jpg'

/**
 * Hero Section avec carousel d'images de fond et cartes de catégories
 * Inspiré du design Amazon avec un carousel automatique et navigation manuelle
 * 
 * @returns {JSX.Element} Section hero avec carousel et cartes
 */
export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0)

    // Images du carousel
    const carouselImages = [
        Categorie1,
        Categorie2,
        Categorie3,
        Categorie4
    ]

    // Catégories avec leurs images et liens
    const categories = [
        {
            id: 2,
            title: "Achetez de la mode à moindre coût",
            items: [
                { name: "Jeans à moins de 50 $", image: Product1, link: "/jeans" },
                { name: "Hauts à moins de 25 $", image: Product2, link: "/tops" },
                { name: "Robes à moins de 30 $", image: Product3, link: "/dresses" },
                { name: "Chaussures à moins de 50 $", image: Product4, link: "/shoes" }
            ],
            link: "/fashion",
            linkText: "Voir toutes les offres"
        },
        {
            id: 3,
            title: "Achetez vos essentiels pour la maison",
            items: [
                { name: "Outils de nettoyage", image: Product5, link: "/cleaning" },
                { name: "Rangement", image: Product6, link: "/storage" },
                { name: "Décoration", image: Product7, link: "/decor" },
                { name: "Literie", image: Product8, link: "/bedding" }
            ],
            link: "/home",
            linkText: "Découvrez plus dans la maison"
        }
    ]

    // Boucle du carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
        }, 4500)

        return () => clearInterval(timer)
    }, [carouselImages.length])

    {/* 
        // Navigation manuelle
        const nextSlide = () => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
        }
    
        const prevSlide = () => {
            setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
        } 
    */}

    return (
        <section className="bg-gray-100 relative w-full">
            {/* Carousel d'images de fond */}
            <div className=" relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-b from-gray-100 to-white">
                {/* Images */}
                <div className="relative h-full">
                    {carouselImages.map((image, index) => (
                        <Link
                            to="#"
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                                index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient overlay pour améliorer la lisibilité des cartes */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90" />
                        </Link>
                    ))}
                </div>

                {/* 
                Boutons de navigation (Omis pour l'instant)
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 w-12 h-12 rounded-full shadow-lg transition-all hover:scale-110"
                    aria-label="Previous slide"
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 w-12 h-12 rounded-full shadow-lg transition-all hover:scale-110"
                    aria-label="Next slide"
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button> */}
            </div>

            {/* Cartes de catégories par-dessus le carousel */}
            <div className="relative  -mt-32 md:-mt-40 lg:-mt-48 z-20 pb-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid justify-center grid-cols-1 sm:grid-cols-2 gap-6">
                        {categories.map((category) => (
                            <article
                                key={category.id}
                                className="bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
                            >
                                {/* Titre de la catégorie */}
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {category.title}
                                </h3>

                                {/* Contenu de la carte */}
                                {category.items ? (
                                    // Grille de 4 items
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        {category.items.map((item, idx) => (
                                            <Link
                                                key={idx}
                                                to={item.link}
                                                className="group"
                                            >
                                                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-700 group-hover:text-amber-600 transition-colors">
                                                    {item.name}
                                                </p>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    // Image unique
                                    <div className="mb-4 rounded-lg overflow-hidden">
                                        <img
                                            src={category.image}
                                            alt={category.title}
                                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}

                                {/* Lien "See more" */}
                                <Link
                                    to={category.link}
                                    className="text-sm text-blue-600 hover:text-amber-600 hover:underline font-medium transition-colors"
                                >
                                    {category.linkText}
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
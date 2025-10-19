import { Link } from 'react-router-dom'
import Product9 from '../assets/img/Products/product9.jpg'
import Product10 from '../assets/img/Products/product10.jpg'
import Product11 from '../assets/img/Products/product11.jpg'
import Product12 from '../assets/img/Products/product12.jpg'
import Product13 from '../assets/img/Products/product13.jpg'
import Product14 from '../assets/img/Products/product14.jpg'
import Product15 from '../assets/img/Products/product15.jpg'
import Product16 from '../assets/img/Products/product16.jpg'
import Product17 from '../assets/img/Products/product17.jpg'
import Product18 from '../assets/img/Products/product18.jpg'
import Product19 from '../assets/img/Products/product19.jpg'
import Product20 from '../assets/img/Products/product20.jpg'
import Product21 from '../assets/img/Products/product21.jpg'
import Product22 from '../assets/img/Products/product22.jpg'
import Product23 from '../assets/img/Products/product23.jpg'
import Product24 from '../assets/img/Products/product24.jpg'

/**
 * Composant OurCategories - Affiche des cartes de catégories avec grilles d'items
 * Inspiré du design Amazon avec des cartes blanches et des grilles 2×2
 * 
 * @returns {JSX.Element} Section de catégories avec cartes et liens
 */
export default function OurCategories() {
    
    // Données des catégories avec leurs items
    const categories = [
        {
            id: 1,
            title: "Gaming merchandise",
            items: [
                { name: "Apparel", image: Product9, link: "/gaming/apparel" },
                { name: "Hats", image: Product10, link: "/gaming/hats" },
                { name: "Action figures", image: Product11, link: "/gaming/figures" },
                { name: "Mugs", image: Product12, link: "/gaming/mugs" }
            ],
            link: "/gaming",
            linkText: "See more"
        },
        {
            id: 2,
            title: "Wireless Tech",
            items: [
                { name: "Smartphones", image: Product13, link: "/tech/smartphones" },
                { name: "Watches", image: Product14, link: "/tech/watches" },
                { name: "Headphones", image: Product15, link: "/tech/headphones" },
                { name: "Tablets", image: Product16, link: "/tech/tablets" }
            ],
            link: "/tech",
            linkText: "Discover more"
        },
        {
            id: 3,
            title: "Toys for all ages",
            items: [
                { name: "Ride on's", image: Product17, link: "/toys/ride-ons" },
                { name: "Building & construction", image: Product18, link: "/toys/building" },
                { name: "Dolls & Doll Houses", image: Product19, link: "/toys/dolls" },
                { name: "Swimming pools", image: Product20, link: "/toys/pools" }
            ],
            link: "/toys",
            linkText: "See all"
        },
        {
            id: 4,
            title: "Have more fun with family",
            items: [
                { name: "Outdoor Play Sets", image: Product21, link: "/family/outdoor" },
                { name: "Learning Toys", image: Product22, link: "/family/learning" },
                { name: "Action Figures", image: Product23, link: "/family/figures" },
                { name: "Pretend Play Toys", image: Product24, link: "/family/pretend" }
            ],
            link: "/family",
            linkText: "See more"
        }
    ]

    return(
        <section className="w-full bg-gray-100 py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Grille de catégories */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <article
                            key={category.id}
                            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-5"
                        >
                            {/* Titre de la catégorie */}
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                {category.title}
                            </h3>

                            {/* Grille 2×2 des items */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {category.items.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        to={item.link}
                                        className="group"
                                    >
                                        {/* Image de l'item */}
                                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        {/* Nom de l'item */}
                                        <p className="text-xs text-gray-700 group-hover:text-amber-600 transition-colors font-medium">
                                            {item.name}
                                        </p>
                                    </Link>
                                ))}
                            </div>

                            {/* Lien "See more" */}
                            <Link
                                to={category.link}
                                className="inline-block text-sm text-blue-600 hover:text-amber-600 hover:underline font-medium transition-colors"
                            >
                                {category.linkText}
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
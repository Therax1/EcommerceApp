import RelatedProductOne from '../assets/img/ProductCard/RelatedProduct_One.jpg'
import RelatedProductTwo from '../assets/img/ProductCard/RelatedProduct_Two.jpg'
import RelatedProductThree from '../assets/img/ProductCard/RelatedProduct_Three.jpg'
import RelatedProductFour from '../assets/img/ProductCard/RelatedProduct_Four.jpg'

export default function RelatedProductSection() {
    // Données des produits connexes
    const relatedProducts = [
        {
            id: 1,
            name: "Syltherine",
            description: "Stylish cafe chair",
            price: "XOF 2.500.000",
            oldPrice: "XOF 3.500.000",
            image: RelatedProductOne,
            discount: "-30%",
            badge: "discount"
        },
        {
            id: 2,
            name: "Leviosa",
            description: "Stylish cafe chair",
            price: "XOF 2.500.000",
            oldPrice: null,
            image: RelatedProductTwo,
            discount: null,
            badge: null
        },
        {
            id: 3,
            name: "Lolito",
            description: "Luxury big sofa",
            price: "XOF 7.000.000",
            oldPrice: "XOF 14.000.000",
            image: RelatedProductThree,
            discount: "-50%",
            badge: "discount"
        },
        {
            id: 4,
            name: "Respira",
            description: "Outdoor bar table and stool",
            price: "XOF 500.000",
            oldPrice: null,
            image: RelatedProductFour,
            discount: null,
            badge: "new"
        }
    ]

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16">
            {/* Titre de la section */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Related Products
                </h2>
            </div>

            {/* Grille de produits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {relatedProducts.map((product) => (
                    <article 
                        key={product.id}
                        className="group bg-gray-50 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        {/* Container Image avec Badge */}
                        <div className="relative overflow-hidden bg-gray-200 aspect-square">
                            {/* Image du produit */}
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />

                            {/* Badge de promotion ou New */}
                            {product.badge && (
                                <div className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-semibold ${
                                    product.badge === 'discount' 
                                        ? 'bg-red-500' 
                                        : 'bg-teal-500'
                                }`}>
                                    {product.badge === 'discount' ? product.discount : 'New'}
                                </div>
                            )}

                            {/* Overlay au hover avec boutons */}
                            <div className="absolute inset-0 backdrop-blur-xs bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <div className="space-y-3">
                                    <button className="w-full px-8 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-colors">
                                        Add to cart
                                    </button>
                                    <div className="flex items-center justify-center gap-4 text-white text-sm">
                                        <button className="hover:text-amber-400 transition-colors flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                            </svg>
                                            Share
                                        </button>
                                        <button className="hover:text-amber-400 transition-colors flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            Like
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Informations du produit */}
                        <div className="p-4 space-y-2">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900">
                                {product.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {product.description}
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                                <span className="text-lg font-semibold text-gray-900">
                                    {product.price}
                                </span>
                                {product.oldPrice && (
                                    <span className="text-sm text-gray-400 line-through">
                                        {product.oldPrice}
                                    </span>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Button Show More */}
            {/* <div className="text-center mt-10">
                <button className="px-12 py-3 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-semibold rounded-lg transition-colors duration-200">
                    Show More
                </button>
            </div> */}
        </section>
    )
}

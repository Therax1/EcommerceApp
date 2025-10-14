import { useState } from "react"
import VictusImageFive from '../assets/img/ProductCard/VictusImageTwo.jpg'
import VictusImageThree from '../assets/img/ProductCard/VictusImageThree.jpg'

export default function ProductAddtionnalInfos(){
    const [activeTab, setActiveTab] = useState('description')

    const tabs = [
        { id: 'description', label: 'Description' },
        { id: 'additional', label: 'Additional Information' },
        { id: 'reviews', label: 'Reviews [5]' }
    ]

    return(
        <section className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16">
            {/* Onglets de navigation */}
            <div className="border-b border-gray-200">
                <nav className="flex flex-wrap gap-4 md:gap-8 justify-center" aria-label="Product information tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 px-2 font-medium text-sm md:text-base transition-colors relative ${
                                activeTab === tab.id
                                    ? 'text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Contenu des onglets */}
            <article className="py-8 md:py-12">
                {/* Tab Description */}
                {activeTab === 'description' && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p className="text-sm md:text-base">
                                Embodying the raw, wayward spirit of rock 'n' roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
                            </p>
                            <p className="text-sm md:text-base">
                                Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.
                            </p>
                        </div>

                        {/* Images de produit */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div className="bg-amber-50 rounded-xl overflow-hidden">
                                <img 
                                    src={VictusImageFive}
                                    alt="Product view 1" 
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="bg-amber-50 rounded-xl overflow-hidden">
                                <img 
                                    src={VictusImageThree}
                                    alt="Product view 2" 
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab Additional Information */}
                {activeTab === 'additional' && (
                    <div className="animate-fadeIn">
                        <div className="max-w-3xl">
                            <dl className="divide-y divide-gray-200">
                                <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <dt className="font-medium text-gray-900">Weight</dt>
                                    <dd className="text-gray-700 md:col-span-2">3.2 kg</dd>
                                </div>
                                <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <dt className="font-medium text-gray-900">Dimensions</dt>
                                    <dd className="text-gray-700 md:col-span-2">24 x 16 x 8 cm</dd>
                                </div>
                                <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <dt className="font-medium text-gray-900">Materials</dt>
                                    <dd className="text-gray-700 md:col-span-2">Premium leather, Vintage-style hardware</dd>
                                </div>
                                <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <dt className="font-medium text-gray-900">Color</dt>
                                    <dd className="text-gray-700 md:col-span-2">Black, Gold accents</dd>
                                </div>
                                <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <dt className="font-medium text-gray-900">Warranty</dt>
                                    <dd className="text-gray-700 md:col-span-2">2 years manufacturer warranty</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                )}

                {/* Tab Reviews */}
                {activeTab === 'reviews' && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                            <button className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors">
                                Write a Review
                            </button>
                        </div>

                        {/* Liste des avis */}
                        <div className="space-y-6 divide-y divide-gray-200">
                            {[1, 2, 3, 4, 5].map((review) => (
                                <div key={review} className="pt-6 first:pt-0">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                                                <span className="text-amber-600 font-semibold">JD</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center justify-between flex-wrap gap-2">
                                                <h4 className="font-medium text-gray-900">John Doe</h4>
                                                <span className="text-sm text-gray-500">2 days ago</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <p className="text-gray-700 text-sm md:text-base">
                                                Excellent product! The sound quality is amazing and the design is beautiful. Highly recommended for music lovers.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bouton Load More */}
                        <div className="text-center pt-6">
                            <button className="px-8 py-3 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-medium rounded-lg transition-colors">
                                Load More Reviews
                            </button>
                        </div>
                    </div>
                )}
            </article>
        </section>
    )
}
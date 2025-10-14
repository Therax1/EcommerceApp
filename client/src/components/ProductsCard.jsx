import Victus_FirstPhoto from '../assets/img/ProductCard/VictusImageOne.jpg'
import Victus_SecondPhoto from '../assets/img/ProductCard/VictusImageTwo.jpg'
import Victus_ThirdPhoto from '../assets/img/ProductCard/VictusImageThree.jpg'
import Victus_FourthPhoto from '../assets/img/ProductCard/VictusImageFour.jpg'
import Stars from '../assets/img/ProductCard/stars.png'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

export default function ProductsCard(){
    return(
        <section className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Section Images du Produit */}
                <article className="flex-1 lg:max-w-xl">
                    <div className="flex flex-col-reverse md:flex-row gap-4">
                        {/* Miniatures des images */}
                        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
                            <img 
                                src={Victus_FirstPhoto} 
                                alt="Photo du produit 1" 
                                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity border-2 border-gray-300 hover:border-amber-500 flex-shrink-0"
                            />
                            <img 
                                src={Victus_SecondPhoto} 
                                alt="Photo du produit 2" 
                                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity border-2 border-transparent hover:border-amber-500 flex-shrink-0"
                            />
                            <img 
                                src={Victus_ThirdPhoto} 
                                alt="Photo du produit 3" 
                                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity border-2 border-transparent hover:border-amber-500 flex-shrink-0"
                            />
                            <img 
                                src={Victus_FourthPhoto} 
                                alt="Photo du produit 4" 
                                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity border-2 border-transparent hover:border-amber-500 flex-shrink-0"
                            />
                        </div>
                        
                        {/* Image principale */}
                        <div className="flex-1">
                            <img 
                                src={Victus_FirstPhoto} 
                                alt="Aperçu du produit" 
                                className="w-full h-auto rounded-xl shadow-lg object-cover max-h-[500px]"
                            />
                        </div>
                    </div>
                </article>

                {/* Section Détails du Produit */}
                <article className="flex-1 lg:max-w-xl">
                    <div className="flex flex-col gap-6">
                        {/* En-tête du produit */}
                        <div className="space-y-3">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                                Product Title
                            </h2>
                            <span className="text-2xl md:text-3xl font-semibold text-amber-600">
                                150.000 XOF
                            </span>
                            
                            {/* Évaluation */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <img 
                                    src={Stars} 
                                    alt="Étoiles d'évaluation" 
                                    className="h-5 w-auto"
                                />
                                <span className="text-sm md:text-base text-gray-600">
                                    4.5 (20 Reviews)
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                            Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.
                        </p>

                        {/* Sélection de quantité et Ajout au panier */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                            {/* Compteur de quantité */}
                            <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden w-full sm:w-auto">
                                <button 
                                    className="px-4 py-3 hover:bg-gray-100 transition-colors active:bg-gray-200"
                                    aria-label="Diminuer la quantité"
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} className="text-gray-600" />
                                </button>
                                <p className="px-6 py-3 font-medium text-gray-900 min-w-[3rem] text-center border-x-2 border-gray-300">
                                    1
                                </p>
                                <button 
                                    className="px-4 py-3 hover:bg-gray-100 transition-colors active:bg-gray-200"
                                    aria-label="Augmenter la quantité"
                                >
                                    <FontAwesomeIcon icon={faChevronRight} className="text-gray-600" />
                                </button>
                            </div>

                            {/* Bouton Ajouter au panier */}
                            <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg active:scale-[0.98] text-sm md:text-base">
                                Add to Cart
                            </button>
                        </div>

                        {/* Métadonnées du produit */}
                        <div className="border-t border-gray-200 pt-6 mt-4">
                            <ul className="space-y-3 text-sm md:text-base">
                                <li className="flex flex-wrap items-center gap-2">
                                    <span className="font-medium text-gray-900">Tags :</span>
                                    <span className="text-gray-600">PC, Laptop</span>
                                </li>
                                <li className="flex flex-wrap items-center gap-2">
                                    <span className="font-medium text-gray-900">Share :</span>
                                    <a 
                                        href="#" 
                                        className="text-blue-600 hover:text-blue-700 underline transition-colors"
                                        rel='noopener noreferrer'
                                    >
                                        <FontAwesomeIcon icon={faFacebook}/>
                                    </a>
                                    <a 
                                        href="#" 
                                        className="text-red-600 hover:text-red-700 underline transition-colors"
                                        rel='noopener noreferrer'
                                    >
                                        <FontAwesomeIcon icon={faInstagram}/>
                                    </a>
                                    <a 
                                        href="#" 
                                        className="text-green-600 hover:text-green-700 underline transition-colors"
                                        rel='noopener noreferrer'
                                    >
                                        <FontAwesomeIcon icon={faWhatsapp}/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    )
}
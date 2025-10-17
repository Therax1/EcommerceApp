import { faBars, faTimes, faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { useState } from "react"
import CartPopUp from "./CartPopUp"

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const toggleCart = () => setIsCartOpen(!isCartOpen)

    return(
        <nav className="bg-[#10121a] shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-2">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link 
                            to="/" 
                            aria-label="Homepage"
                            className="hidden md:block text-2xl font-bold text-white"
                        >
                            Chez Diallo
                        </Link>
                    </div>

                    {/* Search Button/Bar */}
                    <div className="relative w-[75%]">         
                        <div className="flex w-full h-full items-center gap-0 bg-gray-100 rounded-lg overflow-hidden">
                            <input 
                                type="search" 
                                placeholder="Search..."
                                className="bg-gray-10 px-4 w-[95%] outline-none  h-11 placeholder-gray-500 "
                                autoFocus
                            />
                            <button 
                                type="submit"
                                className="bg-amber-400 mx-auto grow h-12 p-3 text-black outline-none cursor-pointer focus:ring-2 focus:ring-amber hover:bg-amber-500 font-medium transition-colors"
                            >
                                <FontAwesomeIcon className=" text-xl" icon={faSearch} />
                            </button>
                        </div>
                    </div>

                    {/* Cart Icon */}
                        <button 
                            onClick={toggleCart}
                            aria-label="Open shopping cart"
                            className="p-2 text-white text-3xl hidden md:block hover:text-amber-400 transition-colors relative"
                        >
                            <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
                            {/* Badge optionnel pour afficher le nombre d'articles */}
                            <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                2
                            </span>
                        </button>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-3">
                        <button 
                            onClick={toggleCart}
                            aria-label="Open shopping cart"
                            className="p-2 text-white text-3xl hover:text-amber-400 transition-colors relative"
                        >
                            <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
                            {/* Badge pour mobile */}
                            <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                2
                            </span>
                        </button>
                        <button
                            onClick={toggleMenu}
                            className="p-2 text-white "
                            aria-label="Toggle menu"
                        >
                            <FontAwesomeIcon 
                                icon={isMenuOpen ? faTimes : faBars} 
                                className="w-6 h-6 text-3xl"
                            />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div 
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <ul className="pb-4 space-y-2 text-white">
                        <li>
                            <Link 
                                to={"/"}
                                className="block px-4 py-2 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/products"
                                className="block px-4 py-2 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                            >
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/about" 
                                className="block px-4 py-2 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/contact" 
                                className="block px-4 py-2 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                            >
                                Contact
                            </Link>
                        </li>
                        
                        <li className="pt-2 border-t flex flex-col items-start border-gray-200">
                            <Link
                                to="/inscription"
                                className="block px-4 py-2 rounded-lg bg-gray-500 font-semibold"
                            >
                                Inscription
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Cart Popup */}
            <CartPopUp 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)}
                cartItems={[]}
            />
        </nav>
    )
}
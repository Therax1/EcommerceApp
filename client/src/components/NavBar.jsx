import { faBars, faTimes, faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

    return(
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a 
                            href="#" 
                            aria-label="Homepage"
                            className="text-2xl font-bold text-amber-600 hover:text-amber-700 transition-colors"
                        >
                            Logo
                        </a>
                    </div>

                    {/* Navigation Links - Desktop */}
                    <ul className="hidden md:flex items-center space-x-8">
                        <li>
                            <a 
                                href="" 
                                className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-amber-600 after:transition-all hover:after:w-full"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a 
                                href="" 
                                className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-amber-600 after:transition-all hover:after:w-full"
                            >
                                Products
                            </a>
                        </li>
                        <li>
                            <a 
                                href="" 
                                className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-amber-600 after:transition-all hover:after:w-full"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a 
                                href="" 
                                className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-amber-600 after:transition-all hover:after:w-full"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>

                    {/* Actions - Search & User */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Search Button/Bar */}
                        <div className="relative">
                            {!isSearchOpen ? (
                                <button
                                    onClick={toggleSearch}
                                    className="p-2 text-gray-700 hover:text-amber-600 transition-colors"
                                    aria-label="Open search"
                                >
                                    <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
                                </button>
                            ) : (
                                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                                    <input 
                                        type="search" 
                                        placeholder="Search..."
                                        className="bg-transparent outline-none text-gray-700 placeholder-gray-500 w-48"
                                        autoFocus
                                    />
                                    <button 
                                        type="submit"
                                        className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                    <button
                                        onClick={toggleSearch}
                                        className="text-gray-500 hover:text-gray-700 transition-colors"
                                        aria-label="Close search"
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* User Icon */}
                        <a 
                            href="#" 
                            aria-label="User Account"
                            className="p-2 text-gray-700 hover:text-amber-600 transition-colors"
                        >
                            <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-3">
                        <a 
                            href="#" 
                            aria-label="User Account"
                            className="p-2 text-gray-700 hover:text-amber-600 transition-colors"
                        >
                            <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
                        </a>
                        <button
                            onClick={toggleMenu}
                            className="p-2 text-gray-700 hover:text-amber-600 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <FontAwesomeIcon 
                                icon={isMenuOpen ? faTimes : faBars} 
                                className="w-6 h-6"
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
                    <ul className="pb-4 space-y-2">
                        <li>
                            <a 
                                href="" 
                                className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a 
                                href="" 
                                className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                            >
                                Products
                            </a>
                        </li>
                        <li>
                            <a 
                                href="" 
                                className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a 
                                href="" 
                                className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                            >
                                Contact
                            </a>
                        </li>
                        {/* A voir demain mais je tenais à commit pour ne pas abandonner la journey  */}
                        {/* <li>
                            <a 
                                href="#" 
                                aria-label="User Account"
                                className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                            >
                                <div className="flex items-center gap-2  ">
                                    <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                                    Account
                                </div>
                            </a>
                        </li> */}
                        <li className="pt-2 border-t border-gray-200">
                            <div className="px-4 py-2">
                                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                                    <input 
                                        type="search" 
                                        placeholder="Search..."
                                        className="bg-transparent outline-none text-gray-700 placeholder-gray-500 w-full"
                                    />
                                    <button 
                                        type="submit"
                                        className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
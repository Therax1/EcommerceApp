import { useState } from "react"

export default function Footer() {
    const [email, setEmail] = useState("")

    const handleSubscribe = (e) => {
        e.preventDefault()
        // Logique d'abonnement à la newsletter
        console.log("Newsletter subscription:", email)
        setEmail("")
    }

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                {/* Contenu principal du footer */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Colonne 1 : Logo et Adresse */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Chez Diallo
                        </h2>
                        <address className="not-italic text-gray-500 text-sm leading-relaxed">
                            Université d'Abomey-Calavi <br />
                            01 BP 2009 Cotonou, Bénin <br />
                            Phone: +229 97 97 97 97 <br />
                            Email: contact@chezdiallo.com
                        </address>
                    </div>

                    {/* Colonne 2 : Links */}
                    <div className="space-y-4">
                        <h3 className="text-gray-400 font-medium text-sm">
                            Links
                        </h3>
                        <nav>
                            <ul className="space-y-3">
                                <li>
                                    <a 
                                        href="/" 
                                        className="text-gray-900 hover:text-amber-600 transition-colors font-medium"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        className="text-gray-900 hover:text-amber-600 transition-colors font-medium"
                                    >
                                        Shop
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        className="text-gray-900 hover:text-amber-600 transition-colors font-medium"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        className="text-gray-900 hover:text-amber-600 transition-colors font-medium"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Colonne 3 : Help */}
                    <div className="space-y-4">
                        <h3 className="text-gray-400 font-medium text-sm">
                            Help
                        </h3>
                        <nav>
                            <ul className="space-y-3">
                                <li>
                                    <a 
                                        href="#" 
                                        className="text-gray-900 hover:text-amber-600 transition-colors font-medium"
                                    >
                                        Payment Options
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        className="text-gray-900 hover:text-amber-600 transition-colors font-medium"
                                    >
                                        Returns
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        className="text-gray-900 hover:text-amber-600 transition-colors font-medium"
                                    >
                                        Privacy Policies
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Colonne 4 : Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-gray-400 font-medium text-sm">
                            Newsletter
                        </h3>
                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <div className="flex gap-2">
                                <input 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email Address"
                                    required
                                    className="flex-1 px-0 py-2 border-b-2 border-gray-900 bg-transparent text-sm placeholder-gray-400 focus:outline-none focus:border-amber-600 transition-colors"
                                />
                                <button 
                                    type="submit"
                                    className="px-0 py-2 border-b-2 border-gray-900 font-semibold text-sm hover:text-amber-600 hover:border-amber-600 transition-colors uppercase"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Ligne de séparation */}
                <hr className="my-8 border-gray-200" />

                {/* Copyright */}
                <div className="text-center md:text-left">
                    <p className="text-gray-900 text-sm">
                        &copy; 2025 Chez Diallo. All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    )
}

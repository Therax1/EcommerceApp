import ArrierePlan from '../assets/img/auth/ArrierePlan_Main.jpg'
import AuthInput from '../components/AuthInput'
import Google from '../assets/img/auth/icons8-google.svg'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Connexion() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Données de connexion:', formData)
        // Appel backend à ajouter plus tard
    }

    return (
        <div 
            className="luminositeFaible min-h-screen flex justify-center items-center bg-center bg-cover p-3"
            style={{ backgroundImage: `url(${ArrierePlan})` }}
        >
            <form 
                onSubmit={handleSubmit}
                className="bg-[#ffffff22] px-6 py-10 text-center flex flex-col gap-6 rounded-lg backdrop-blur-xs shadow-xl w-full max-w-lg"
            >
                <h3 className="text-3xl font-semibold text-[#ffffffd9] md:text-4xl">
                    Connectez-vous
                </h3>

                <div className='flex flex-col gap-4'>
                    <AuthInput
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email :"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <AuthInput 
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Mot de passe :"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Lien mot de passe oublié */}
                <div className="text-right">
                    <Link to="/mot-de-passe-oublie" className="text-[#ffffff] text-sm underline hover:text-[#eeeeee]">
                        Mot de passe oublié ?
                    </Link>
                </div>

                {/* Bouton Submit */}
                <button
                    type="submit"
                    className="py-3 bg-[#000000e9] text-white rounded-md text-lg font-bold hover:bg-[#000000] transition-colors duration-200 md:text-xl md:py-4"
                >
                    Se connecter
                </button>

                <div className='bg-gray-200 h-[1px] w-[90%] self-center'></div>

                {/* Bouton Google */}
                <button
                    type="button"
                    className="py-3 px-5 bg-[#000000e9] text-white rounded-full flex items-center justify-center font-medium gap-4 hover:bg-[#000000] transition-colors duration-200 md:text-lg md:py-4"
                >
                    <img 
                        className="w-9" 
                        src={Google} 
                        alt="Icone de Google" 
                    />
                    Se connecter avec Google 
                </button>

                {/* Lien vers inscription */}
                <p className="text-[#ffffffcc] mt-4">
                    Pas encore de compte ?{' '}
                    <Link to="/inscription" className="text-[#ffffff] font-semibold underline hover:text-[#eeeeee]">
                        Inscrivez-vous
                    </Link>
                </p>
            </form>
        </div>        
    )
}
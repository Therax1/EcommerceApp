import ArrierePlan from '../assets/img/auth/ArrierePlan_Main.jpg'
import AuthInput from '../components/AuthInput'
import Google from '../assets/img/auth/icons8-google.svg'
import { Link } from 'react-router-dom'

export default function Inscription() {
    

    return (
        <div 
            className="luminositeFaible min-h-screen flex justify-center items-center bg-center bg-cover p-3"
            style={{ backgroundImage: `url(${ArrierePlan})` }}
        >
            <form 
                className="bg-[#ffffff22] px-6 py-10 text-center flex flex-col gap-6 rounded-lg backdrop-blur-xs shadow-xl w-full max-w-lg"
            >
                <h3 className="text-3xl font-semibold text-[#ffffffd9] md:text-4xl">
                    Inscrivez-vous
                </h3>

                <div className='flex flex-col gap-4'>
                    <AuthInput
                        type="text"
                        name="nomprenom"
                        id="nomprenom"
                        placeholder="Nom et Prénoms :"
                    />
                    <AuthInput
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email :"
                    />
                    <AuthInput 
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Mot de passe :"
                    />
                    <AuthInput 
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirmer le mot de passe :"
                    />
                </div>

                {/* Lien vers les CGU */}
                <div className="text-sm text-[#ffffffcc]">
                    <label className="flex items-center justify-center gap-2">
                        <input 
                            type="checkbox" 
                            required 
                        />
                        J'accepte les <a href="#" className="text-[#ffffff] underline">conditions d'utilisation</a>
                    </label>
                </div>

                {/* Bouton Submit */}
                <button
                    type="submit"
                    className={`py-3 bg-[#000000e9] text-white rounded-md text-lg font-bold hover:bg-[#000000] transition-colors duration-200 md:text-xl md:py-4`}
                >
                    S'inscrire
                </button>

                <div className='bg-gray-200 h-[1px] w-[90%] self-center'></div>

                {/* Bouton Google */}
                <button
                    type="button"
                    className={`py-3 px-5 bg-[#000000e9] text-white rounded-full flex items-center justify-center font-medium gap-4 hover:bg-[#000000] transition-colors duration-200 md:text-lg md:py-4`}
                >
                    <img 
                        className="w-9" 
                        src={Google} 
                        alt="Icone de Google" 
                    />
                    S'inscrire avec Google 
                </button>

                {/* Lien vers connexion */}
                <p className="text-[#ffffffcc] mt-4">
                    Déjà un compte ?{' '}
                    <Link 
                        to="/connexion" 
                        className={`text-[#ffffff] font-semibold underline hover:text-[#eeeeee]`}
                    >
                        Connectez-vous
                    </Link>
                </p>
            </form>
        </div>        
    )
}
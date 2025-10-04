import '../styles/globalUtilities.css'
import '../styles/login.css'
export default function Login(){


    return(
        <div className="bg-Auth">
            <form>
                <h3>Bienvenue sur EcomPay</h3>
                <div>
                    <input type="email" id='email' name='email' placeholder='Email :'/>
                </div>
                <div>
                    <input type="email" id='password' name='password' placeholder='Mot de Passe :'/>
                </div>
                <button type='submit'>Se connecter</button>
            </form>
        </div>
    )
}
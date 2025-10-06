import { Routes, Route } from 'react-router-dom'
import Connexion from './auth/Connexion'
import Inscription from './auth/Inscription'

export default function App() {
    return(
        <Routes>
            
            <Route path='/inscription' element={ <Inscription/> } />
            <Route path='/connexion' element={ <Connexion/> } />
        </Routes>
    )
}

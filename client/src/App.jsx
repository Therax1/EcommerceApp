import { Routes, Route } from 'react-router-dom'
import Connexion from './auth/Connexion'
import Inscription from './auth/Inscription'
import Shop from './pages/Shop'

export default function App() {
    return(
        <Routes>
            
            <Route path='/inscription' element={ <Inscription/> } />
            <Route path='/product' element={ <Shop/> } />
            <Route path='/connexion' element={ <Connexion/> } />
        </Routes>
    )
}

import { Routes, Route } from 'react-router-dom'
import Connexion from './auth/Connexion'
import Inscription from './auth/Inscription'
import ProductPage from './pages/ProductPage'
import NavBar from './components/NavBar'
import Home from './pages/Home'

export default function App() {
    return(
        <Routes>
            
            <Route path='/' element={ <Home/> } />
            <Route path='/inscription' element={ <Inscription/> } />
            <Route path='/productid' element={ <ProductPage/> } />
            <Route path='/connexion' element={ <Connexion/> } />
        </Routes>
    )
}

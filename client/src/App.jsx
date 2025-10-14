import { Routes, Route } from 'react-router-dom'
import Connexion from './auth/Connexion'
import Inscription from './auth/Inscription'
import ProductsCard from './components/ProductsCard'

export default function App() {
    return(
        <Routes>
            
            <Route path='/inscription' element={ <Inscription/> } />
            <Route path='/product' element={ <ProductsCard/> } />
            <Route path='/connexion' element={ <Connexion/> } />
        </Routes>
    )
}

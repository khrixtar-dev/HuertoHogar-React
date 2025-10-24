import './App.css'
import Navbar from './pages/NavBar'
import Home from './pages/Home'
import Nosotros from './pages/Nosotros'
import Footer from './pages/Footer'
import Anuncios from './pages/Anuncios'
import Contacto from './pages/Contacto'
import Tienda from './pages/Tienda'
import Carrito from './pages/Carrito'
import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'

function App() {  
  return (
    <Router>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/nosotros' element={<Nosotros/>}/>
          <Route path='/anuncios' element={<Anuncios/>}/>
          <Route path='/contacto' element={<Contacto/>}/>
          <Route path='/tienda' element={<Tienda/>}/>
          <Route path='/carrito' element={<Carrito/>}/>
        </Routes>
      <Footer/>
    </Router>
  )
}

export default App

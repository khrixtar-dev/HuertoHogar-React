import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown, Badge } from 'react-bootstrap';
import { obtenerCantidadTotal } from '../../public/js/carrito';

import { cuentaIniciada, obtenerUsuarioActual, cerrarSesion } from '../../public/js/persistenciaLogin';
import '../css/navbar.css';


function NavBar() {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const actualizarBadge = () => {
    const cantidad = obtenerCantidadTotal();
    setCantidadCarrito(cantidad);
  };


  const [sesionIniciada, setSesionIniciada] = useState(false); 
  const [usuario, setUsuario] = useState(null); 
  
  const actualizarSesion = () => {
    setSesionIniciada(cuentaIniciada()); 
    setUsuario(obtenerUsuarioActual()); 
  };

  const manejarCerrarSesion = () => {
    cerrarSesion(); 
    actualizarSesion(); 
  };

  useEffect(() => {
    actualizarBadge(); 
    actualizarSesion(); 
    
    window.addEventListener('carritoActualizado', actualizarBadge);
    window.addEventListener('sesionActualizada', actualizarSesion);
    
    return () => {
      window.removeEventListener('carritoActualizado', actualizarBadge);
      window.removeEventListener('sesionActualizada', actualizarSesion);
    };
  }, []);

  return (
    <>
      <header>
        <Navbar expand="lg" fixed='top'>
          <Container>
            <Navbar.Brand as={Link} to="/" translate="no">
              <img src="/img/navbar_footer_/LogoHuertoHogar.png" alt="HuertoHogar" height="40" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav ">
              <Nav className="ms-auto" >
                <Nav.Link as={Link} to="/nosotros" translate="no">Nosotros</Nav.Link>
                <Nav.Link as={Link} to="/tienda" translate="no">Tienda</Nav.Link>
                <Nav.Link as={Link} to="/anuncios" translate="no">Anuncios</Nav.Link>
                {/* MODIFICADOR DEL DROPDOWN */}
                {sesionIniciada ? (
                  //SI INICIA SESION
                  <NavDropdown title={usuario?.nombre || 'Usuario'} id="user-dropdown">
                    <NavDropdown.Item as={Link} to="/cuenta" translate="no">Cuenta</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/" onClick={manejarCerrarSesion} translate="no">Cerrar Sesión</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  // SI NO INICIA SESION
                  <NavDropdown title="Login" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/login_cliente" translate="no">Cliente</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/login_admin" translate="no">Administrador</NavDropdown.Item>
                  </NavDropdown>
                )}
                {/* BADGE DINAMICO */}
                <Nav.Link as={Link} to="/carrito" translate="no">Carrito <Badge bg="success" className="badge ms-1">{cantidadCarrito}</Badge></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

    </>
  );
}

export default NavBar;
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

  // Estados para el manejo de sesión
  const [sesionIniciada, setSesionIniciada] = useState(false); // Controla si hay sesión activa
  const [usuario, setUsuario] = useState(null); // Almacena datos del usuario logueado
  
  /**
   * Sincroniza el estado del componente con el localStorage
   * Se ejecuta cuando:
   * - El componente se monta
   * - Se inicia sesión desde otra página
   * - Se cierra sesión
   */
  const actualizarSesion = () => {
    setSesionIniciada(cuentaIniciada()); // Verifica si hay sesión activa
    setUsuario(obtenerUsuarioActual()); // Obtiene datos del usuario actual
  };

  /**
   * Maneja el cierre de sesión desde el navbar
   * 1. Llama a cerrarSesion() para limpiar localStorage
   * 2. Actualiza el estado del componente
   * 3. El navbar se re-renderiza mostrando opciones de login
   */
  const manejarCerrarSesion = () => {
    cerrarSesion(); // Limpia localStorage
    actualizarSesion(); // Actualiza estado del componente
  };

  /**
   * Hook de efecto que se ejecuta al montar el componente
   * Configura:
   * 1. Estado inicial del carrito y sesión
   * 2. Event listeners para cambios globales
   * 
   * Los eventos permiten que el navbar se actualice cuando:
   * - Se modifica el carrito desde otra página
   * - Se inicia/cierra sesión desde otra página
   */
  useEffect(() => {
    actualizarBadge(); // Carga inicial del carrito
    actualizarSesion(); // Carga inicial de la sesión
    
    // Escucha eventos globales para mantener sincronización
    window.addEventListener('carritoActualizado', actualizarBadge);
    window.addEventListener('sesionActualizada', actualizarSesion);
    
    // Cleanup: remueve listeners al desmontar componente
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
            <Navbar.Brand as={Link} to="/">
              <img src="/img/navbar_footer_/LogoHuertoHogar.png" alt="HuertoHogar" height="40" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav ">
              <Nav className="ms-auto" >
                <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
                <Nav.Link as={Link} to="/tienda">Tienda</Nav.Link>
                <Nav.Link as={Link} to="/anuncios">Anuncios</Nav.Link>
                {/* Renderizado condicional basado en el estado de sesión */}
                {sesionIniciada ? (
                  // Si hay sesión activa: muestra dropdown con nombre del usuario
                  <NavDropdown title={usuario?.nombre || 'Usuario'} id="user-dropdown">
                    <NavDropdown.Item as={Link} to="/cuenta">Cuenta</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/" onClick={manejarCerrarSesion} >Cerrar Sesión</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  // Si no hay sesión: muestra opciones de login
                  <NavDropdown title="Login" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/login_cliente">Cliente</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/login_admin">Administrador</NavDropdown.Item>
                  </NavDropdown>
                )}
                {/* Badge del carrito que se actualiza dinámicamente */}
                <Nav.Link as={Link} to="/carrito">Carrito <Badge bg="success" className="badge ms-1">{cantidadCarrito}</Badge></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

    </>
  );
}

export default NavBar;
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import { obtenerCantidadTotal } from '../../public/js/carrito';
import '../css/navbar.css';


function NavBar() {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  const actualizarBadge = () => {
    const cantidad = obtenerCantidadTotal();
    setCantidadCarrito(cantidad);
  };

  useEffect(() => {
    actualizarBadge();
    
    window.addEventListener('carritoActualizado', actualizarBadge);
    return () => window.removeEventListener('carritoActualizado', actualizarBadge);
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
                <NavDropdown title="Login" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/login_cliente">Cliente</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/login_admin">Administrador
                  </NavDropdown.Item>
                </NavDropdown>
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
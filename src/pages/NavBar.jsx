import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import '../css/navbar.css';


function NavBar() {
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
                <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
                <Nav.Link as={Link} to="/anuncios">Anuncios</Nav.Link>
                <NavDropdown title="Login" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/login_cliente">Cliente</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/login_admin">Administrador
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/carrito">Carrito <Badge bg="success" className="badge ms-1">0</Badge></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

    </>
  );
}

export default NavBar;
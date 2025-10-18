import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../css/footer.css'

function Footer() {
  return (
    <>
      <footer className="custom-footer" >
        <Container fluid className="footer-content">
          <Row className="align-items-center">
            {/* Enlaces izquierda */}
            <Col className="footer-links-left pb-3 ">
              <Link to="/nosotros">Ubicación</Link>
              <Link to="/nosotros">Nosotros</Link>
              <Link to="/tienda">Tienda</Link>
            </Col>

            {/* Centro (Logo) */}
            <Col className="footer-center mb-3 ">
              <Image
                src="/img/navbar_footer_/LogoHuertoHogar.png"
                alt="LogoHuertoHogar"
                className="footer-logo"
                style={{ width: "110px", height: "70px" }}
                fluid
              />
            </Col>

            {/* Enlaces derecha */}
            <Col className="footer-links-right pb-3">
              <Link to="/contacto">Contacto</Link>
              <Link to="/anuncios">Anuncios</Link>
              <Link to="/login">Cuenta</Link>
            </Col>
          </Row>
        </Container>

        {/* Línea inferior */}
        <div className="text-center p-2 footer-bottom ">
          © {new Date().getFullYear()} Huerto Hogar — Todos los derechos
          reservados.
        </div>
      </footer>
    </>
  );
}
export default Footer

import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../css/login-admin.css";

export default function LoginAdmin() {
  return (
    <Container fluid className="login-fullscreen p-0">
      <Row className="g-0 vh-100">
        {/* MITAD IZQUIERDA */}
        <Col
          md={6}
          className="login-left-admin d-flex flex-column justify-content-center align-items-center text-center p-5"
        >
          <h3 className="fw-bold mb-3">Más que una comunidad</h3>
          <p className="px-5">Bienvenido Administrador 🌿</p>
        </Col>

        {/* MITAD DERECHA */}
        <Col
          md={6}
          className="login-right-admin d-flex flex-column justify-content-center align-items-center text-center p-5"
        >
          <div className="logo-box mb-4 d-flex align-items-center justify-content-center">
            <img
              src="/img/navbar_footer_/LogoHuertoHogar.png"
              alt="Huerto Hogar"
              style={{ width: "120px", height: "auto" }}
            />
          </div>

          <h2 className="fw-bold text-success mb-2">Huerto Hogar</h2>
          <p className="text-muted mb-4">Inicia sesión en tu cuenta</p>

          <Form style={{ width: "80%", maxWidth: "400px" }}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Correo electrónico"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Control type="password" placeholder="Contraseña" required />
            </Form.Group>

            <Button type="submit" className="w-100 btn-green mb-3">
              INGRESAR
            </Button>

            <a href="#" className="small text-success d-block mb-2">
              ¿Olvidaste tu contraseña?
            </a>
            <p className="small">
              ¿No tienes una cuenta?{" "}
              <a href="#" className="text-success fw-semibold">
                Regístrate
              </a>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

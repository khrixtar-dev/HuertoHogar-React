import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../css/login-clientes.css"; // lo haremos en el paso siguiente

export default function LoginCliente() {
  return (
    <Container fluid className="login-container vh-100">
      <Row className="h-100">
        {/* MITAD IZQUIERDA */}
        <Col
          md={6}
          className="left-panel d-flex flex-column justify-content-center align-items-start p-5"
        >
          <h2 className="fw-bold mb-3">Bienvenido a Huerto Hogar</h2>
          <p>Conéctate y cuida tu huerto con nosotros 🌱</p>
        </Col>

        {/* MITAD DERECHA */}
        <Col
          md={6}
          className="right-panel d-flex justify-content-center align-items-center p-5"
        >
          <div className="login-box shadow p-4 bg-white rounded">
            <h3 className="text-center mb-4 text-success fw-bold">
              Inicia sesión
            </h3>

            <Form>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Check label="Recuérdame" />
                <a href="#" className="text-success small">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <Button variant="success" type="submit" className="w-100 mb-3">
                Entrar
              </Button>

              <p className="text-center mb-0">
                ¿No tienes cuenta?{" "}
                <a href="#" className="text-success fw-semibold">
                  Regístrate
                </a>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

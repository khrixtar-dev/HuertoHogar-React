import React from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/registro.css";

export default function Registro() {
  return (
    <div className="registro-page">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="registro-card p-4 shadow-lg">
          <h3 className="text-center mb-4 text-success fw-bold">
            Crear cuenta
          </h3>

          <Form>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu apellido"
                required
              />
            </Form.Group>

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

            <Form.Group className="mb-4" controlId="repeatPassword">
              <Form.Label>Repetir contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repite tu contraseña"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="terms">
              <Form.Check
                type="checkbox"
                label={
                  <>
                    Acepto todos los términos en{" "}
                    <a href="#" className="text-success">
                      Términos de servicio
                    </a>
                  </>
                }
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 btn-green mb-3">
              Registrarse
            </Button>

            <p className="text-center small">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login_cliente" className="text-success fw-semibold">
                Inicia sesión aquí
              </Link>
            </p>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

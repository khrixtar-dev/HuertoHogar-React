import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { validarRegistro } from "../../public/js/validacion_registro";
import "../css/registro.css";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [repetirContraseña, setRepetirContraseña] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const valido = validarRegistro(
      nombre,
      apellido,
      correo,
      contraseña,
      repetirContraseña,
      aceptaTerminos
    );

    if (valido) {
      // simular guardado o redirección
      setTimeout(() => {
        navigate("/login_cliente");
      }, 2600);
    }
  };

  return (
    <div className="registro-page">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="registro-card p-4 shadow-lg">
          <h3 className="text-center mb-4 text-success fw-bold">
            Crear cuenta
          </h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="repeatPassword">
              <Form.Label>Repetir contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repite tu contraseña"
                value={repetirContraseña}
                onChange={(e) => setRepetirContraseña(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="terms">
              <Form.Check
                type="checkbox"
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)}
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
              <Link to="/login_cliente" className="text-success fw-semibold" translate="no">
                Inicia sesión aquí
              </Link>
            </p>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

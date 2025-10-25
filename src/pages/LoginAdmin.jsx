import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { iniciarSesion } from "../../public/js/persistenciaLogin";
import "../css/login-admin.css";

export default function LoginAdmin() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const submitCredenciales = (e) => {
    e.preventDefault();
    const resultado = iniciarSesion(correo, contraseña);
    
    if (resultado.success && resultado.usuario.admin) {
      window.dispatchEvent(new Event('sesionActualizada'));
      window.location.href = '/admin';
    } else {
      setError('Esta cuenta no pertenece a un administrador');
    }
  };

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

          <Form style={{ width: "80%", maxWidth: "400px" }} onSubmit={submitCredenciales}>          
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Control 
                type="password" 
                placeholder="Contraseña" 
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required 
              />
            </Form.Group>

            <Button type="submit" className="w-100 btn-green mb-3">
              INGRESAR
            </Button>
            {error && <Alert variant="danger">{error}</Alert>}

            
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

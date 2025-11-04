import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { obtenerUsuarioActual } from "../../../public/js/persistenciaLogin";
import "../../css/home-admin.css";

export default function HomeAdmin() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = obtenerUsuarioActual();
    setUsuario(user);
  }, []);

  return (
    <div className="home-admin-page">
      <Container className="py-5">
      <h2 className="text-center mb-4 fw-bold text-secondary">
        Panel de Administración
      </h2>
      <p className="text-center text-muted mb-5 text-p">
        Bienvenido {usuario ? usuario.nombre : "Administrador"}, aquí puedes
        gestionar la información de Huerto Hogar.
      </p>

      <Row className="g-4 justify-content-center">
        <Col md={4}>
          <Card className="shadow-sm p-3 text-center" onClick={() => navigate('/admin/usuarios')} style={{cursor: 'pointer'}}>
            <Card.Title className="mb-2 text-success">Usuarios</Card.Title>
            <Card.Text>
              Administra las cuentas de los clientes y administradores.
            </Card.Text>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm p-3 text-center" onClick={() => navigate('/admin/productos')} style={{cursor: 'pointer'}}>
            <Card.Title className="mb-2 text-success">Productos</Card.Title>
            <Card.Text>
              Agrega, edita o elimina productos del catálogo.
            </Card.Text>
          </Card>
        </Col>
      </Row>
      </Container>
    </div>
  );
}

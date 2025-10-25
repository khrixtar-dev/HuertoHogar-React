import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { obtenerUsuarioActual } from "../../../public/js/persistenciaLogin";

export default function HomeAdmin() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = obtenerUsuarioActual();
    setUsuario(user);
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 fw-bold text-secondary">
        Panel de Administración
      </h2>
      <p className="text-center text-muted mb-5">
        Bienvenido {usuario ? usuario.nombre : "Administrador"}, aquí puedes
        gestionar la información de Huerto Hogar.
      </p>

      <Row className="g-4 justify-content-center">
        <Col md={4}>
          <Card className="shadow-sm p-3 text-center">
            <Card.Title className="mb-2 text-success">Usuarios</Card.Title>
            <Card.Text>
              Administra las cuentas de los clientes y administradores.
            </Card.Text>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm p-3 text-center">
            <Card.Title className="mb-2 text-success">Productos</Card.Title>
            <Card.Text>
              Agrega, edita o elimina productos del catálogo.
            </Card.Text>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

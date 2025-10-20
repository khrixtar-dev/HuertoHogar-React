import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { PRODUCTOS, getCategorias } from '../../public/js/productos_catalogo';
import '../css/tienda.css';

function ProductCard({ producto, onVerProducto, onAgregarCarrito }) {
  return (
    <Card className="product-card">
      <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
      <Card.Body>
        <Card.Title>{producto.nombre}</Card.Title>
        <Card.Text>
          ${producto.precio.toLocaleString()} CLP/kg
        </Card.Text>
        <div className="btn-container">
          <Button size="sm" variant="success" onClick={() => onVerProducto(producto.id)}>
            Ver Producto
          </Button>
          <Button size="sm" variant="success" onClick={() => onAgregarCarrito(producto.id)}>
            Añadir al Carro
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

function Tienda() {
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const categorias = getCategorias();

  const productosFiltrados = filtroCategoria
    ? PRODUCTOS.filter(p => p.categoria === filtroCategoria)
    : PRODUCTOS;

  const handleVerProducto = (id) => {
    console.log('Ver producto:', id);
  };

  const handleAgregarCarrito = (id) => {
    console.log('Agregar al carrito:', id);
  };
  return (
    <>
    <Container>
      <h2 className="my-4">Tienda</h2>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>
                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {productosFiltrados.map(producto => (
          <Col key={producto.id} xs={6} md={3} className="mb-4 d-flex justify-content-center">
            <ProductCard
              producto={producto}
              onVerProducto={handleVerProducto}
              onAgregarCarrito={handleAgregarCarrito}
            />
          </Col>
        ))}
      </Row>
    </Container>
  </>
  );
}

export default Tienda
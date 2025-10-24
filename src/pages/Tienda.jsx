import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { PRODUCTOS, getCategorias } from '../../public/js/productos_catalogo';
import { agregarAlCarrito } from '../../public/js/carrito';
import ProductModal from './ProductModal';
import '../css/tienda.css';

function ProductCard({ producto, onVerProducto, onAgregarCarrito }) {
  return (
    <Card className="product-card">
      <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
      <Card.Body>
        <Card.Title>
          {producto.nombre}
        </Card.Title>
        <Card.Text>
          ${
            producto.precio.toLocaleString()
          } CLP/kg
        </Card.Text>
        <div className="btn-container">
          <Button className="btn-ver-producto" size="sm" variant="success" onClick={
            () => onVerProducto(producto.id)
          }>
            Ver Producto
          </Button>
          <Button className="btn-agregar" size="sm" variant="success" onClick={
            () => onAgregarCarrito(producto.id)
          }>
            Añadir al Carro
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

function Tienda() {
  const [filtroCategoria, setFiltroCategoria] = useState(
    ''
  );
  // ESTADOS PARA CONTROLAR EL MODAL
  const [showModal, setShowModal] = useState(
    false
  );
  const [productoSeleccionado, setProductoSeleccionado] = useState(
    null
  );
  const categorias = getCategorias();

  const productosFiltrados = [];
  for (
    let i = 0; 
    i < PRODUCTOS.length; 
    i++
  ) {
    if (
      !filtroCategoria || 
      PRODUCTOS[i].categoria === filtroCategoria
    ) {
      productosFiltrados.push(
        PRODUCTOS[i]
      );
    }
  }

  // ABRI EL MODAL SEGUN EL ID DEL PRODUCTO
  const VerProducto = (id) => {
    const producto = PRODUCTOS.find(
      p => p.id === id
    );
    setProductoSeleccionado(producto);
    setShowModal(true);
  };

  // CIERRA EL MODAL Y DEJA EL PRODUCTO SELECCIONADO EN NULL
  const CerrarModal = () => {
    setShowModal(false);
    setProductoSeleccionado(null);
  };

  const AgregarCarrito = (id) => {
    agregarAlCarrito(id);
    console.log(
      'Producto agregado al carrito:', 
      id
    );
  };
  return (
    <>
      <Container>
        <h2 className="my-4 tienda-title">
          Catalogo
        </h2>

        <Row className="mb-4">
          <Col md={4}>
            <Form.Select className='form-select'
              value={
                filtroCategoria
              }
              onChange={
                (e) => setFiltroCategoria(e.target.value)
              }
            >
              <option value="">
                Todas las categorías
              </option>
              {categorias.map(
                categoria => (
                  <option key={categoria} value={categoria}>
                    {
                      categoria.charAt(0).toUpperCase() + categoria.slice(1)
                    }
                  </option>
                )
              )}
            </Form.Select>
          </Col>
        </Row>

        <Row className="justify-content-center">
          {productosFiltrados.map(
            producto => (
              <Col key={
                producto.id
              } xs={6} md={3} className="mb-4 d-flex justify-content-center">
                <ProductCard
                  producto={producto}
                  onVerProducto={VerProducto}
                  onAgregarCarrito={AgregarCarrito}
                />
              </Col>
            )
          )}
        </Row>

        {/* MODAL PARA MOSTRAR DETALLES DEL PRODUCTO */}
        <ProductModal
          show={
            showModal
          }
          onHide={
            CerrarModal
          }
          producto={
            productoSeleccionado
          }
          onAgregarCarrito={
            AgregarCarrito
          }
        />
      </Container>
    </>
  );
}

export default Tienda
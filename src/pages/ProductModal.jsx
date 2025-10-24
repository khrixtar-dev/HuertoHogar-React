import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { agregarAlCarrito } from '../../public/js/carrito';


function ProductModal({ show, onHide, producto, onAgregarCarrito }) {
  if (producto === null || producto === undefined) {
    return null;
  }

  // AGREGA AL CARRITO SIN CERRAR EL MODAL
  const modalAgregarCarrito = () => {
    agregarAlCarrito(producto.id);
    onAgregarCarrito(producto.id);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{producto.nombre}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Imagen del producto */}
        <div className="text-center mb-3">
          <img 
            src={producto.imagen} 
            alt={producto.nombre}
            style={{ maxWidth: '100%', height: '200px', objectFit: 'cover' }}
          />
        </div>
        
        {/* Información del producto */}
        <div>
          <p><strong>Código:</strong> {producto.id}</p>
          <p><strong>Precio:</strong> ${producto.precio.toLocaleString()} CLP/kg</p>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
        </div>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="success" onClick={modalAgregarCarrito}>
          Agregar al Carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal;
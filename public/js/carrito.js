export function obtenerCarrito() {
  const carrito = localStorage.getItem('carrito');
  return carrito ? JSON.parse(carrito) : [];
}

export function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

export function agregarAlCarrito(productoId) {
  const carrito = obtenerCarrito();
  const itemExistente = carrito.find(item => item.id === productoId);
  
  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    carrito.push({ id: productoId, cantidad: 1 });
  }
  
  guardarCarrito(carrito);
  window.dispatchEvent(new Event('carritoActualizado'));
}

export function quitarDelCarrito(productoId) {
  const carrito = obtenerCarrito();
  const itemIndex = carrito.findIndex(item => item.id === productoId);
  
  if (itemIndex !== -1) {
    if (carrito[itemIndex].cantidad > 1) {
      carrito[itemIndex].cantidad -= 1;
    } else {
      carrito.splice(itemIndex, 1);
    }
  }
  
  guardarCarrito(carrito);
  window.dispatchEvent(new Event('carritoActualizado'));
}

export function eliminarDelCarrito(productoId) {
  const carrito = obtenerCarrito();
  const itemIndex = carrito.findIndex(item => item.id === productoId);
  
  if (itemIndex !== -1) {
    carrito.splice(itemIndex, 1);
  }
  
  guardarCarrito(carrito);
  window.dispatchEvent(new Event('carritoActualizado'));
}

export function vaciarCarrito() {
  localStorage.removeItem('carrito');
  window.dispatchEvent(new Event('carritoActualizado'));
}

export function obtenerCantidadTotal() {
  const carrito = obtenerCarrito();
  return carrito.reduce((total, item) => total + item.cantidad, 0);
}
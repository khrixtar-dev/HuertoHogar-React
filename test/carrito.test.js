import { agregarAlCarrito, eliminarDelCarrito, obtenerCarrito, vaciarCarrito } from '../public/js/carrito.js';

let carritoStorage = null;
global.localStorage = {
  getItem: () => carritoStorage,
  setItem: (key, value) => { carritoStorage = value; },
  removeItem: () => { carritoStorage = null; }
};

global.window = { dispatchEvent: () => {} };

test('agregar y eliminar producto del carrito', () => {
  vaciarCarrito();
  
  agregarAlCarrito('FR001');
  
  const carrito = obtenerCarrito();
  expect(carrito).toHaveLength(1);
  expect(carrito[0].id).toBe('FR001');
  expect(carrito[0].cantidad).toBe(1);
  
  eliminarDelCarrito('FR001');
  
  const carritoVacio = obtenerCarrito();
  expect(carritoVacio).toHaveLength(0);
});
import { getProductosByCategoria, PRODUCTOS } from '../public/js/productos_catalogo.js';

test('getProductosByCategoria filtra correctamente', () => {
  const frutas = getProductosByCategoria('fruta organica');
  expect(frutas.length).toBe(8);
  expect(frutas.every(p => p.categoria === 'fruta organica')).toBe(true);
  
  const lacteos = getProductosByCategoria('productos lacteos');
  expect(lacteos.length).toBe(8);
  expect(lacteos.every(p => p.categoria === 'productos lacteos')).toBe(true);
  
  const inexistente = getProductosByCategoria('categoria falsa');
  expect(inexistente.length).toBe(0);
  
  const sinCategoria = getProductosByCategoria('');
  expect(sinCategoria.length).toBe(0);
});
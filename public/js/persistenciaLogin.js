// IMPORTA la lista base inicial
import { usuarios as usuariosBase } from "./usuarios.js";

/**
 * Devuelve la lista de usuarios actual.
 * - Si hay usuarios en localStorage, usa esos
 * - Si no hay, usa la lista base inicial
 */
export function obtenerUsuarios() {
  const guardados = JSON.parse(localStorage.getItem("usuarios"));
  if (Array.isArray(guardados) && guardados.length > 0) {
    return guardados;
  }
  return usuariosBase;
}

/**
 * Guarda una lista de usuarios en localStorage
 * @param {Array} lista
 */
export function guardarUsuarios(lista) {
  localStorage.setItem("usuarios", JSON.stringify(lista));
}

/**
 * Retorna true si hay sesión iniciada.
 */
export function cuentaIniciada() {
  return localStorage.getItem("cuentaIniciada") === "true";
}

/**
 * Guarda los datos de sesión actual.
 * @param {Object} usuario
 */
export function setSesion(usuario) {
  localStorage.setItem("cuentaIniciada", "true");
  localStorage.setItem("usuarioActual", JSON.stringify(usuario));
}

/**
 * Intenta iniciar sesión con correo y contraseña.
 * Devuelve { success: boolean, usuario?: object }
 */
export function iniciarSesion(correo, contraseña) {
  const lista = obtenerUsuarios();
  const usuario = lista.find(
    (u) => u.correo === correo && u.contraseña === contraseña
  );

  if (usuario) {
    setSesion(usuario);
    return { success: true, usuario };
  }

  return { success: false };
}

/**
 * Cierra sesión.
 */
export function cerrarSesion() {
  localStorage.removeItem("cuentaIniciada");
  localStorage.removeItem("usuarioActual");
}

/**
 * Devuelve el usuario logueado actualmente o null.
 */
export function obtenerUsuarioActual() {
  const u = localStorage.getItem("usuarioActual");
  return u ? JSON.parse(u) : null;
}

/**
 * Retorna true si el usuario actual es admin.
 */
export function esAdmin() {
  const u = obtenerUsuarioActual();
  return u ? u.admin === true : false;
}

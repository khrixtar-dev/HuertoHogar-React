// Importa la lista inicial de usuarios desde otro archivo
// Si no hay usuarios guardados, usará esta lista como base
import { usuarios as usuariosBase } from "./usuarios.js";

// FUNCIONES HELPER PARA LOCALSTORAGE
// Estas 3 funciones simplifican el trabajo con localStorage

// Obtiene un valor del localStorage y lo convierte de JSON a objeto
// Si no existe, devuelve null para evitar errores
const get = (key) => JSON.parse(localStorage.getItem(key) || "null");

// Guarda un valor en localStorage convirtiéndolo a JSON
// Necesario porque localStorage solo guarda strings
const set = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// Elimina una clave del localStorage
const remove = (key) => localStorage.removeItem(key);

// FUNCIONES DE GESTIÓN DE USUARIOS

// Obtiene la lista completa de usuarios
// Si hay usuarios guardados en localStorage los usa, sino usa la lista base
export function obtenerUsuarios() {
  return get("usuarios") || usuariosBase;
}

// Guarda la lista de usuarios en localStorage
// Se usa cuando se registra un nuevo usuario
export function guardarUsuarios(users) {
  set("usuarios", users);
}

// FUNCIONES DE ESTADO DE SESIÓN

// Verifica si hay una sesión activa
// Devuelve true solo si está explícitamente marcado como true
export function cuentaIniciada() {
  return get("cuentaIniciada") === true;
}

// Obtiene los datos del usuario que está logueado
// Devuelve null si no hay nadie logueado
export function obtenerUsuarioActual() {
  return get("usuarioActual");
}

// Verifica si el usuario actual es administrador
// Usa optional chaining (?.) para evitar errores si no hay usuario
export function esAdmin() {
  return obtenerUsuarioActual()?.admin === true;
}

// FUNCIONES DE AUTENTICACIÓN

// Establece una sesión activa guardando el usuario
// Marca la cuenta como iniciada y guarda los datos del usuario
export function setSesion(usuario) {
  set("cuentaIniciada", true);
  set("usuarioActual", usuario);
}

// Intenta iniciar sesión con email y contraseña
// Busca en la lista de usuarios uno que coincida
export function iniciarSesion(correo, contraseña) {
  const user = obtenerUsuarios().find(u => u.correo === correo && u.contraseña === contraseña);
  if (user) {
    setSesion(user);  // Si encuentra el usuario, inicia sesión
    return { success: true, usuario: user };
  }
  return { success: false };  // Si no lo encuentra, falla
}

// Cierra la sesión eliminando todos los datos de localStorage
export function cerrarSesion() {
  remove("cuentaIniciada");
  remove("usuarioActual");
}

// Registra un nuevo usuario en el sistema
export function registrarUsuario(userData) {
  const users = obtenerUsuarios();  // Obtiene usuarios actuales
  const newUser = { ...userData, id: Date.now() };  // Crea nuevo usuario con ID único
  guardarUsuarios([...users, newUser]);  // Guarda la lista actualizada
  return { success: true, usuario: newUser };
}

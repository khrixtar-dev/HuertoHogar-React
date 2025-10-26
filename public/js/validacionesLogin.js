/**
 * ===============================
 * VALIDACIONES DE LOGIN (CLIENTE / ADMIN)
 * ===============================
 * Este módulo contiene las funciones de validación de:
 * - Correo electrónico
 * - Contraseña
 * - Combinación general (login)
 * - Permisos de acceso según tipo de usuario
 */

/**
 * Valida el formato y longitud de un correo electrónico.
 *
 * @param {string} correo - Correo ingresado por el usuario.
 * @returns {string|null} Devuelve un mensaje de error si no cumple las condiciones, o null si es válido.
 */
export function validarCorreo(correo) {
  if (!correo) return "El correo es obligatorio.";
  if (correo.length > 100)
    return "El correo no puede superar los 100 caracteres.";

  const regex = /^[\w._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  if (!regex.test(correo))
    return "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.";

  return null; // ✅ válido
}

/**
 * Valida la longitud y presencia de una contraseña.
 *
 * @param {string} pass - Contraseña ingresada por el usuario.
 * @returns {string|null} Devuelve un mensaje de error si no cumple las condiciones, o null si es válida.
 */
export function validarContraseña(pass) {
  if (!pass) return "La contraseña es obligatoria.";
  if (pass.length < 4 || pass.length > 10)
    return "La contraseña debe tener entre 4 y 10 caracteres.";

  return null; // ✅ válida
}

/**
 * Ejecuta las validaciones combinadas del login (correo y contraseña).
 *
 * @param {string} correo - Correo ingresado en el formulario.
 * @param {string} contraseña - Contraseña ingresada en el formulario.
 * @returns {string[]} Lista de mensajes de error encontrados (vacía si no hay errores).
 */
export function validarLogin(correo, contraseña) {
  const errores = [];

  const errorCorreo = validarCorreo(correo);
  const errorPass = validarContraseña(contraseña);

  if (errorCorreo) errores.push(errorCorreo);
  if (errorPass) errores.push(errorPass);

  return errores; // ✅ retorna array de errores (si hay)
}

/**
 * Verifica si el usuario tiene permiso para acceder al tipo de login correspondiente.
 *
 * @param {Object} usuario - El usuario encontrado en usuarios.js.
 * @param {string} tipoLogin - Tipo de inicio de sesión ("cliente" o "admin").
 * @returns {string|null} Mensaje de error si no tiene permiso, o null si el permiso es válido.
 *
 * @example
 * validarPermisos(usuario, "cliente");
 * // → "Esta cuenta pertenece a un administrador. Usa el panel correspondiente."
 *
 * validarPermisos(usuario, "admin");
 * // → "Esta cuenta no tiene permisos de administrador."
 */
export function validarPermisos(usuario, tipoLogin) {
  if (!usuario) return "Usuario no encontrado.";

  if (tipoLogin === "admin" && !usuario.admin)
    return "Esta cuenta no tiene permisos de administrador.";

  if (tipoLogin === "cliente" && usuario.admin)
    return "Esta cuenta pertenece a un administrador. Usa el panel correspondiente.";

  return null; // ✅ permiso válido
}

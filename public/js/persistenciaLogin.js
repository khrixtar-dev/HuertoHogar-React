/**
 * Base de datos simulada de usuarios
 * En una aplicación real, esto vendría de una API/base de datos
 * Contiene usuarios con diferentes roles (admin y usuario normal)
 */
const usuarios = [
  {
    nombre: "Simio",
    apellido: "Perez",
    correo: "simio.perez@gmail.com",
    contraseña: "123456",
    admin: false // Usuario normal
  },
  {
    nombre: "Admin",
    apellido: "Choto",
    correo: "admin@choto.com",
    contraseña: "admin123",
    admin: true // Usuario administrador
  }
];

/**
 * Verifica si hay una sesión activa
 * @returns {boolean} true si hay una cuenta iniciada, false si no
 * Utiliza localStorage para persistir el estado entre recargas de página
 */
export function cuentaIniciada(){
  return localStorage.getItem('cuentaIniciada') === 'true';
}

/**
 * Autentica un usuario con email y contraseña
 * @param {string} correo - Email del usuario
 * @param {string} contraseña - Contraseña del usuario
 * @returns {Object} Objeto con success (boolean) y usuario (si es exitoso)
 * 
 * Proceso:
 * 1. Busca el usuario en la lista por email y contraseña
 * 2. Si existe, guarda el estado de sesión en localStorage
 * 3. Guarda los datos del usuario para uso posterior
 * 4. Retorna el resultado de la autenticación
 */
export function iniciarSesion(correo, contraseña) {
  // Busca usuario que coincida con credenciales
  const usuario = usuarios.find(u => u.correo === correo && u.contraseña === contraseña);
  
  if (usuario) {
    // Marca la sesión como activa
    localStorage.setItem('cuentaIniciada', 'true');
    // Guarda los datos del usuario (sin la contraseña por seguridad)
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    return {
      success: true, usuario
    };
  }
  
  // Credenciales incorrectas
  return {
    success: false
  };
}

/**
 * Cierra la sesión del usuario actual
 * Limpia todos los datos de sesión del localStorage
 * Esto fuerza al usuario a iniciar sesión nuevamente
 */
export function cerrarSesion() {
  localStorage.removeItem('cuentaIniciada');
  localStorage.removeItem('usuarioActual');
}

/**
 * Obtiene los datos del usuario actualmente logueado
 * @returns {Object|null} Datos del usuario o null si no hay sesión
 * Convierte el JSON guardado en localStorage de vuelta a objeto
 */
export function obtenerUsuarioActual() {
  const usuario = localStorage.getItem('usuarioActual');
  return usuario ? JSON.parse(usuario) : null;
}

/**
 * Verifica si el usuario actual tiene permisos de administrador
 * @returns {boolean} true si es admin, false si no o si no hay sesión
 * Útil para mostrar/ocultar funcionalidades específicas de admin
 */
export function esAdmin() {
  const usuario = obtenerUsuarioActual();
  return usuario ? usuario.admin : false;
}


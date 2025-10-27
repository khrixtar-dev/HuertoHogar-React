import { usuarios } from "./usuarios.js";

export function cuentaIniciada() {
  return localStorage.getItem("cuentaIniciada") === "true";
}

export function iniciarSesion(correo, contraseña) {
  const usuario = usuarios.find(
    (u) => u.correo === correo && u.contraseña === contraseña
  );

  if (usuario) {
    localStorage.setItem("cuentaIniciada", "true");
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));
    return {
      success: true,
      usuario,
    };
  }

  return {
    success: false,
  };
}

export function cerrarSesion() {
  localStorage.removeItem("cuentaIniciada");
  localStorage.removeItem("usuarioActual");
}

export function obtenerUsuarioActual() {
  const usuario = localStorage.getItem("usuarioActual");
  return usuario ? JSON.parse(usuario) : null;
}

/*
CON ESTO PODRIAS CAMBIAR EL NAVBAR, ALGO SIMILAR SE HIZO EN EL NAVBAR
export function esAdmin() {
  const usuario = obtenerUsuarioActual();
  return usuario ? usuario.admin : false;
}
*/

/**
 * ===============================
 * VALIDACIONES DE LOGIN (CLIENTE / ADMIN)
 * ===============================
 */
export function validarCorreo(correo) {
  if (!correo) return "El correo es obligatorio.";
  if (correo.length > 100)
    return "El correo no puede superar los 100 caracteres.";

  const regex = /^[\w._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  if (!regex.test(correo))
    return "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.";

  return null; // valido
}


export function validarContraseña(pass) {
  if (!pass) return "La contraseña es obligatoria.";
  if (pass.length < 4 || pass.length > 10)
    return "La contraseña debe tener entre 4 y 10 caracteres.";

  return null; // valida
}

export function validarLogin(correo, contraseña) {
  const errores = [];

  const errorCorreo = validarCorreo(correo);
  const errorPass = validarContraseña(contraseña);

  if (errorCorreo) errores.push(errorCorreo);
  if (errorPass) errores.push(errorPass);

  return errores; // retorna array de errores (si hay)
}

export function validarPermisos(usuario, tipoLogin) {
  if (!usuario) return "Usuario no encontrado.";

  if (tipoLogin === "admin" && !usuario.admin)
    return "Esta cuenta no tiene permisos de administrador.";

  if (tipoLogin === "cliente" && usuario.admin)
    return "Esta cuenta pertenece a un administrador. Usa el panel correspondiente.";

  return null; // permiso valido
}

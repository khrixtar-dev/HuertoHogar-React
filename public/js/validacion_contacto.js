import Swal from "sweetalert2";

/**
 * Valida los campos del formulario de contacto.
 *
 * @param {string} nombre - Nombre del usuario que envía el mensaje.
 * @param {string} correo - Correo electrónico del remitente (duoc, profesor.duoc, gmail).
 * @param {string} mensaje - Contenido del mensaje.
 * @returns {boolean} true si todas las validaciones son correctas.
 */
export function validarContacto(nombre, correo, mensaje) {
  const errores = [];

  // === Validar nombre ===
  if (!nombre.trim()) errores.push("El nombre es obligatorio.");
  else if (nombre.length < 2)
    errores.push("El nombre debe tener al menos 2 caracteres.");

  // === Validar correo ===
  if (!correo.trim()) errores.push("El correo es obligatorio.");
  else {
    const regex = /^[\w._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!regex.test(correo))
      errores.push(
        "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com."
      );
  }

  // === Validar mensaje ===
  if (!mensaje.trim()) errores.push("El mensaje no puede estar vacío.");
  else if (mensaje.length < 10)
    errores.push("El mensaje debe tener al menos 10 caracteres.");

  // === Mostrar errores ===
  if (errores.length > 0) {
    Swal.fire({
      icon: "error",
      title: "Errores en el formulario",
      html: errores.map((e) => `• ${e}`).join("<br>"),
      toast: true,
      position: "bottom-center",
      timer: 4000,
      showConfirmButton: false,
    });
    return false;
  }

  // === Éxito ===
  Swal.fire({
    icon: "success",
    title: "Mensaje enviado",
    text: "Gracias por contactarte con Huerto Hogar 🌱",
    toast: true,
    position: "bottom-center",
    timer: 2500,
    showConfirmButton: false,
  });

  return true;
}

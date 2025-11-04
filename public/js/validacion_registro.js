import Swal from "sweetalert2";

export function validarRegistro(
  nombre,
  apellido,
  correo,
  contraseña,
  repetirContraseña,
  aceptaTerminos
) {
  const errores = [];

  // === Validar nombre ===
  if (!nombre.trim()) errores.push("El nombre es obligatorio.");
  else if (nombre.length < 2) errores.push("El nombre es demasiado corto.");

  // === Validar apellido ===
  if (!apellido.trim()) errores.push("El apellido es obligatorio.");
  else if (apellido.length < 2) errores.push("El apellido es demasiado corto.");

  // === Validar correo ===
  if (!correo.trim()) errores.push("El correo es obligatorio.");
  else {
    const regex = /^[\w._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!regex.test(correo))
      errores.push(
        "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com."
      );
  }

  // === Validar contraseña ===
  if (!contraseña) errores.push("La contraseña es obligatoria.");
  else if (contraseña.length < 4 || contraseña.length > 10)
    errores.push("La contraseña debe tener entre 4 y 10 caracteres.");

  // === Confirmar contraseña ===
  if (contraseña !== repetirContraseña)
    errores.push("Las contraseñas no coinciden.");

  // === Términos y condiciones ===
  if (!aceptaTerminos)
    errores.push("Debes aceptar los Términos de servicio para continuar.");

  // === Mostrar errores si los hay ===
  if (errores.length > 0) {
    Swal.fire({
      icon: "error",
      title: "Errores en el registro",
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
    title: "¡Registro exitoso!",
    text: "Tu cuenta ha sido creada correctamente.",
    toast: true,
    position: "bottom-center",
    timer: 2500,
    showConfirmButton: false,
  });

  return true;
}

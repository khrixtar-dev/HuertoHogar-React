import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import {
  validarLogin,
  validarPermisos,
} from "../../public/js/validacionesLogin";
import { usuarios } from "../../public/js/usuarios";

import "../css/login-clientes.css";

export default function LoginCliente() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const submitCredenciales = (e) => {
    e.preventDefault();

    // ✅ 1. Validar formato del correo y contraseña
    const errores = validarLogin(correo, contraseña);
    if (errores.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Errores de validación",
        html: errores.map((e) => `• ${e}`).join("<br>"),
        toast: true,
        position: "bottom-center",
        timer: 3500,
        showConfirmButton: false,
      });
      return;
    }

    // ✅ 2. Buscar usuario en la lista
    const usuario = usuarios.find(
      (u) => u.correo === correo && u.contraseña === contraseña
    );

    // Si no se encontró usuario
    if (!usuario) {
      Swal.fire({
        icon: "error",
        title: "Credenciales incorrectas",
        text: "El correo o la contraseña no coinciden con ningún usuario registrado.",
        toast: true,
        position: "bottom-center",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    // ✅ 3. Validar permisos (solo clientes pueden acceder aquí)
    const permisoError = validarPermisos(usuario, "cliente");
    if (permisoError) {
      Swal.fire({
        icon: "warning",
        title: "Acceso restringido",
        text: permisoError,
        toast: true,
        position: "bottom-center",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    // ✅ 4. Guardar sesión en localStorage
    localStorage.setItem("cuentaIniciada", "true");
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));

    // ✅ 5. Mostrar mensaje de éxito
    Swal.fire({
      icon: "success",
      title: `¡Bienvenido, ${usuario.nombre}!`,
      text: "Inicio de sesión exitoso",
      toast: true,
      position: "bottom-center",
      timer: 1800,
      showConfirmButton: false,
    });

    // ✅ 6. Redirigir y actualizar navbar al finalizar la animación
    setTimeout(() => {
      navigate("/");
      window.dispatchEvent(new Event("sesionActualizada"));
    }, 1800);
  };

  return (
    <Container fluid className="login-fullscreen p-0">
      <Row className="g-0 vh-100">
        {/* MITAD IZQUIERDA */}
        <Col
          md={6}
          className="login-left-cliente d-flex flex-column justify-content-center align-items-center text-center p-5"
        >
          <div className="logo-box mb-4 d-flex align-items-center justify-content-center">
            <img
              src="/img/navbar_footer_/LogoHuertoHogar.png"
              alt="Huerto Hogar"
              style={{ width: "120px", height: "auto" }}
            />
          </div>

          <h2 className="fw-bold text-success mb-2">Huerto Hogar</h2>
          <p className="text-muted mb-4">Inicia sesión en tu cuenta</p>

          <Form
            style={{ width: "80%", maxWidth: "400px" }}
            onSubmit={submitCredenciales}
          >
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 btn-green mb-3">
              INGRESAR
            </Button>

            <a href="#" className="small text-success d-block mb-2">
              ¿Olvidaste tu contraseña?
            </a>
            <p className="small">
              ¿No tienes una cuenta?{" "}
              <Link to="/registro" className="text-success fw-semibold" translate="no">
                Regístrate
              </Link>
            </p>
          </Form>
        </Col>

        {/* MITAD DERECHA */}
        <Col
          md={6}
          className="login-right-cliente d-flex flex-column justify-content-center align-items-center text-center p-5"
        >
          <h3 className="fw-bold mb-3">Más que una comunidad</h3>
          <p className="px-5">
            Únete a Huerto Hogar y aprende a cultivar, cuidar y disfrutar de tu
            propio huerto 🌿
          </p>
        </Col>
      </Row>
    </Container>
  );
}

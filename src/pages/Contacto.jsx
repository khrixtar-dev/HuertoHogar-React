import React, { useState } from "react";
import { validarContacto } from "../../public/js/validacion_contacto";
import "../css/contacto.css";

const Contacto = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const valido = validarContacto(nombre, correo, mensaje);
    if (valido) {
      // limpiar campos después de enviar
      setNombre("");
      setCorreo("");
      setMensaje("");
    }
  };

  return (
    <div className="contacto-container">
      <h2 className="contacto-titulo">Contáctanos</h2>
      <p className="contacto-descripcion">
        Déjanos tu mensaje y te responderemos lo antes posible 🌱
      </p>

      <div className="form-wrapper">
        <form
          id="contactForm"
          className="contacto-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="tuemail@gmail.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mensaje" className="form-label">
              Mensaje
            </label>
            <textarea
              className="form-control"
              id="mensaje"
              rows="5"
              placeholder="Escribe tu mensaje aquí..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn-enviar">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contacto;

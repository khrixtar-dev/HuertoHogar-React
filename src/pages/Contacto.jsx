import React from 'react';
import '../css/contacto.css';

const Contacto = () => {
  return (
    <div className="contacto-container">
      <h2 className="contacto-titulo">Contáctanos</h2>
      <p className="contacto-descripcion">
        Déjanos tu mensaje y te responderemos lo antes posible 🌱
      </p>

      <div className="form-wrapper">
        <form id="contactForm" className="contacto-form">
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input 
              type="text" 
              className="form-control" 
              id="nombre" 
              placeholder="Tu nombre" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              placeholder="tuemail@gmail.com" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="mensaje" className="form-label">Mensaje</label>
            <textarea 
              className="form-control" 
              id="mensaje" 
              rows="5" 
              placeholder="Escribe tu mensaje aquí..."
            ></textarea>
          </div>

          <button type="submit" className="btn-enviar">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Contacto;
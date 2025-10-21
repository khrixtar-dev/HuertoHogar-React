import React from 'react';
import '../css/anuncios.css';

const Anuncios = () => {
  return (
    <div className="anuncios-container">
      <header className="diario-header">
        <h1 className="diario-titulo">HUERTO HOGAR NOTICIAS</h1>
        <div className="diario-fecha">{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}</div>
      </header>

      <div className="noticias-grid">
        <div className="noticia">
          <h2 className="noticia-titulo">Tour Especial por Nuestra Granja Orgánica</h2>
          <div className="noticia-imagen">
            <img src="/img/anuncios_/noticia1.webp" alt="Tour por la granja" />
          </div>
          <p className="noticia-contenido">Este sábado 15 de diciembre, únete a nosotros para un recorrido exclusivo por nuestras instalaciones. Conoce de primera mano cómo cultivamos nuestros productos orgánicos y disfruta de degustaciones gratuitas.</p>
        </div>

        <div className="noticia">
          <div className="noticia-imagen">
            <img src="/img/anuncios_/noticia2.webp" alt="Descuentos especiales" />
          </div>
          <h2 className="noticia-titulo">¡50% de Descuento en Productos Seleccionados!</h2>
          <p className="noticia-contenido">Durante toda esta semana, disfruta de increíbles descuentos en nuestra selección premium de vegetales orgánicos. No te pierdas esta oportunidad única de llevar lo mejor de nuestra granja a tu mesa.</p>
        </div>

        <div className="noticia">
          <h2 className="noticia-titulo">Chef Reconocido Visita Huerto Hogar</h2>
          <p className="noticia-contenido">El famoso chef María González eligió nuestros productos para su nuevo restaurante. 'La calidad y frescura de Huerto Hogar es incomparable', comentó durante su visita.</p>
          <div className="noticia-imagen">
            <img src="/img/anuncios_/noticia3.webp" alt="Chef María González" />
          </div>
        </div>

        <div className="noticia">
          <div className="noticia-imagen">
            <img src="/img/anuncios_/noticia4.webp" alt="Productos gourmet" />
          </div>
          <h2 className="noticia-titulo">Nueva Línea de Productos Gourmet</h2>
          <p className="noticia-contenido">Presentamos nuestra exclusiva colección de productos gourmet, cultivados con técnicas ancestrales y el más alto estándar de calidad orgánica.</p>
        </div>

        <div className="noticia">
          <h2 className="noticia-titulo">Certificación Orgánica Internacional</h2>
          <div className="noticia-imagen">
            <img src="/img/anuncios_/noticia5.webp" alt="Certificación orgánica" />
          </div>
          <p className="noticia-contenido">Huerto Hogar recibe reconocimiento internacional por sus prácticas sostenibles y productos 100% orgánicos. Un logro que celebramos con toda nuestra comunidad.</p>
        </div>

        <div className="noticia">
          <h2 className="noticia-titulo">Taller de Cocina Saludable</h2>
          <p className="noticia-contenido">Aprende a preparar deliciosas recetas con nuestros productos frescos. Inscripciones abiertas para el taller del próximo mes.</p>
          <div className="noticia-imagen">
            <img src="/img/anuncios_/noticia6.webp" alt="Taller de cocina" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anuncios;
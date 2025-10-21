import "../css/nosotros.css"

function Nosotros() {
  return (
    <main className="nosotros-main">
      <div className="hero-container">
        <img src="/img/nosotros_/Fondo.webp" className="hero-image" alt="Campo HuertoHogar" />
        <div className="overlay"></div>
        <div className="hero-text">
          <h1>Bienvenido a HuertoHogar</h1>
          <p>
            En <strong>HuertoHogar</strong> conectamos a las familias chilenas con
            la frescura del campo, ofreciendo productos naturales y de calidad
            directamente a la puerta de tu hogar. Con más de 6 años de experiencia
            y presencia en diversas ciudades del país, trabajamos junto a
            agricultores locales para promover una vida más saludable y
            sostenible.
          </p>
          <br/>
          <hr/>
          <br/>
          <h4>Estamos ubicados en:</h4>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.089036516701!2d-70.66055162366423!3d-33.44698677339095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c507f91be917%3A0xcfac72a68dd4b986!2sDuoc%20UC%20-%20Sede%20Padre%20Alonso%20de%20Ovalle!5e0!3m2!1ses-419!2scl!4v1757892198100!5m2!1ses-419!2scl"
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Nosotros
import Carousel from 'react-bootstrap/Carousel';
import '../css/home.css';

function Home() {
  return (
    <>

      <div className="main-content">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/img/home_/img_carrusel1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Frescura del campo a tu hogar</h3>
              <p>Más de 6 años llevando calidad y sabor a las familias de Chile</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/img/home_/img_carrusel2.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Estamos cerca de ti</h3>
              <p>Operamos en más de 9 puntos del país: Santiago, Puerto Montt,
                Concepción y más</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/img/home_/img_carrusel3.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Vive saludable y natural</h3>
              <p>Promovemos una alimentación consciente y productos de calidad</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/img/home_/img_carrusel4.jpg"
              alt="Fourth slide"
            />
            <Carousel.Caption>
              <h3>Confianza y cercanía</h3>
              <p>  Del agricultor directo a tu mesa, con el cariño del campo chileno</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="featured-container">
        <h3>Productos Favoritos</h3>
        
      </div>
      <br/>
      <div className="about-container">
        <h3>
          Acerca de HuertoHogar
        </h3>
        <p>
          En HuertoHogar, nos dedicamos a llevar la frescura del campo directamente a tu hogar.
          Con más de 6 años de experiencia, nos enorgullece ofrecer productos agrícolas de alta calidad,
          cultivados con métodos sostenibles y respetuosos con el medio ambiente.
          Nuestra misión es promover una alimentación saludable y consciente, conectando a las familias
          con los agricultores locales y sus productos frescos.
          Desde 2019, hemos trabajado en colaboración con agricultores locales y proveedores de
          confianza para garantizar que cada producto que ofrecemos cumpla con los más altos estándares de calidad.
          Nos esforzamos por ser un referente en la industria agrícola, brindando a nuestros clientes
          una experiencia de compra excepcional y productos que reflejen el sabor auténtico del campo chileno.
          
        </p>
      </div>

    </>
  )
}

export default Home;
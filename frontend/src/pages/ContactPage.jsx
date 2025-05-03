import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/ContactPage.css';

const ContactPage = () => {
  useEffect(() => {
    // Desplazar hacia la parte superior con una animación suave
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <>
      <Navbar />
      <div className="contact-page">
        <div className="contact-content">
          <h1>Contáctanos</h1>
          <p>Estamos aquí para ayudarte. Puedes visitarnos o comunicarte a través de los siguientes medios:</p>

          <div className="contact-info">
            <p><strong>Dirección:</strong> Calle 123, Rivera, Huila</p>
            <p><strong>Teléfono:</strong> +57 300 123 4567</p>
            <p><strong>Email:</strong> contacto@hotelrivera.com</p>
          </div>

          <div className="map-container">
            <iframe
              title="Ubicación Hotel Rivera"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.007915658036!2d-75.2452463!3d2.7793784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b751771e4fef1%3A0x2594a63a017ac33d!2sRivera%2C%20Huila!5e0!3m2!1ses!2sco!4v1713807637123!5m2!1ses!2sco"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              aria-label="Ubicación del hotel en Google Maps"
            ></iframe>
          </div>

          {/* Formulario de contacto */}
          <div className="contact-form">
            <h2>Envíanos un mensaje</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;

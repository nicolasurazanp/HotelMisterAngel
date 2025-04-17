import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import '../styles/Footer.css';
import { FaX } from 'react-icons/fa6';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-section about">
        <h2>Hotel Mister Angel</h2>
        <p>Disfruta de una experiencia única en el corazón de Rivera, Huila. Tranquilidad, confort y servicio de calidad.</p>
      </div>

      <div className="footer-section contact">
        <h3>Contacto</h3>
        <p><FaMapMarkerAlt /> Calle 123, Rivera, Huila</p>
        <p><FaPhoneAlt /> +57 300 123 4567</p>
        <p><FaEnvelope /> contacto@hotelrivera.com</p>
      </div>

      <div className="footer-section links">
        <h3>Enlaces útiles</h3>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Habitaciones</a></li>
          <li><a href="#">Reservas</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </div>

      <div className="footer-section social">
        <h3>Síguenos</h3>
        <div className="social-icons">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaX /></a>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2025 Hotel Rivera. Todos los derechos reservados.</p>
    </div>
  </footer>
);

export default Footer;

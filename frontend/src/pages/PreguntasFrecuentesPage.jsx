import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/PreguntasFrecuentesPage.css';

const preguntas = [
  {
    pregunta: '¿Cuál es el horario de check-in y check-out?',
    respuesta: 'El check-in es a partir de las 3:00 p.m. y el check-out es hasta las 12:00 p.m.'
  },
  {
    pregunta: '¿El hotel acepta mascotas?',
    respuesta: 'Sí, aceptamos mascotas pequeñas con previo aviso y bajo ciertas condiciones.'
  },
  {
    pregunta: '¿Tienen parqueadero disponible?',
    respuesta: 'Sí, contamos con parqueadero privado y gratuito para nuestros huéspedes.'
  },
  {
    pregunta: '¿Incluyen desayuno?',
    respuesta: 'Sí, el desayuno tipo buffet está incluido en la tarifa de hospedaje.'
  },
  {
    pregunta: '¿Se puede cancelar una reserva?',
    respuesta: 'Sí, puedes cancelar hasta 24 horas antes sin cargo adicional.'
  }
];

const PreguntasFrecuentesPage = () => {
  const [activo, setActivo] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggle = (index) => {
    setActivo(activo === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div className="faq-container">
        <h1>Preguntas Frecuentes</h1>
        <div className="faq-acordeon">
          {preguntas.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${activo === index ? 'activo' : ''}`}
              onClick={() => toggle(index)}
            >
              <div className="faq-pregunta">{item.pregunta}</div>
              <div className="faq-respuesta">{item.respuesta}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PreguntasFrecuentesPage;

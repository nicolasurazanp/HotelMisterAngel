import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/GaleriaPage.css';

const GaleriaPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const imagenes = [
    "https://i.imgur.com/TTzExsC.jpeg",
    "https://i.imgur.com/mOOeof4.jpeg",
    "https://i.imgur.com/CdT0nE4.jpeg",
    "https://i.imgur.com/akSRDyg.jpeg",
    "https://i.imgur.com/6kXmsMq.jpeg",
    "https://i.imgur.com/G4X4KpI.jpeg",
    "https://i.imgur.com/RlVJz1d.jpeg",
    "https://i.imgur.com/bQtHfjZ.jpeg",
    "https://i.imgur.com/DkF55Pl.jpeg",
    "https://i.imgur.com/3Kh6Fh6.jpeg",
  ];

  return (
    <>
      <Navbar />
      <div className="galeria-container">
        <h1>Nuestros Espacios</h1>
        <p>Descubre las áreas que hacen de Hotel Mister Angel un lugar inolvidable.</p>
        <div className="galeria-grid">
          {imagenes.map((img, idx) => (
            <div key={idx} className="galeria-item">
              <img src={img} alt={`Espacio ${idx + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GaleriaPage;

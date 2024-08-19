import React, { useState, useEffect } from 'react';
import '../home/homepage.css';

const Slideshow = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 10000); // Cambia la diapositiva cada 10 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slideshow-container">
      <div className="slideshow">
        <span className="slideshow-arrow" onClick={prevSlide}>&#10094;</span>
        <div className="slide">
          <img className="slideshow-image" src={slides[currentIndex].image} alt={slides[currentIndex].title} />
          <div className="overlay">
            <h2>{slides[currentIndex].title}</h2>
            <p>{slides[currentIndex].description}</p>
          </div>
        </div>
        <span className="slideshow-arrow" onClick={nextSlide}>&#10095;</span>
      </div>
    </div>
  );
};

export const Homepage = () => {
  const slides = [
    {
      image: 'src/assets/images/foto1.jpg', // Cambia la ruta de las imágenes según sea necesario
    },
    {
      image: 'src/assets/images/foto2.jpg',
    },
    {
      image: 'src/assets/images/foto3.jpg',
    },
    {
      image: 'src/assets/images/foto4.jpg',
    },
  ];

  return (
    <div className="home-container">
      <div className="mini-section">
      <div className="background-overlay"></div>
      </div>
      <div className="content-box">
        <h1>TheraGlow</h1>
        <h2>EL CUBO EMOCIONAL</h2>
        <p>El Cubo Emocional que te ayudará en tus tiempos más estresantes.<br/>
        TheraGlow utiliza luz y música para relajar tu mente y cuerpo.</p>
      </div>

      <div className="main-content">
        
        <div className="info-box">
          <h2>¿Qué es?</h2>
          <p>Es un dispositivo con forma de cubo que ayuda a las personas mediante terapias de luz y sonido, 
            que tiene integrado un sensor que monitorea el ritmo cardiaco del usuario para ayudar 
            a mantener en mejor control de su estado emocional.</p>
        </div>
        <Slideshow slides={slides} />
      </div>
    </div>
  );
};

export default Homepage;

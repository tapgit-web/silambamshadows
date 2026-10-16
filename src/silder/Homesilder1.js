import React, {useState,useEffect}  from 'react'
import './homeslider.css'
import scroll1 from '../img/scroll/SILAMBAM SHADOWS1.gif';
import scroll2 from '../img/scroll/scroll4.jpg';


import Mscroll1 from '../img/scroll/MSILAMBAM SHADOWS1.gif'
import Mscroll2 from '../img/scroll/Mscroll4.jpeg';


const Homeslider1 = () => {
 const desktopImages = [scroll1, scroll2];
  const mobileImages = [Mscroll1, Mscroll2];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
      setCurrentIndex(0); // reset slide on switch
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const images = isMobile ? mobileImages : desktopImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="carousel">
      <button className="carousel-btn prev" onClick={handlePrev}>
        &#8249;
      </button>

      <div className="carousel-image-wrapper">
        <div className="carousel-image fade-animation">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
          />
        </div>
      </div>

      <button className="carousel-btn next" onClick={handleNext}>
        &#8250;
      </button>

      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${
              index === currentIndex ? "active" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Homeslider1;
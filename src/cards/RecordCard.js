import React, { useEffect, useState } from 'react'
import "./Recordcard.css"

const RecordCard = ({ heading, icon, title, date, images = [], interval = 3000  }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, interval);

    return () => clearInterval(autoScroll);
  }, [images.length, interval]);

 

  return (
    <div className="Recordcard">
      <div className="Recordcard-header">
        <div className="icon">
          <img src={icon} alt="icon" />
        </div>
        <div className="heading">{heading}</div>
        <div className="date">{date}</div>
      </div>
       <div className="Recordcard-footer">{title}</div>
     <div className="Recordcarousel">
      <div className="Recordcarousel-image-wrapper">
        <div className="Recordcarousel-image fade-animation1">
          <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
        </div>
      </div>
    </div>
     
    </div>
  );
};

export default RecordCard;

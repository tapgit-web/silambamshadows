// StaffCard.js
import React from 'react';
import './StaffCard.css'; // Import the CSS file

const StaffCard = ({ image, name, specialty }) => {
  return (
    <div className="staff-card">
      <img src={image} alt={name} className="staff-image" />
      <div className="staff-overlay">
        <h3 className="staff-name">{name}</h3>
        <p className="staff-specialty">{specialty}</p>
      </div>
    </div>
  );
};

export default StaffCard;

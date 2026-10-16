
import React from "react";
import "./tcard.css";

const Tcard = ({ imageSrc, altText, title, focus, trainingMethods, keyBenefit }) => {
  return (
    <div className="Tcard">
      <img src={imageSrc} alt={altText} height="200" width="200" />
      <div className="Tcard-content">
        <h3>{title}</h3>
        <ul>
          <li><strong>Focus:</strong> {focus}</li>
          <li><strong>Training Methods:</strong></li>
          <ul>
            {trainingMethods.map((method, index) => (
              <li key={index}>{method}</li>
            ))}
          </ul>
          <li><strong>Key Benefit:</strong> {keyBenefit}</li>
        </ul>
      </div>
    </div>
  );
};

export default Tcard;
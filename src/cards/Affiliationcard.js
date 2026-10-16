import React from 'react'
import "./Affiliationcard.css"

const Affiliationcard = ({ title, iconSrc, link,backgroundColor = "#f8a9a9" }) => {
  return (
    <div className="card"  style={{ backgroundColor }}>
      <div className="icon-container">
        <img src={iconSrc} alt="icon" className="icon-img" />
      </div>
      <a href={link} className="card-title" target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </div>
  )
}

export default Affiliationcard
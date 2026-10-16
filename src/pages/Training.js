import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiCheck } from 'react-icons/fi';
import silambam from '../img/trainingimg/ss1.optimized.webp';
import adimurai from '../img/trainingimg/adimurai.optimized.webp';
import yoga from '../img/trainingimg/yoga.optimized.webp';
import archery from '../img/trainingimg/arrow.optimized.webp';
import karate from '../img/trainingimg/karate.optimized.webp';
import valari from '../img/trainingimg/valari.optimized.webp';
import wrestling from '../img/trainingimg/Wrestling.jpg';
import '../style/inner-pages.css';

const programs = [
  { name: 'Silambam', type: 'Martial arts', image: silambam, note: 'Rooted in tradition', description: 'Discover the rhythm, precision, and power of Tamil Nadu’s traditional bamboo-staff martial art.', skills: ['Footwork & agility', 'Staff control & coordination', 'Strength & self-defense'] },
  { name: 'Yoga', type: 'Mind & body', image: yoga, note: 'Find your balance', description: 'Build a stronger connection between body and mind through movement, breathing, and mindful practice.', skills: ['Asana & flexibility', 'Breathwork & meditation', 'Balance & core strength'] },
  { name: 'Archery', type: 'Mind & body', image: archery, note: 'Focus on the moment', description: 'Turn patience into precision. Develop a steady stance, controlled breathing, and confident technique.', skills: ['Posture & stability', 'Bow handling & release', 'Focus & hand–eye coordination'] },
  { name: 'Wrestling', type: 'Martial arts', image: wrestling, note: 'Strength meets strategy', description: 'Develop power, endurance, and mental toughness through the fundamentals of grappling and ground control.', skills: ['Takedowns & escapes', 'Strength & conditioning', 'Technical drills & sparring'] },
  { name: 'Karate', type: 'Martial arts', image: karate, note: 'Move with confidence', description: 'Explore a martial art that brings together physical control, discipline, and purposeful movement.', skills: ['Balance & coordination', 'Physical conditioning', 'Focus & discipline'] },
  { name: 'Valari', type: 'Martial arts', image: valari, note: 'Keep a legacy alive', description: 'Connect with a traditional Tamil art through precise weapon handling, balanced movement, and focused practice.', skills: ['Handling & throwing technique', 'Stance & balance', 'Precision & concentration'] },
  { name: 'Adimurai', type: 'Martial arts', image: adimurai, note: 'Build strength within', description: 'Learn traditional striking, blocking, and footwork while developing confidence and whole-body strength.', skills: ['Striking & blocking', 'Speed & footwork', 'Body conditioning & control'] },
];

export default function Training() {
  const [filter, setFilter] = useState('All programs');
  const visible = programs.filter((program) => filter === 'All programs' || program.type === filter);
  return (
    <div className="ip-page">
      <header className="ip-intro ip-container">
        <div className="ip-breadcrumb"><Link to="/">Home</Link><span>/</span><span>Our training</span></div>
        <p className="ip-eyebrow">THE FIRST STEP IS YOURS</p>
        <h1>Find your discipline.<br /><span>Discover your strength.</span></h1>
        <p className="ip-intro-copy">Seven disciplines. A shared spirit of growth. Explore a practice that moves you, with guidance for every step of your journey.</p>
      </header>
      <section className="ip-container ip-program-section" aria-label="Training programs">
        <div className="ip-filter-row">
          <div className="ip-filters" aria-label="Filter programs">{['All programs', 'Martial arts', 'Mind & body'].map((item) => <button key={item} type="button" className={`ip-filter ${filter === item ? 'ip-filter-active' : ''}`} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
          <p className="ip-result-count" aria-live="polite">{visible.length} programs to explore</p>
        </div>
        <div className="ip-program-grid">
          {visible.map((program) => <article className="ip-program-card" id={program.name.toLowerCase()} key={program.name}>
            <div className="ip-program-image"><img src={program.image} alt={`${program.name} training at Silambam Shadows`} loading="lazy" /><span className="ip-image-tag">{program.type}</span></div>
            <div className="ip-program-body"><p className="ip-card-eyebrow">{program.note}</p><h2>{program.name}</h2><p>{program.description}</p><ul className="ip-skills">{program.skills.map((skill) => <li key={skill}><FiCheck aria-hidden="true" />{skill}</li>)}</ul><Link to={`/Contact?program=${encodeURIComponent(program.name)}`} className="ip-card-link">Explore {program.name}<FiArrowUpRight aria-hidden="true" /></Link></div>
          </article>)}
        </div>
      </section>
      <section className="ip-bottom-cta ip-container"><div><p className="ip-eyebrow">LET’S FIND YOUR STARTING POINT</p><h2>A little guidance goes a long way.</h2><p>Talk to our team about the right program for you or your child.</p></div><Link className="ip-button ip-button-lime" to="/Contact">Talk to our team<FiArrowUpRight aria-hidden="true" /></Link></section>
    </div>
  );
}

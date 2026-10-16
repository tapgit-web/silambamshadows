import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import bhuvana from '../img/staff/Bhuvana.optimized.webp';
import vignesh from '../img/staff/VikiPhoto.optimized.webp';
import dhinesh from '../img/staff/Dinesh.optimized.webp';
import rishi from '../img/staff/rishi.optimized.webp';
import prem from '../img/staff/Prem.optimized.webp';
import '../style/inner-pages.css';

const staffMembers = [{ name: 'Vignesh M', image: vignesh }, { name: 'Dhinesh Kumar', image: dhinesh }, { name: 'Bhuvaneshwari C', image: bhuvana }, { name: 'Rishi Prasanna', image: rishi }, { name: 'Prem Kumar', image: prem }];

export default function StaffList() {
  return <div className="ip-page">
    <header className="ip-intro ip-container"><div className="ip-breadcrumb"><Link to="/">Home</Link><span>/</span><span>Our trainers</span></div><p className="ip-eyebrow">THE PEOPLE BEHIND THE PROGRESS</p><h1>Good guidance.<br /><span>Extraordinary growth.</span></h1><p className="ip-intro-copy">Meet the people who bring our practice to life. Our Silambam trainers share a passion for the art and for helping every student move forward.</p></header>
    <section className="ip-container ip-staff-grid" aria-label="Meet our trainers">
      {staffMembers.map((member, index) => <article className="ip-staff-card" key={member.name}><div className="ip-staff-portrait"><img src={member.image} alt={member.name} loading="lazy" /><span className="ip-staff-number">0{index + 1}</span></div><div className="ip-staff-info"><div><h2>{member.name}</h2><p>Silambam trainer</p></div><span className="ip-staff-mark" aria-hidden="true">↗</span></div></article>)}
      <div className="ip-team-note"><p className="ip-eyebrow">LEARN. PRACTICE. GROW.</p><h2>Your next chapter starts with a great teacher.</h2><p>Get in touch to learn about training at a branch near you.</p><Link className="ip-button ip-button-lime" to="/Contact">Meet your potential<FiArrowUpRight aria-hidden="true" /></Link></div>
    </section>
  </div>;
}

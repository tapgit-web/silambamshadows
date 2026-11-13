import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import vignesh from '../img/staff/VikiPhoto.optimized.webp';
import dhinesh from '../img/staff/Dinesh.optimized.webp';
import rishi from '../img/staff/rishi.optimized.webp';
import prem from '../img/staff/Prem.optimized.webp';
import '../style/inner-pages.css';

const staffMembers = [
  {
    name: 'Vignesh M',
    role: 'Senior Silambam Trainer',
    badge: 'Staff & Martial Arts',
    desc: 'Specializing in traditional staff footwork, precision strikes, and youth athletic conditioning.',
    image: vignesh
  },
  {
    name: 'Dhinesh Kumar',
    role: 'Silambam & Self-Defense Trainer',
    badge: 'Self-Defense & Form',
    desc: 'Expert in defensive maneuvers, agility drills, and building core discipline across all experience levels.',
    image: dhinesh
  },
  {
    name: 'Rishi Prasanna',
    role: 'World Record Achiever & Trainer',
    badge: 'Endurance & Mastery',
    desc: 'Oscar World Record holder (18-hr blindfolded staff rotation), mentoring students in endurance and mental focus.',
    image: rishi
  },
  {
    name: 'Prem Kumar',
    role: 'Silambam Trainer',
    badge: 'Foundations & Agility',
    desc: 'Dedicated to foundational posture, agility development, and nurturing beginner confidence from day one.',
    image: prem
  }
];

export default function StaffList() {
  return (
    <div className="ip-page">
      <header className="ip-intro ip-container">
        <div className="ip-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Our trainers</span>
        </div>
        <p className="ip-eyebrow">THE PEOPLE BEHIND THE PROGRESS</p>
        <h1>Good guidance.<br /><span>Extraordinary growth.</span></h1>
        <p className="ip-intro-copy">
          Meet the mentors who bring our practice to life. With deep dedication to traditional Indian martial arts, each trainer guides every student toward strength, discipline, and personal breakthrough.
        </p>
      </header>

      <section className="ip-container ip-staff-grid" aria-label="Meet our trainers">
        {staffMembers.map((member, index) => (
          <article className="ip-staff-card" key={member.name}>
            <div className="ip-staff-portrait">
              <img src={member.image} alt={member.name} loading="lazy" />
              <span className="ip-staff-number">0{index + 1}</span>
            </div>
            <div className="ip-staff-info">
              <div className="ip-staff-header">
                <div>
                  <h2>{member.name}</h2>
                  <span className="ip-staff-role">{member.role}</span>
                </div>
                <span className="ip-staff-badge">{member.badge}</span>
              </div>
              <p className="ip-staff-desc">{member.desc}</p>
              <Link to="/Contact" className="ip-staff-action">
                Train with {member.name.split(' ')[0]} <FiArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="ip-container ip-staff-philosophy" aria-label="Our training principles">
        <div className="ip-philosophy-card">
          <p className="ip-eyebrow">THE SHADOWS PHILOSOPHY</p>
          <h2>Taught with patience.<br />Earned through practice.</h2>
          <p>
            Every student receives direct mentorship from certified instructors passionate about preserving India's martial heritage while nurturing personal confidence, focus, and strength.
          </p>
        </div>
        <div className="ip-philosophy-stats">
          <div><strong>100%</strong><span>Dedicated Instructor Attention</span></div>
          <div><strong>All Ages</strong><span>From Young Beginners to Adults</span></div>
          <div><strong>20+</strong><span>Branches Across Tamil Nadu</span></div>
        </div>
      </section>

      <section className="ip-bottom-cta ip-container">
        <div>
          <p className="ip-eyebrow">YOUR JOURNEY STARTS HERE</p>
          <h2>Train under experienced guidance.</h2>
          <p>Connect with our trainers to find the right branch, batch time, and program for you or your child.</p>
        </div>
        <Link className="ip-button ip-button-lime" to="/Contact">
          Start training with us <FiArrowUpRight aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}

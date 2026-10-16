import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import international from '../img/AFFILIATIONS/International_Silambam_Federation.avif';
import india from '../img/AFFILIATIONS/Silambam_Federation _of_India.avif';
import tamilnadu from '../img/AFFILIATIONS/TamilNadu_Silambam_Federation.avif';
import yoga from '../img/AFFILIATIONS/iya.optimized.webp';
import '../style/inner-pages.css';

const affiliations = [
  { name: 'International Silambam Federation', scope: 'International', image: international, url: 'https://www.silambamfederation.org/' },
  { name: 'Silambam Federation of India', scope: 'National', image: india, url: 'https://www.silambamfederation.org/silambam-federation-of-india' },
  { name: 'TamilNadu Silambam Federation', scope: 'Tamil Nadu', image: tamilnadu, url: 'https://www-silambamfederation-org.translate.goog/tamilnadu-silambam-federation?_x_tr_sl=en&_x_tr_tl=ta&_x_tr_hl=ta&_x_tr_pto=tc&_x_tr_hist=true' },
  { name: 'Indian Yoga Association', scope: 'National', image: yoga, url: 'https://www.yogaiya.in/' },
];

export const Affiliation = () => <div className="ip-page">
  <header className="ip-intro ip-container"><div className="ip-breadcrumb"><Link to="/">Home</Link><span>/</span><span>Affiliations</span></div><p className="ip-eyebrow">CONNECTED BY A SHARED PURPOSE</p><h1>A proud tradition.<br /><span>A wider community.</span></h1><p className="ip-intro-copy">Our affiliations connect Silambam Shadows with organizations dedicated to traditional martial arts, sporting excellence, and the practice of yoga.</p></header>
  <section className="ip-container ip-affiliation-grid" aria-label="Our affiliated organizations">
    {affiliations.map((item) => <a className="ip-affiliation-card" key={item.name} href={item.url} target="_blank" rel="noopener noreferrer"><div className="ip-affiliation-top"><span className="ip-card-eyebrow">{item.scope}</span><FiArrowUpRight aria-hidden="true" /></div><div className="ip-affiliation-logo"><img src={item.image} alt={`${item.name} logo`} loading="lazy" /></div><h2>{item.name}</h2><span className="ip-affiliation-link">Visit organization <span className="ip-sr-only">(opens in a new tab)</span><FiArrowUpRight aria-hidden="true" /></span></a>)}
  </section>
  <section className="ip-container ip-plain-note"><p className="ip-eyebrow">ROOTED IN HERITAGE. MOVING FORWARD.</p><h2>Keeping our traditions strong,<br />one generation at a time.</h2><Link className="ip-text-link" to="/About">Get to know our academy<FiArrowUpRight aria-hidden="true" /></Link></section>
</div>;

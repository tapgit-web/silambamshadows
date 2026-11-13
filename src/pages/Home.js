import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiArrowDown, FiArrowRight, FiArrowLeft, FiTarget, FiShield, FiUsers, FiAward } from 'react-icons/fi';
import PhotoGallery from '../gallary/PhotoGallery';
import useHeroMotion from '../animation/useHeroMotion';
import CountUp from '../animation/CountUp';
import '../style/home.css';
import silambam from '../img/trainingimg/ss1.optimized.webp';
import adimurai from '../img/trainingimg/adimurai.optimized.webp';
import wrestling from '../img/trainingimg/wrestling.optimized.webp';
import karate from '../img/trainingimg/karate.optimized.webp';
import yoga from '../img/trainingimg/yoga.optimized.webp';
import archery from '../img/trainingimg/arrow.optimized.webp';
import valari from '../img/trainingimg/valari.optimized.webp';
import kalamRecord from '../img/record/kbor4.optimized.webp';
import record from '../img/record/18hrs1.optimized.webp';
import trainer1 from '../img/staff/VikiPhoto.optimized.webp';
import trainer2 from '../img/staff/Prem.optimized.webp';
import trainer3 from '../img/staff/Dinesh.optimized.webp';
import federation from '../img/AFFILIATIONS/International_Silambam_Federation.avif';
import indiaFederation from '../img/AFFILIATIONS/Silambam_Federation _of_India.avif';
import tamilFederation from '../img/AFFILIATIONS/TamilNadu_Silambam_Federation.avif';
import yogaAssociation from '../img/AFFILIATIONS/iya.optimized.webp';

const programs = [
  { name: 'Silambam', type: 'THE ART OF THE STAFF', image: silambam, description: 'Find your flow. Build your strength. Carry a tradition forward.', className: 'silambam' },
  { name: 'Adimurai', type: 'STRENGTH WITH PURPOSE', image: adimurai, description: 'Develop confidence through the art of traditional self-defense.', className: 'adimurai' },
  { name: 'Wrestling', type: 'STRENGTH MEETS STRATEGY', image: wrestling, description: 'Build raw power, endurance, and mental toughness through ground control.', className: 'wrestling' },
  { name: 'Karate', type: 'MOVE WITH CONFIDENCE', image: karate, description: 'Master physical control, lightning reflexes, and purposeful movement.', className: 'karate' },
  { name: 'Yoga', type: 'BALANCE FROM WITHIN', image: yoga, description: 'Reconnect with your body. Make room for a calmer, focused mind.', className: 'yoga' },
  { name: 'Archery', type: 'FOCUS IN EVERY MOMENT', image: archery, description: 'Turn patience and precision into your next personal best.', className: 'archery' },
  { name: 'Valari', type: 'KEEP A LEGACY ALIVE', image: valari, description: 'Master traditional Tamil weapon throwing with accuracy and poise.', className: 'valari' },
];

export default function Home() {
  const heroRef = useHeroMotion();
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollDisciplines = useCallback((direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector('.h-program');
    const step = card ? card.offsetWidth + 22 : 332;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (direction > 0) {
      if (el.scrollLeft >= maxScroll - 15) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    } else {
      if (el.scrollLeft <= 15) {
        el.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: -step, behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const timer = setInterval(() => {
      scrollDisciplines(1);
    }, 3200);

    return () => clearInterval(timer);
  }, [isPaused, scrollDisciplines]);
  return (
    <div className="home">
      <section ref={heroRef} className="h-hero" aria-labelledby="hero-title">
        <img className="h-hero-image" src="/images/silambam-hero.webp" width="1536" height="1024" alt="Silambam athlete holding a bamboo staff in a focused training stance" fetchPriority="high" />
        <div className="h-hero-shade" />
        <div className="h-hero-content">
          <span className="eyebrow h-hero-eyebrow"><span /> ROOTED IN HERITAGE. DRIVEN BY YOU.</span>
          <h1 id="hero-title" aria-label="Ancient roots. Modern warriors."><span className="h-title-line"><span>Ancient roots.</span></span><span className="h-title-line"><span>Modern</span></span><span className="h-title-line"><span>warriors.</span></span></h1>
          <p>Discover the strength that’s already in you. Traditional martial arts. Expert guidance. A community that moves you forward.</p>
          <div className="h-hero-actions">
            <Link to="/contact" className="button button-lime">Start your journey <FiArrowUpRight aria-hidden="true" /></Link>
            <Link to="/Training" className="h-hero-secondary">Explore our training <FiArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="h-hero-community">
            <div className="h-avatars" aria-hidden="true"><img src={trainer1} alt="" /><img src={trainer2} alt="" /><img src={trainer3} alt="" /></div>
            <div><strong>300+ students. One shared passion.</strong><span>Your next chapter starts here.</span></div>
          </div>
        </div>
        <div className="h-hero-location"><span /> MADURAI, TAMIL NADU</div>
        <div className="h-hero-caption"><span>THE ART OF SILAMBAM</span><p>More than movement.<br /><strong>A way of life.</strong></p></div>
        <a href="#disciplines" className="h-scroll" aria-label="Discover our disciplines"><FiArrowDown aria-hidden="true" /></a>
        <div className="h-hero-bottom"><span>TRADITION IN EVERY MOVE. POSSIBILITY IN EVERY STEP.</span><span>EST. 2019</span></div>
      </section>

      <section className="h-stats h-wrap" aria-label="Our academy at a glance">
        <p>A proud legacy.<br /><strong>A growing community.</strong></p>
        <div><strong><CountUp value={300} /><span>+</span></strong><span>PASSIONATE STUDENTS</span></div>
        <div><strong><CountUp value={20} /><span>+</span></strong><span>BRANCHES IN TAMIL NADU</span></div>
        <div><strong><CountUp value={7} digits={2} /></strong><span>DISCIPLINES TO EXPLORE</span></div>
      </section>

      <section className="h-event h-wrap"><span className="h-event-icon"><FiAward aria-hidden="true" /></span><div><span className="eyebrow">STEP INTO YOUR NEXT CHALLENGE</span><h3>Wrestling Camp 2026</h3><p>Explore the camp details and register your interest.</p></div><a className="h-text-link" href="https://docs.google.com/forms/d/e/1FAIpQLScQ_u_yx2iqRHbmpP-i4wNhNgdpOsGQc_PLjVZhjYBtphA_vw/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer">View camp registration <FiArrowUpRight aria-hidden="true" /></a></section>

      <section className="h-section h-programs" id="disciplines" aria-labelledby="disciplines-title">
        <div className="h-wrap">
          <div className="h-section-heading">
            <div>
              <span className="eyebrow">FIND YOUR DISCIPLINE</span>
              <h2 id="disciplines-title">Different paths.<br />One stronger you.</h2>
            </div>
            <div className="h-heading-aside">
              <p>From the power of Silambam to the stillness of yoga. Find the practice that moves you.</p>
              <div className="h-programs-header-actions">
                <Link className="h-text-link" to="/Training">Explore all disciplines <FiArrowUpRight aria-hidden="true" /></Link>
                <div className="h-scroll-controls" aria-label="Scroll disciplines">
                  <button type="button" className="h-scroll-btn" onClick={() => scrollDisciplines(-1)} aria-label="Previous disciplines">
                    <FiArrowLeft aria-hidden="true" />
                  </button>
                  <button type="button" className="h-scroll-btn" onClick={() => scrollDisciplines(1)} aria-label="Next disciplines">
                    <FiArrowRight aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="h-program-grid"
            ref={scrollRef}
            tabIndex="0"
            role="region"
            aria-label="Disciplines carousel with auto scroll. Hover or focus to pause, or use arrow buttons."
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            {programs.map((program, i) => (
              <Link to={'/Training#' + program.name.toLowerCase()} className={'h-program h-program-' + program.className} key={program.name}>
                <div className="h-program-art">
                  <span className="h-program-index">0{i + 1}</span>
                  <img src={program.image} alt="" loading="lazy" />
                  <span className="h-program-art-label">{program.type}</span>
                </div>
                <div className="h-program-body">
                  <div>
                    <h3>{program.name}</h3>
                    <span className="h-program-arrow"><FiArrowUpRight aria-hidden="true" /></span>
                  </div>
                  <p>{program.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="h-values-strip" aria-label="Discipline, confidence, community and heritage"><span>DISCIPLINE</span><span aria-hidden="true">✳</span><span>CONFIDENCE</span><span aria-hidden="true">✳</span><span>COMMUNITY</span><span aria-hidden="true">✳</span><span>HERITAGE</span><span aria-hidden="true">✳</span></div>

      <section className="h-section h-wrap h-story" aria-labelledby="story-title">
        <div className="h-story-visual"><img src={kalamRecord} alt="Silambam Shadows students holding their United Kalam Book of Records certificates and medals for the 75-minute non-stop Silambam record" loading="lazy" /><div className="h-story-tag"><FiAward aria-hidden="true" /><p>United Kalam Record<br /><strong>75 Min · 75 Sec</strong></p></div><span className="h-image-footnote">UNITED KALAM BOOK OF RECORDS · 06 FEBRUARY 2022</span></div>
        <div className="h-story-content"><span className="eyebrow">UNITED KALAM BOOK OF RECORDS</span><h2 id="story-title">75 minutes. 75 seconds.<br />A historic tribute in motion.</h2><p>On February 6, 2022, students of Silambam Shadows came together to set a record with the United Kalam Book of Records, performing continuous, non-stop Silambam staff rotation for 75 minutes and 75 seconds to commemorate India’s 75th independence year anniversary.</p><p>From young beginners to senior trainees, our students demonstrated remarkable stamina, focus, and synchronization—earning official record certificates and medals for carrying our traditional art forward.</p><div className="h-benefits"><div><FiAward aria-hidden="true" /><span>United Kalam Record</span></div><div><FiTarget aria-hidden="true" /><span>75m · 75s Non-Stop</span></div><div><FiUsers aria-hidden="true" /><span>Mass Student Feat</span></div><div><FiShield aria-hidden="true" /><span>75th Year Tribute</span></div></div><Link className="h-text-link" to="/Record">Explore our records <FiArrowUpRight aria-hidden="true" /></Link></div>
      </section>

      <section className="h-achievement-section">
        <div className="h-wrap">
          <div className="h-section-heading"><div><span className="eyebrow">DEDICATION THAT GOES THE DISTANCE</span><h2>Beyond practice.<br />Beyond limits.</h2></div><Link className="h-text-link" to="/Record">Our achievements <FiArrowUpRight aria-hidden="true" /></Link></div>
          <div className="h-record"><div className="h-record-copy"><span className="h-record-label"><FiAward aria-hidden="true" /> OSCAR WORLD RECORDS</span><div className="h-record-number">18<span>HOURS</span></div><h3>One incredible feat.<br />Unwavering determination.</h3><p>Rishi Prasanna’s 18-hour blindfolded, non-stop Silambam staff rotation. A testament to what focused practice can achieve.</p><div className="h-record-bottom"><span>02 OCTOBER 2022</span><Link to="/Record" aria-label="Explore our world records"><FiArrowUpRight aria-hidden="true" /></Link></div></div><img src={record} alt="Rishi Prasanna with his trainer at the 18-hour blindfolded Silambam world record event" loading="lazy" /></div>
        </div>
      </section>

      <section className="h-section h-wrap" aria-labelledby="gallery-title"><div className="h-section-heading"><div><span className="eyebrow">LIFE AT SILAMBAM SHADOWS</span><h2 id="gallery-title">Every moment.<br />Part of the journey.</h2></div><p className="h-gallery-intro">The milestones, the friendships, and everything in between. A glimpse into our world.</p></div><PhotoGallery /></section>

      <section className="h-affiliations h-wrap" aria-label="Our affiliations"><span className="eyebrow">CONNECTED BY A SHARED PURPOSE</span><div>{[[federation, 'International Silambam Federation'], [indiaFederation, 'Silambam Federation of India'], [tamilFederation, 'Tamil Nadu Silambam Federation'], [yogaAssociation, 'Indian Yoga Association']].map(([src, name]) => <Link to="/Affiliation" key={name}><img src={src} alt="" loading="lazy" /><span>{name}</span></Link>)}</div></section>

      <section className="h-cta h-wrap" aria-labelledby="cta-title"><div className="h-cta-pattern" aria-hidden="true"><span /><span /><span /></div><div><span className="eyebrow">YOUR FIRST STEP CHANGES EVERYTHING</span><h2 id="cta-title">Your story of strength<br />starts <em>here.</em></h2><p>Bring your curiosity. We’ll help you find your path.</p></div><Link className="button button-forest" to="/contact">Let’s get started <FiArrowUpRight aria-hidden="true" /></Link></section>
    </div>
  );
}

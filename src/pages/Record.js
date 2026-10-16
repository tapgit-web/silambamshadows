import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiAward } from 'react-icons/fi';
import oscar from '../img/record/oscar.avif';
import kalam from '../img/record/uk.optimized.webp';
import achievers from '../img/record/sa.optimized.webp';
import hours18a from '../img/record/18hrs1.optimized.webp';
import hours18b from '../img/record/18hrs2.optimized.webp';
import hours18c from '../img/record/18hrs4.optimized.webp';
import kalam1 from '../img/record/kbor1.optimized.webp';
import kalam2 from '../img/record/kbor2.optimized.webp';
import kalam3 from '../img/record/kbor3.optimized.webp';
import hours5a from '../img/record/sboa1.optimized.webp';
import hours5b from '../img/record/sboa2.optimized.webp';
import hours5c from '../img/record/sboa3.optimized.webp';
import hours5d from '../img/record/sboa4.optimized.webp';
import hours3a from '../img/record/sboa_r1.optimized.webp';
import hours3b from '../img/record/sboa_r2.optimized.webp';
import hours3c from '../img/record/sboa_r3.optimized.webp';
import hours3d from '../img/record/sboa_r4.optimized.webp';
import '../style/inner-pages.css';

const records = [
  { organization: 'Oscar World Records', date: 'October 2, 2022', dateTime: '2022-10-02', title: '18 hours. Blindfolded. Unstoppable.', description: 'Rishi Prasanna completed 18 hours of non-stop Silambam stick rotation while blindfolded.', metric: '18 hours', icon: oscar, images: [hours18c, hours18a, hours18b] },
  { organization: 'Silambam Books of Achievers', date: 'August 14, 2022', dateTime: '2022-08-14', title: 'Five hours of extraordinary focus.', description: 'A five-hour Silambam stick rotation achievement, celebrating patience, perseverance, and the power of practice.', metric: '5 hours', icon: achievers, images: [hours5a, hours5b, hours5c, hours5d] },
  { organization: 'Silambam Books of Achievers', date: 'July 27, 2022', dateTime: '2022-07-27', title: 'A milestone earned with every rotation.', description: 'Three hours of Silambam stick rotation, bringing dedication and our traditional art into the spotlight.', metric: '3 hours', icon: achievers, images: [hours3a, hours3b, hours3c, hours3d] },
  { organization: 'United Kalam Books of Records', date: 'February 6, 2022', dateTime: '2022-02-06', title: 'A tribute to 75 years of independence.', description: 'Silambam performed for 75 minutes and 75 seconds to mark India’s 75th independence year anniversary.', metric: '75 min · 75 sec', icon: kalam, images: [kalam1, kalam2, kalam3] },
];

function Achievement({ record }) {
  const [current, setCurrent] = useState(0);
  const move = (direction) => setCurrent((value) => (value + direction + record.images.length) % record.images.length);
  return <article className="ip-record-card">
    <div className="ip-record-image"><img src={record.images[current]} alt={`${record.organization} achievement, moment ${current + 1} of ${record.images.length}`} loading="lazy" /><span className="ip-record-metric"><FiAward aria-hidden="true" />{record.metric}</span><div className="ip-record-controls"><button type="button" onClick={() => move(-1)} aria-label={`Previous photo of ${record.organization} ${record.date}`}><FiArrowLeft aria-hidden="true" /></button><span aria-live="polite">{current + 1} / {record.images.length}</span><button type="button" onClick={() => move(1)} aria-label={`Next photo of ${record.organization} ${record.date}`}><FiArrowRight aria-hidden="true" /></button></div></div>
    <div className="ip-record-body"><time dateTime={record.dateTime}>{record.date}</time><h2>{record.title}</h2><p>{record.description}</p><div className="ip-record-organization"><img src={record.icon} alt="" loading="lazy" /><span>{record.organization}</span></div></div>
  </article>;
}

export default function Record() {
  return <div className="ip-page">
    <header className="ip-intro ip-container"><div className="ip-breadcrumb"><Link to="/">Home</Link><span>/</span><span>Our records</span></div><p className="ip-eyebrow">DEDICATION, WRITTEN IN HISTORY</p><h1>Beyond limits.<br /><span>Into the record books.</span></h1><p className="ip-intro-copy">Every achievement begins with a single practice. These are the moments when our students turned years of dedication into something extraordinary.</p></header>
    <section className="ip-container ip-record-grid" aria-label="Academy achievements">{records.map((record) => <Achievement key={record.date} record={record} />)}</section>
    <section className="ip-container ip-plain-note"><p className="ip-eyebrow">THE JOURNEY CONTINUES</p><h2>Great things begin<br />with showing up.</h2><Link className="ip-text-link" to="/Training">Find your training program<FiArrowRight aria-hidden="true" /></Link></section>
  </div>;
}

import { useState } from 'react';
import { FiArrowUpRight, FiPlus, FiMinus } from 'react-icons/fi';
import { galleryData } from './data';
import ImageModal from './ImageModal';
import './PhotoGallery.css';

const sections = [
  ['tournaments', 'On the ground'],
  ['papercuts', 'In the news'],
];
const captions = {
  tournaments: ['A moment of determination', 'Celebrating every milestone', 'The power of practice', 'Together, we go further', 'Keeping our heritage alive', 'A community of achievers'],
  papercuts: ['Featured in Dina Sangu', 'Featured in Kalai Thamilagam', 'Featured in Seithi Alasal', 'Featured in Udaga Malar', 'Featured in Urimai Kural'],
};
const gallery = Object.fromEntries(Object.entries(galleryData).map(([key, items]) => [key, items.map((item, index) => ({ ...item, alt: captions[key][index] }))]));

export default function PhotoGallery() {
  const [section, setSection] = useState('tournaments');
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState(null);
  const images = gallery[section];
  const visible = showAll ? images : images.slice(0, 3);
  const changeSection = (next) => { setSection(next); setShowAll(false); setSelected(null); };
  return (
    <div className="sg-gallery">
      <div className="sg-toolbar">
        <div className="sg-filters" role="group" aria-label="Gallery category">{sections.map(([key, label]) => <button type="button" key={key} aria-pressed={section === key} onClick={() => changeSection(key)} className={section === key ? 'sg-filter sg-active' : 'sg-filter'}>{label}</button>)}</div>
        <span className="sg-count" aria-live="polite">{images.length} moments to explore</span>
      </div>
      <div className="sg-grid">
        {visible.map((item, index) => <button className={'sg-photo sg-photo-' + section} key={item.src} type="button" onClick={() => setSelected(index)} aria-label={'Enlarge photo: ' + item.alt}><img src={item.src} alt={item.alt} loading="lazy" /><span className="sg-photo-caption"><span>{item.alt}</span><FiArrowUpRight aria-hidden="true" /></span></button>)}
      </div>
      <button type="button" className="sg-view-more" onClick={() => setShowAll((previous) => !previous)} aria-expanded={showAll}>{showAll ? 'Show fewer moments' : 'View more moments'}{showAll ? <FiMinus aria-hidden="true" /> : <FiPlus aria-hidden="true" />}</button>
      <ImageModal images={images} index={selected} onClose={() => setSelected(null)} onNavigate={(direction) => setSelected((previous) => (previous + direction + images.length) % images.length)} />
    </div>
  );
}

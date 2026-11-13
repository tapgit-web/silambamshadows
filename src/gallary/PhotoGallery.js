import { useState } from 'react';
import { FiArrowUpRight, FiPlus, FiMinus } from 'react-icons/fi';
import { galleryData } from './data';
import ImageModal from './ImageModal';
import './PhotoGallery.css';

const captions = [
  'Featured in Dina Sangu',
  'Featured in Kalai Thamilagam',
  'Featured in Seithi Alasal',
  'Featured in Udaga Malar',
  'Featured in Urimai Kural',
];

const newsImages = galleryData.papercuts.map((item, index) => ({
  ...item,
  alt: captions[index] || 'News feature',
}));

export default function PhotoGallery() {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState(null);
  const visible = showAll ? newsImages : newsImages.slice(0, 3);

  return (
    <div className="sg-gallery">
      <div className="sg-toolbar">
        <div className="sg-filters" aria-label="Gallery category">
          <span className="sg-filter sg-active">In the news</span>
        </div>
        <span className="sg-count" aria-live="polite">{newsImages.length} news features to explore</span>
      </div>
      <div className="sg-grid">
        {visible.map((item, index) => (
          <button
            className="sg-photo sg-photo-papercuts"
            key={item.src}
            type="button"
            onClick={() => setSelected(index)}
            aria-label={'Enlarge news feature: ' + item.alt}
          >
            <img src={item.src} alt={item.alt} loading="lazy" />
            <span className="sg-photo-caption">
              <span>{item.alt}</span>
              <FiArrowUpRight aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
      <button
        type="button"
        className="sg-view-more"
        onClick={() => setShowAll((previous) => !previous)}
        aria-expanded={showAll}
      >
        {showAll ? 'Show fewer news' : 'View more news'}
        {showAll ? <FiMinus aria-hidden="true" /> : <FiPlus aria-hidden="true" />}
      </button>
      <ImageModal
        images={newsImages}
        index={selected}
        onClose={() => setSelected(null)}
        onNavigate={(direction) =>
          setSelected((previous) => (previous + direction + newsImages.length) % newsImages.length)
        }
      />
    </div>
  );
}

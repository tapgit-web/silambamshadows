import { useEffect, useRef } from 'react';
import { FiX, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import './ImageModal.css';

export default function ImageModal({ images, index, onClose, onNavigate }) {
  const dialogRef = useRef(null);
  const image = index === null ? null : images[index];
  const isOpen = Boolean(image);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="sg-dialog" aria-label="Academy photo gallery" onClose={onClose} onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={(event) => { if (event.key === 'ArrowRight') { event.preventDefault(); onNavigate(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); onNavigate(-1); } }}>
      {image && <div className="sg-lightbox">
        <div className="sg-lightbox-top"><span>SILAMBAM SHADOWS / OUR JOURNEY</span><button type="button" onClick={onClose} aria-label="Close gallery"><FiX aria-hidden="true" /></button></div>
        <figure><img key={image.src} src={image.src} alt={image.alt} /><figcaption>{image.alt}</figcaption></figure>
        <div className="sg-lightbox-controls"><button type="button" onClick={() => onNavigate(-1)} aria-label="Previous photo"><FiArrowLeft aria-hidden="true" /></button><span aria-live="polite">{index + 1} / {images.length}</span><button type="button" onClick={() => onNavigate(1)} aria-label="Next photo"><FiArrowRight aria-hidden="true" /></button></div>
      </div>}
    </dialog>
  );
}

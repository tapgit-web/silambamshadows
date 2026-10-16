import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './motion.css';

const revealSelector = [
  '.h-section-heading', '.h-program', '.h-story-visual', '.h-story-content',
  '.h-record', '.h-event', '.h-affiliations', '.h-cta', '.sg-photo',
  '.ip-intro', '.ip-program-card', '.ip-staff-card', '.ip-team-note',
  '.ip-record-card', '.ip-affiliation-card', '.ip-founder-image',
  '.ip-founder-story', '.ip-about-numbers', '.ip-values-grid article',
  '.ip-contact-form-panel', '.ip-contact-aside', '.ip-map-section',
  '.ip-faq-section', '.ip-bottom-cta', '.ip-plain-note',
].join(',');

// One observer per page. Animate only when a section enters view, then release it.
// Content remains readable if animation APIs or JavaScript are unavailable.
export default function PageMotion({ children }) {
  const rootRef = useRef(null);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const root = rootRef.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!root || !window.IntersectionObserver || !Element.prototype.animate) return undefined;
    const seen = new WeakSet();
    const animations = new Set();
    const cancelAnimations = () => {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        if (preference.matches) return;
        const siblings = Array.from(target.parentElement.children);
        const isCard = target.matches('.h-program, .sg-photo, .ip-program-card, .ip-staff-card, .ip-record-card, .ip-affiliation-card');
        const animation = target.animate(
          [{ opacity: 0, transform: 'translate3d(0, 26px, 0)' }, { opacity: 1, transform: 'translate3d(0, 0, 0)' }],
          { duration: 720, delay: isCard ? (siblings.indexOf(target) % 4) * 65 : 0, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' }
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
        animation.oncancel = () => animations.delete(animation);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 45px 0px' });

    const observe = (node) => {
      if (!(node instanceof Element)) return;
      const elements = [...(node.matches(revealSelector) ? [node] : []), ...node.querySelectorAll(revealSelector)];
      elements.forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        observer.observe(element);
      });
    };
    observe(root);
    // Newly filtered cards and expanded gallery items get the same entrance.
    const mutations = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach(observe)));
    mutations.observe(root, { childList: true, subtree: true });
    const onPreferenceChange = () => { if (preference.matches) cancelAnimations(); };
    preference.addEventListener('change', onPreferenceChange);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      preference.removeEventListener('change', onPreferenceChange);
      cancelAnimations();
    };
  }, [pathname]);

  return <div ref={rootRef} className="page-motion">{children}</div>;
}

import { useEffect, useRef } from 'react';

export default function CountUp({ value, digits = 1 }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!window.IntersectionObserver || preference.matches) return undefined;
    let frame = 0;
    const finish = () => {
      cancelAnimationFrame(frame);
      element.textContent = String(value).padStart(digits, '0');
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / 1150, 1);
        const current = Math.round(value * (1 - Math.pow(1 - progress, 4)));
        element.textContent = String(current).padStart(digits, '0');
        if (progress < 1 && !preference.matches) frame = requestAnimationFrame(tick);
        else finish();
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: .8 });
    observer.observe(element);
    preference.addEventListener('change', finish);
    return () => { observer.disconnect(); finish(); preference.removeEventListener('change', finish); };
  }, [value, digits]);
  return <span className="count-up" ref={ref}>{String(value).padStart(digits, '0')}</span>;
}

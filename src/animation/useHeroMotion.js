import { useEffect, useRef } from 'react';

export default function useHeroMotion() {
  const heroRef = useRef(null);
  useEffect(() => {
    const hero = heroRef.current;
    const image = hero?.querySelector('.h-hero-image');
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    if (!hero || !image) return undefined;
    let frame = 0;
    let lastTime = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      x = y = targetX = targetY = 0;
      image.style.removeProperty('transform');
    };
    const tick = (time) => {
      const smoothing = 1 - Math.pow(.87, Math.min(time - lastTime || 16.7, 40) / 16.7);
      lastTime = time;
      x += (targetX - x) * smoothing;
      y += (targetY - y) * smoothing;
      image.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(1.035)`;
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > .03 ? requestAnimationFrame(tick) : 0;
    };
    const start = () => { if (!frame) { lastTime = 0; frame = requestAnimationFrame(tick); } };
    const move = (event) => {
      if (preference.matches || !finePointer.matches) return;
      const rect = hero.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - .5) * 12;
      targetY = ((event.clientY - rect.top) / rect.height - .5) * 8;
      start();
    };
    const leave = () => { if (preference.matches || !finePointer.matches) return; targetX = targetY = 0; start(); };
    const onVisibility = () => { if (document.hidden) stop(); };
    hero.addEventListener('pointermove', move, { passive: true });
    hero.addEventListener('pointerleave', leave);
    preference.addEventListener('change', stop);
    finePointer.addEventListener('change', stop);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', leave);
      preference.removeEventListener('change', stop);
      finePointer.removeEventListener('change', stop);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);
  return heroRef;
}

import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import ScrollToTop from './ScrollToTop';
import Home from '../pages/Home';
import Nav from '../menu/Nav';
import Footer from '../pages/Footer';
import PageMotion from '../animation/PageMotion';

const Training = lazy(() => import('../pages/Training'));
const StaffList = lazy(() => import('../pages/StaffList'));
const Record = lazy(() => import('../pages/Record'));
const Affiliation = lazy(() => import('../pages/Affiliation').then(module => ({ default: module.Affiliation })));
const Contact = lazy(() => import('../pages/Contact').then(module => ({ default: module.Contact })));
const About = lazy(() => import('../pages/About').then(module => ({ default: module.About })));

function PageTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const titles = { '/': 'Ancient roots. Modern warriors.', '/training': 'Our disciplines', '/trainers': 'Meet your trainers', '/record': 'Our achievements', '/affiliation': 'Our affiliations', '/about': 'Our story', '/contact': 'Start your journey' };
    document.title = (titles[pathname.toLowerCase()] || 'Page not found') + ' | Silambam Shadows';
  }, [pathname]);
  return null;
}

function SiteRoutes() {
  const { pathname } = useLocation();
  return <Suspense fallback={<div className="route-loading" role="status"><i aria-hidden="true" /><span>FINDING YOUR NEXT STEP…</span></div>}>
    <PageMotion key={pathname}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Training" element={<Training />} />
        <Route path="/trainers" element={<StaffList />} />
        <Route path="/Record" element={<Record />} />
        <Route path="/Affiliation" element={<Affiliation />} />
        <Route path="/About" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<section className="not-found"><span className="eyebrow">A little off the path</span><h1>Let’s find your way back.</h1><p>The page you’re looking for isn’t here.</p><Link className="button button-forest" to="/">Back to home <span aria-hidden="true">↗</span></Link></section>} />
      </Routes>
    </PageMotion>
  </Suspense>;
}

export const Routerfile1 = () => (
  <BrowserRouter>
    <PageTitle />
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header"><Nav /></header>
    <main id="main-content" tabIndex="-1">
      <SiteRoutes />
    </main>
    <Footer />
  </BrowserRouter>
);

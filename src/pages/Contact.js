import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiArrowUpRight, FiMapPin, FiPhone, FiMail, FiArrowRight } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import '../style/inner-pages.css';

const FORM_BASE = 'https://docs.google.com/forms/d/e/1FAIpQLSfAg9BagaXUmVDOAHL5iW_7kGpBGZnfaW_A5VX_8xa1uhM8nQ';
const ENTRY_NAME = 'entry.1761238309';
const ENTRY_EMAIL = 'entry.306920288';
const ENTRY_PHONE = 'entry.1914095922';
const ENTRY_ADDRESS = 'entry.1126123725';
const ENTRY_INTEREST = 'entry.358377344';
const programs = ['Silambam', 'Yoga', 'Archery', 'Wrestling', 'Karate', 'Valari', 'Adimurai', 'Others'];
const MAP_URL = 'https://www.google.com/maps/place/Silambam+Shadows/@9.9503547,78.1119092,17z/data=!3m1!4b1!4m6!3m5!1s0x3b00cf7fb7d333a1:0x2f5bfceea587776b!8m2!3d9.9503494!4d78.1144841!16s%2Fg%2F11b7q7pj14!5m1!1e2?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D';

export const Contact = () => {
  const [searchParams] = useSearchParams();
  const requestedProgram = searchParams.get('program') || '';
  const [fields, setFields] = useState({ name: '', email: '', phone: '', address: '', interest: '' });
  const [status, setStatus] = useState('idle');
  useEffect(() => {
    const match = programs.find((program) => program.toLowerCase() === requestedProgram.toLowerCase());
    if (match) setFields((previous) => ({ ...previous, interest: match }));
  }, [requestedProgram]);

  const update = (event) => {
    const { name, value } = event.target;
    setFields((previous) => ({ ...previous, [name]: value }));
    if (status !== 'sending') setStatus('idle');
  };
  const formValues = () => {
    const otherDiscipline = ['Karate', 'Valari'].includes(fields.interest);
    return {
      [ENTRY_NAME]: fields.name.trim(), [ENTRY_EMAIL]: fields.email.trim(), [ENTRY_PHONE]: fields.phone.trim(),
      [ENTRY_ADDRESS]: `${fields.address.trim()}${otherDiscipline ? `\nProgram of interest: ${fields.interest}` : ''}`,
      [ENTRY_INTEREST]: otherDiscipline ? 'OTHERS' : fields.interest.toUpperCase(),
    };
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }
    setStatus('sending');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const data = new FormData();
    Object.entries(formValues()).forEach(([key, value]) => data.append(key, value));
    try {
      await fetch(`${FORM_BASE}/formResponse?usp=publish-editor`, { method: 'POST', mode: 'no-cors', body: data, signal: controller.signal });
      setStatus('submitted');
    } catch {
      setStatus('error');
    } finally {
      clearTimeout(timeout);
    }
  };
  const directFormUrl = `${FORM_BASE}/viewform?${new URLSearchParams({ usp: 'pp_url', ...formValues() }).toString()}`;

  return <div className="ip-page">
    <header className="ip-intro ip-container"><div className="ip-breadcrumb"><Link to="/">Home</Link><span>/</span><span>Get in touch</span></div><p className="ip-eyebrow">EVERY JOURNEY STARTS WITH A CONVERSATION</p><h1>Your next chapter.<br /><span>Let’s begin it together.</span></h1><p className="ip-intro-copy">Curious about a program, looking for your nearest branch, or ready to begin? We would love to hear from you.</p></header>
    <section className="ip-container ip-contact-layout">
      <div className="ip-contact-form-panel"><p className="ip-eyebrow">TAKE THE FIRST STEP</p><h2>Tell us a little about you.</h2><p className="ip-form-intro">Leave your details and our team can help you find your fit.</p>
        <form className="ip-enquiry-form" onSubmit={handleSubmit}>
          <fieldset className="ip-form-fields" disabled={status === 'sending'}><legend className="ip-sr-only">Your contact details and training interests</legend>
            <div className="ip-form-field"><label htmlFor="ip-name">Full name <span>*</span></label><input id="ip-name" name="name" value={fields.name} onChange={update} autoComplete="name" placeholder="Your full name" minLength="2" maxLength="100" required /></div>
            <div className="ip-form-field"><label htmlFor="ip-email">Email address <span>*</span></label><input id="ip-email" name="email" type="email" value={fields.email} onChange={update} autoComplete="email" placeholder="you@example.com" required /></div>
            <div className="ip-form-field"><label htmlFor="ip-phone">Phone number <span>*</span></label><input id="ip-phone" name="phone" type="tel" value={fields.phone} onChange={update} autoComplete="tel" placeholder="Your phone number" pattern="[+0-9 \(\)\-]{7,20}" title="Enter a phone number using 7–20 digits, spaces, parentheses, plus or hyphen characters." required /></div>
            <div className="ip-form-field"><label htmlFor="ip-program">I’m interested in <span>*</span></label><select id="ip-program" name="interest" value={fields.interest} onChange={update} required><option value="">Choose a program</option>{programs.map((program) => <option value={program} key={program}>{program === 'Others' ? 'Help me choose' : program}</option>)}</select></div>
            <div className="ip-form-field ip-field-wide"><label htmlFor="ip-address">Address / locality <span>*</span></label><textarea id="ip-address" name="address" rows="3" value={fields.address} onChange={update} autoComplete="street-address" placeholder="Your area and city, so we can guide you to a nearby branch" minLength="3" maxLength="1000" required /></div>
          </fieldset>
          <button className="ip-button ip-button-dark ip-submit" type="submit" disabled={status === 'sending' || status === 'submitted'}>{status === 'sending' ? 'Sending your enquiry…' : status === 'submitted' ? 'Enquiry submitted for delivery' : 'Send your enquiry'}<FiArrowUpRight aria-hidden="true" /></button>
          <div className="ip-form-status" role="status" aria-live="polite">{status === 'submitted' && <p className="ip-status-note">Your enquiry was submitted for delivery. Receipt cannot be confirmed here. Please call us if you do not hear back.</p>}{status === 'error' && <p className="ip-status-error">We could not confirm delivery. Please try the Google Form below or call +91 96881 17646.</p>}</div>
          <p className="ip-form-footnote">Prefer Google Forms? <a href={directFormUrl} target="_blank" rel="noopener noreferrer">Continue with your details <FiArrowUpRight aria-hidden="true" /></a></p>
        </form>
      </div>
      <aside className="ip-contact-aside"><div className="ip-contact-dark"><p className="ip-eyebrow">ALWAYS HAPPY TO CONNECT</p><h2>A conversation away.</h2><a className="ip-contact-method" href="tel:+919688117646"><FiPhone aria-hidden="true" /><span><small>GIVE US A CALL</small>+91 96881 17646</span><FiArrowUpRight aria-hidden="true" /></a><a className="ip-contact-method" href="mailto:silambamshadows@gmail.com"><FiMail aria-hidden="true" /><span><small>DROP US A LINE</small>silambamshadows@gmail.com</span><FiArrowUpRight aria-hidden="true" /></a><div className="ip-contact-address"><FiMapPin aria-hidden="true" /><div><small>COME SAY HELLO</small><h3>Our head office</h3><p>Avatar Aadukalam, Kumaran Nagar,<br />Tangamanal Nagar, Madurai,<br />Tamil Nadu 625017</p><a href={MAP_URL} target="_blank" rel="noopener noreferrer">Get directions<FiArrowUpRight aria-hidden="true" /></a></div></div><div className="ip-social-links"><span>Follow the journey</span><a href="https://www.facebook.com/people/Silambam-Shadows/100063755782546/?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="ip-social-link ip-social-facebook"><FaFacebookF aria-hidden="true" /></a><a href="https://www.instagram.com/silambamshadows?igsh=bzRmcmEwNWVuencz" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="ip-social-link ip-social-instagram"><FaInstagram aria-hidden="true" /></a><a href="https://www.youtube.com/@silambamshadows0208" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="ip-social-link ip-social-youtube"><FaYoutube aria-hidden="true" /></a></div></div>
      <div className="ip-branches"><h3>Closer than you think.</h3><p>Explore our Madurai branches.</p><a href="https://www.google.com/maps?q=9.9386572,78.1236527" target="_blank" rel="noopener noreferrer"><span><FiMapPin aria-hidden="true" />Sellur, Madurai</span><FiArrowUpRight aria-hidden="true" /></a><a href="https://www.google.com/maps/place/9%C2%B059'11.8%22N+78%C2%B006'52.5%22E/@9.9866083,78.1120084,817m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d9.9866083!4d78.1145833!5m1!1e2?hl=en&entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer"><span><FiMapPin aria-hidden="true" />Vagaikulam, Madurai</span><FiArrowUpRight aria-hidden="true" /></a></div></aside>
    </section>
    <section className="ip-container ip-map-section"><div className="ip-map-heading"><div><p className="ip-eyebrow">FIND YOUR WAY HERE</p><h2>Rooted in Madurai.</h2></div><a className="ip-text-link" href={MAP_URL} target="_blank" rel="noopener noreferrer">Open Google Maps<FiArrowUpRight aria-hidden="true" /></a></div><iframe title="Silambam Shadows head office location in Madurai" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.802854777924!2d78.11190917450796!3d9.95035467388806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00cf7fb7d333a1%3A0x2f5bfceea587776b!2sSilambam%20Shadows!5e0!3m2!1sen!2sin!4v1764481136365!5m2!1sen!2sin" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></section>
    <section className="ip-container ip-faq-section"><div><p className="ip-eyebrow">A FEW THINGS YOU MAY BE WONDERING</p><h2>Before your first step.</h2></div><div className="ip-faq-list"><details><summary>Can I join as a complete beginner?<FiArrowRight aria-hidden="true" /></summary><p>Our programs welcome people at different stages of their training journey. Tell us your experience and goals so our team can help you choose a suitable starting point.</p></details><details><summary>Which program is right for me?<FiArrowRight aria-hidden="true" /></summary><p>It depends on your interests and goals. Explore our seven disciplines on the training page, or choose “Help me choose” in the enquiry form and talk it through with our team.</p></details><details><summary>How can I find class times and fees?<FiArrowRight aria-hidden="true" /></summary><p>Contact our team with your preferred program and locality for current class times, availability, and fees at a branch near you.</p></details></div></section>
  </div>;
};

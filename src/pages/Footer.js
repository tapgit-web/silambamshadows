import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaArrowUp } from "react-icons/fa";
import navLogo from "../img/navlogo.png";
import "../style/Footer.css";

export default function Footer() {
  const scrollToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
  };

  return (
    <footer className="sf-footer">
      <div className="sf-inner">
        <div className="sf-main">
          <div className="sf-intro">
            <Link className="sf-brand" to="/" aria-label="Silambam Shadows home">
              <img
                src={navLogo}
                alt="Silambam Shadows"
                className="sf-brand-logo"
                width="168"
                height="58"
              />
            </Link>
            <p className="sf-description">Rooted in tradition.<br />Moving a generation forward.</p>
            <div className="sf-socials" aria-label="Follow Silambam Shadows">
              <a href="https://www.instagram.com/silambamshadows?igsh=bzRmcmEwNWVuencz" target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)"><FaInstagram /></a>
              <a href="https://www.facebook.com/people/Silambam-Shadows/100063755782546/?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" aria-label="Facebook (opens in a new tab)"><FaFacebookF /></a>
              <a href="https://www.youtube.com/@silambamshadows0208" target="_blank" rel="noopener noreferrer" aria-label="YouTube (opens in a new tab)"><FaYoutube /></a>
            </div>
          </div>

          <div className="sf-column">
            <h2 className="sf-heading">The academy</h2>
            <ul className="sf-links">
              <li><Link to="/About">Our story</Link></li>
              <li><Link to="/Training">Training programs</Link></li>
              <li><Link to="/trainers">Meet the masters</Link></li>
              <li><Link to="/Record">Our achievements</Link></li>
              <li><Link to="/Affiliation">Affiliations</Link></li>
            </ul>
          </div>

          <div className="sf-column sf-location">
            <h2 className="sf-heading">Find your ground</h2>
            <p className="sf-address">Avatar Aadukalam, Kumaran Nagar,<br />Tangamanal Nagar, Madurai,<br />Tamil Nadu 625017</p>
            <div className="sf-branches">
              <a href="https://www.google.com/maps?q=9.9386572,78.1236527" target="_blank" rel="noopener noreferrer">Sellur branch <span aria-hidden="true">↗</span></a>
              <a href="https://www.google.com/maps?q=9.9866083,78.1145833" target="_blank" rel="noopener noreferrer">Vagaikulam branch <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className="sf-column sf-contact">
            <h2 className="sf-heading">Let's connect</h2>
            <a className="sf-phone" href="tel:+919688117646">+91 96881 17646</a>
            <a className="sf-email" href="mailto:silambamshadows@gmail.com">silambamshadows@gmail.com</a>
            <Link className="sf-contact-link" to="/contact">Come train with us <span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <div className="sf-bottom">
          <p>© {new Date().getFullYear()} Silambam Shadows. All rights reserved.</p>
          <span className="sf-made">Made for the warrior within.</span>
          <button className="sf-top" type="button" onClick={scrollToTop}>Back to top <FaArrowUp aria-hidden="true" /></button>
        </div>
      </div>
    </footer>
  );
}

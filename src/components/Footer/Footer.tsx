

// export default Footer;
import GLLogo from "../../assets/gl-john-logo.png";
import { Link, useLocation } from 'react-router-dom';
import "./Footer.css";
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';


const scrollToTop = () => {
  window.scrollTo(0, 0);
}

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const yOffset = -70; // Adjust this value according to your fixed header height
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

const Footer = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        scrollToSection(hash.substring(1));
      }, 300); // Add a slight delay to ensure the section is rendered
    }
  }, [location]);

  return (
    <>
      <div className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h2>
              <Link to="/mainpage" onClick={scrollToTop}>Garden Loft Backyard Suites</Link>
            </h2>
            <h3>
              <Link to="/learn-more#safety-support">Our Support Features</Link>
            </h3>
            <h3>
              <Link to="/mainpage#garden-loft-advantage">The Garden Loft Advantage</Link>
            </h3>
            <h3>
              <Link to="/learn-more#award">Our 2024 Award</Link>
            </h3>
            {/* <h3>
              <Link to="/#two-units">Our Units</Link>
            </h3> */}
            <h3><Link to="/mainpage#two-units" onClick={() => scrollToSection('two-units')}>Our Units</Link></h3>

            <h3>
              <Link to="/mainpage#projects">Our Projects</Link>
            </h3>
            <h3>
              <Link to="/mainpage#installation">Our Installation Process</Link>
            </h3>
            <h3>
              <Link to="/learn-more#compare-costs">Compare Our Costs</Link>
            </h3>
            <h3>
              <Link to="/learn-more#finance-options"onClick={scrollToTop}>Finance Options</Link>
            </h3>
            <h3>
              <Link to="/learn-more#new-zoning-rules">New Zoning Rules</Link>
            </h3>
            <h3>
              <Link to="/mainpage#garden-lofters">Meet Our Garden Lofters</Link>
            </h3>
            <h3>
              <Link to="/reselling" onClick={scrollToTop}>Reselling Your Garden Loft</Link>
            </h3>
          </div>
          <div className="footer-column">
            <h2>
              <Link to="/village" onClick={scrollToTop}>Garden Loft Villages</Link>
            </h2>
            <h2>
              <Link to="/atrium" onClick={scrollToTop}>Atrium House by Garden Loft</Link>
            </h2>
            <h2>
              <Link to="/about" onClick={scrollToTop}>About Us</Link>
            </h2>
            <h3>
              <Link to="/about#our-team">Our Team</Link>
            </h3>
            <h3>
              <Link to="/about#our-history">Our Professional History
              </Link>
              </h3>
            <h3>
              <Link to="/about#research">Our Research History</Link>
            </h3>
            <h3>
              <Link to="/about#our-partners">Our Partners</Link>
            </h3>
            <h2>
              <Link to="/learn-more" onClick={scrollToTop}>Learn More</Link>
            </h2>
            <h2>
              <Link to="/faq" onClick={scrollToTop}>FAQ</Link>
            </h2>
          </div>
          <div className="footer-column">
            <h2>Request a:</h2>
            <div>
              <h3>
                <Link to="/phone-call" onClick={scrollToTop}>Phone Call</Link>
              </h3>
              <h3>
                <Link to="/brochure" onClick={scrollToTop}>Brochure</Link>
              </h3>
              <h3>
                <Link to="/feasibility-report" onClick={scrollToTop}>Feasibility Report</Link>
              </h3>
              <h3>
                <Link to="/book-tour" onClick={scrollToTop}>Book A Tour</Link>
              </h3>
              <h3>
                <Link to="/initial" onClick={scrollToTop}>Initial Meeting</Link>
              </h3>
              <h3>
                <Link to="/morgage" onClick={scrollToTop}>Contact Our Mortgage Specialist</Link>
              </h3>
              <h3>
            <Link to="/app-privacypolicy" onClick={scrollToTop}>
                  <FontAwesomeIcon icon={faMobileAlt} style={{ marginRight: '8px' }} />
                      Garden Loft App Privacy Policy
                </Link>
                </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="logo-section">
        <div className="logos">
          <div className="logos-title">
            <img src={GLLogo} alt="Logos" />
          </div>
          <div className="address">
            <p>
              2727 58 St SE {"("}by appt only{")"} <br /> (403) 229-4330 <br />
              info@gardenloft.ca
            </p>
          </div>
        </div>
        <div className="copyright"></div>
      </div>
    </>
  );
};

export default Footer;

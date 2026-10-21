
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Phone.css';

function Phone() {
  return (
    <>

      <Navbar />
      <div className='navbarBackground'></div>
      <div className='phone'>
        <h1>Contact Us</h1>
       <a href="tel:4032294330" className="phone-button">
          <FontAwesomeIcon icon={faPhone} /> (403)-229 4330
        </a>
        <a href="mailto:info@gardenloft.ca" className="email-button">
          <FontAwesomeIcon icon={faEnvelope} /> info@gardenloft.ca
        </a>

        <p><strong>Our Showroom:</strong> 2727 58 Street SE, Calgary, AB T2C 0B4 (by appointment only)</p>
      </div>
      <Footer />
    </>
  );
}

export default Phone;

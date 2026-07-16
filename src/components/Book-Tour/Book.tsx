// // Book.js

// import Navbar from '../Navbar/Navbar';
// import Footer from '../Footer/Footer';
// import Calendly from '../Calendly'; // Adjust the path as needed
// import './Book.css'; // Import the CSS file

// function Book() {
//   return (
//     <>
//       <Navbar />
//       <div className='navbarBackground'></div>
//       <div className="book-container">
//         <h1 className="book-title">
//         <span>Book A Tour</span>

//         </h1>
//         <div className="calendly-widget">
//           <Calendly url="https://calendly.com/gardenloft/test" />
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Book;

// // Book.js

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
// import Calendly from '../Calendly';
import './Book.css';

function Book() {
  return (
    <>
      <Navbar />

      <div className="navbarBackground"></div>

      <main className="book-container">
        <section className="tour-notice">
          <h1 className="book-title">
            Our new show suite is under construction!
          </h1>

          <p className="tour-message">
            Unfortunately, we are unable to offer tours until it is finished.
            We expect the new show suite to open in late August. In the meantime, please contact us at{' '}
            <a
              className="tour-email"
              href="mailto:info@gardenloft.ca"
            >
              info@gardenloft.ca
            </a>{' '}
            for a virtual tour.
          </p>
        </section>

        {/*
        <div className="calendly-widget">
          <Calendly url="https://calendly.com/gardenloft/test" />
        </div>
        */}
      </main>

      <Footer />
    </>
  );
}

export default Book;
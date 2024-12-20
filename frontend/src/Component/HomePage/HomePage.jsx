import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTextAnimation } from '/src/hooks/useTextAnimation';
import { FaFacebook, FaGooglePlus, FaTwitter, FaLinkedin, FaPinterestP
} from 'react-icons/fa';
import './Homepage.css';
import { Link } from 'react-router-dom';


const Homepage = () => {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate('/Register');
  };

  return (
    <div className="homepage">
      <div className="homepage-background-animation">
        <div className="homepage-shape homepage-shape1"></div>
        <div className="homepage-shape homepage-shape2"></div>
        <div className="homepage-shape homepage-shape3"></div>
        <div className="homepage-shape homepage-shape4"></div>
      </div>
      <nav className="homepage-navbar">
        <div className="homepage-logo">YourLogo</div>
        <ul className="homepage-nav-links">
          <li><Link to="#home">Home</Link></li>
          <li><Link to="#what-we-offer">Our Facilities</Link></li>
          <li><Link to="#team">Team</Link></li>
          <li><Link to="#contact">Contact</Link></li>
        </ul>
        <button className="homepage-login-button"
onClick={handleLoginButtonClick}>Register / Login</button>
      </nav>

      <section id="home" className="homepage-hero">
        <div className="homepage-hero-content">
          <h1 className="typing-text">{useTextAnimation('Welcome to Our Amazing Company',100,1000)}</h1>
          <p className="typing-text">{useTextAnimation('Discover excellence in everything we do',70,1000)}</p>
          <button className="homepage-cta-button"
onClick={handleLoginButtonClick}>Learn More</button>
        </div>
      </section>

      {/* What We Offer Section */}
      <section id="what-we-offer" className="homepage-what-we-offer-section">
        <h2>Our Facilities</h2>
        <div className="homepage-offer-grid">
          {[
            { name: 'MOCK TEST', image: 'src/assets/mocktest.png' },
            { name: 'INTERVIEW PREPARATION', image:
'src/assets/interview.jpg' },
            { name: 'PRACTICE SET WITH EXPLANATION', image:
'src/assets/practice.jpeg' },
            { name: 'QUIZ', image: 'src/assets/quiz.jpg' },
          ].map((offer, index) => (
            <div key={index} className="homepage-offer-card">
              <img src={offer.image} alt={offer.name} />
              <div className="homepage-offer-content">
                <h3>{offer.name}</h3>
                <p>Experience the best in {offer.name.toLowerCase()}
with our tailored programs.</p>
                {/* <Link to="#" className="homepage-learn-more-link">
                  Learn More <span className="homepage-chevron-icon">›</span>
                </a> */}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="team" className="homepage-team">
        <h2>Meet Our Team</h2>
        <div className="homepage-team-grid">
          {[
      { name: 'ParthaSarathi', role: 'Prompt Engineer', image:
'/src/assets/Partha.jpg' },
      { name: 'Dip', role: 'Documentation Expert', image: '/src/assets/Dip.jpg' },
      { name: 'Soumyadeep', role: 'Web Dev', image:
'/src/assets/Soumo.jpg' },
      { name: 'Biswajit', role: 'Full stack Dev', image:
'/src/assets/Biswa.jpg' },
    ].map((member, index) => (
            <div key={index} className="homepage-team-member">
              <div className="homepage-member-image-container">
                <img src={member.image} alt={member.name}
className="homepage-member-image" />
              </div>
              <div className="homepage-member-details">
                <h3>{member.name}</h3>
                <p className="homepage-member-role">{member.role}</p>
                <ul className="homepage-social-links">
                <li><Link to="#"><FaFacebook /></Link></li>
              <li><Link to="#"><FaTwitter /></Link></li>
              <li><Link to="#"><FaLinkedin /></Link></li>
              {/* <li><Link to="#"><FaPinterestP /></a></li> */}

                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="homepage-footer">
        <div className="homepage-footer-content">
          <div className="homepage-footer-section">
            <h3>About Us</h3>
            <p>We are committed to providing exceptional services and
experiences to our valued customers.</p>
          </div>
          <div className="homepage-footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="#home">Home</Link></li>
              <li><Link to="#what-we-offer">What We Offer</Link></li>
              <li><Link to="#team">Team</Link></li>
              <li><Link to="#contact">Contact</Link></li>
            </ul>
          </div>
          <div className="homepage-footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@yourcompany.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 Main St, City, Country</p>
          </div>
        </div>
        <div className="homepage-footer-bottom">
          <p>&copy; 2023 Your Company Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTextAnimation } from '/src/hooks/useTextAnimation';
import { FaEnvelope, FaGithub, FaCommentDots, FaLinkedin } from 'react-icons/fa';
import './HomePage.css';

import parthaImage from '/src/assets/Partha.jpg';
import dipImage from '/src/assets/Dip.jpg';
import soumoImage from '/src/assets/Soumo.jpg';
import biswaImage from '/src/assets/Biswa.jpg';
import gif from '/src/assets/video2.gif';

const Homepage = () => {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate('/Register');
  };

  const handleClick = () => {
    navigate('/feedback');
  };

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="homepage">
      {/* Feedback Button */}
      <div className="floating-feedback-container">
        <button className="floating-feedback-button" onClick={handleClick}>
          <FaCommentDots className="feedback-icon" />
          <span>Feedback</span>
        </button>
      </div>

      {/* Background Animation */}
      <div className="homepage-background-animation">
        <div className="homepage-shape homepage-shape1"></div>
        <div className="homepage-shape homepage-shape2"></div>
        <div className="homepage-shape homepage-shape3"></div>
        <div className="homepage-shape homepage-shape4"></div>
      </div>

      {/* Navbar */}
      <nav className={`homepage-navbar ${isMenuOpen ? 'active' : ''}`}>
        <div className="homepage-logo">
          <img src="/src/assets/gif.gif" alt="Logo" className="homepage-logo-gif" />
        </div>
        <ul className="homepage-nav-links">
          <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
          <li><a href="#what-we-offer" onClick={() => setIsMenuOpen(false)}>Our Facilities</a></li>
          <li><a href="#team" onClick={() => setIsMenuOpen(false)}>Team</a></li>
          <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
        </ul>

        <button className="homepage-login-button" onClick={handleLoginButtonClick}>Register / Login</button>
      <div
        className="hamburger-menu"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{ zIndex: 1100 }} // ensures it's clickable
      >
        {isMenuOpen ? '✖' : '☰'}
      </div>


      </nav>

      {/* Hero Section */}
      <section id="home" className="homepage-hero">
        <div className="homepage-hero-content"> 
        {/* <span class="quote-mark">"</span> */}
        <h1> {'🌟 " Learn, Grow, and Achieve Your Dreams "'} </h1>
          <h2 className="typing-text">{'Your path to success starts here—prepare, practice, and excel with mock tests and resources!'}</h2>
          
          <h3> {'Master your skills, boost confidence, and achieve goals.'}</h3>
          
          {/* <p className="typing-text">{useTextAnimation('― Winston Churchill',1000,5000)}</p> */}
          {/* <div className='homepage-cta-container'>
          <button className="homepage-cta-button" onClick={handleLoginButtonClick}>Learn More</button>
          </div> */}
        </div>
            <div classname="gify"><img src={gif} className="gif" height="600" width="550" alt="Gif description" />
        </div>
      </section>

      {/* What We Offer Section */}
      <section id="what-we-offer" className="homepage-what-we-offer-section">
        <h2>Our Facilities</h2>
        <div className="homepage-offer-grid">
          {[
            { name: 'MOCK TEST', image: 'src/assets/mocktest.png', path: '/testTopics' },
            { name: 'INTERVIEW PREPARATION', image: 'src/assets/interview.jpg', path: '/inttypes' },
            { name: 'DSA ROADMAP', image: 'src/assets/dsa.png', path: '/dsa' },
            { name: 'QUIZ', image: 'src/assets/quiz.jpg', path: '/quiz' },
          ].map((offer, index) => (
            <div
              key={index}
              className="homepage-offer-card"
              onClick={() => offer.path && navigate(offer.path)}
              style={{ cursor: 'pointer' }}
            >
              <img src={offer.image} alt={offer.name} />
              <div className="homepage-offer-content">
                <h3>{offer.name}</h3>
                <p>Experience the best in {offer.name.toLowerCase()} with our tailored programs.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="homepage-team">
        <h2>Meet Our Team</h2>
        <div className="homepage-team-grid">
          {[
            {
              name: 'Partha Sarathi Das',
              role: 'Frontend Designer',
              image: parthaImage,
              socialLinks: {
                gmail: 'psdas294@gmail.com',
                linkedin: 'https://www.linkedin.com/in/partha32',
                github: 'https://github.com/ParthaRCC',
              },
            },
            {
              name: 'Dip Mandal',
              role: 'Frontend Designer',
              image: dipImage,
              socialLinks: {
                gmail: 'dipmandal743370@gmail.com',
                linkedin: 'https://www.linkedin.com/in/dip-mandal-159597246/',
                github: 'https://github.com/dipmandal353/Dip',
              },
            },
            {
              name: 'Soumyadeep Dey',
              role: 'Backend Developer',
              image: soumoImage,
              socialLinks: {
                gmail: 'deepsoumya442@gmail.com',
                linkedin: 'https://www.linkedin.com/in/soumyadeepdey18/',
                github: 'https://github.com/Soumyadeep-Dey10',
              },
            },
            {
              name: 'Biswajit Manna',
              role: 'Backend Developer',
              image: biswaImage,
              socialLinks: {
                gmail: 'biswajitgopal2000@gmail.com ',
                linkedin: 'https://www.linkedin.com/in/biswajit-manna-a0563022a/',
                github: 'https://github.com/bisu2000',
              },
            },
          ].map((member, index) => (
            <div key={index} className="homepage-team-member">
              <div className="homepage-member-image-container">
                <img src={member.image} alt={member.name} className="homepage-member-image" />
              </div>
              <div className="homepage-member-details">
                <h3>{member.name}</h3>
                <p className="homepage-member-role">{member.role}</p>
                <ul className="homepage-social-links">
                  <li>
                    <a href={`mailto:${member.socialLinks.gmail}`}>
                      <FaEnvelope />
                    </a>
                  </li>
                  <li>
                    <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </a>
                  </li>
                  <li>
                    <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer id="contact" className="homepage-footer">
        <div className="homepage-footer-content">
          <div className="homepage-footer-section">
            <h3>About Us</h3>
            <p>We are committed to providing exceptional services and experiences to our valued customers.</p>
          </div>
          <div className="homepage-footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#what-we-offer">What We Offer</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="homepage-footer-section">
            <h3>Contact Us</h3>
            <p>Email: deepsoumya442@gmail.com</p>
            <p>Address: Kolkata</p>
          </div>
        </div>
        <div className="homepage-footer-bottom">
          <p>&copy; 2024 PrepMonk. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;

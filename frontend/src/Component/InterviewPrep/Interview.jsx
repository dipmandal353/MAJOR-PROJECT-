import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import { Calendar, Clock, Book, Award } from 'lucide-react';
import './Interview.css';

export default function InterviewPrep() {
  const topics = [
    { title: "Behavioral Questions", icon: "🧠", description: "Prepare for common behavioral interview questions" },
    { title: "Technical Questions", icon: "💻", description: "Practice technical coding and problem-solving questions" },
    { title: "Mock Interviews", icon: "🎭", description: "Simulate real interview experiences with peers" },
    { title: "Company Research", icon: "🏢", description: "Learn how to research and understand potential employers" },
    { title: "Resume Review", icon: "📄", description: "Get tips on crafting an impressive resume" },
    { title: "Negotiation Skills", icon: "🤝", description: "Develop skills for salary and offer negotiations" },
  ];

  return (
    <div className="interview-prep">
      <header className="header">
        <h1>Interview Preparation</h1>
        <nav>
          {/* Link to Dashboard */}
          <Link to="/home" className="back-link">Dashboard</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <button className="sign-out-btn">Sign Out</button>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h2>Master Your Interview Skills</h2>
          <p>Comprehensive preparation for your next big opportunity</p>
        </section>

        <section className="topics">
          <h2>Choose a topic to prepare:</h2>
          <div className="topic-grid">
            {topics.map((topic, index) => (
              <div key={index} className="topic-card" tabIndex="0" role="button" aria-label={`Prepare for ${topic.title}`}>
                <div className="topic-icon">{topic.icon}</div>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="features">
          <h2>Why Choose Our Interview Prep?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <Calendar className="feature-icon" />
              <h3>Structured Learning</h3>
              <p>Follow our curated path to interview success</p>
            </div>
            <div className="feature-card">
              <Clock className="feature-icon" />
              <h3>Time-Efficient</h3>
              <p>Maximize your preparation in minimal time</p>
            </div>
            <div className="feature-card">
              <Book className="feature-icon" />
              <h3>Comprehensive Resources</h3>
              <p>Access a wide range of materials and practice questions</p>
            </div>
            <div className="feature-card">
              <Award className="feature-icon" />
              <h3>Expert-Crafted Content</h3>
              <p>Learn from industry professionals and experienced interviewers</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 StudyPrep. All rights reserved.</p>
        <nav>
          <Link to="/terms" className="footer-link">Terms of Service</Link>
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <Link to="/contact" className="footer-link">Contact Us</Link>
        </nav>
      </footer>
    </div>
  );
}

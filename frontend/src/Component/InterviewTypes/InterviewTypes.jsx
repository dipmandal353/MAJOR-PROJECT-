"use client"
import "./Interviewtypes.css"
import Header from "../Header/Header"
import { useNavigate } from "react-router-dom"

function InterviewCategories() {
  // Mock navigation function since we're not using actual routing
  const navigate = useNavigate();
  
  const navigateTo = (path) => {
    navigate(path);  
  }

  const categories = [
    {
      title: "Technical Interview",
      description: "Coding challenges, system design, and technical knowledge assessment",
      path: "/techinterview",
      color: "ic-gradient-purple",
      delay: 0.1,
    },
    {
      title: "Behavioral Interview",
      description: "Situational questions, past experiences, and soft skills evaluation",
      path: "/behaveinterview",
      color: "ic-gradient-blue",
      delay: 0.3,
    },
    {
      title: "System Design Interview",
      description: "Company fit, salary expectations, and background verification",
      path: "/sdinterview",
      color: "ic-gradient-teal",
      delay: 0.5,
    },
  ]

  return (
    
    <div className="ic-interview-container">
      <Header/>
      <div className="with-header-offset">
      {/* Enhanced background animation */}
      <div className="ic-animated-background">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="ic-floating-circle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 25}s`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}

        {/* Additional animated elements for more visible effects */}
        <div className="ic-glow-effect ic-glow-1"></div>
        <div className="ic-glow-effect ic-glow-2"></div>
        <div className="ic-glow-effect ic-glow-3"></div>

        {/* Animated lines */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`line-${i}`}
            className="ic-animated-line"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 100}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 20}s`,
            }}
          />
        ))}
      </div>

      <div className="ic-categories-grid">
        {/* <Header/> */}
        {categories.map((category, index) => (
          <div
            key={index}
            className={`ic-category-card ${category.color}`}
            style={{
              animationDelay: `${category.delay}s`,
            }}
            onClick={() => navigateTo(category.path)}
          >
            <div className="ic-card-content">
              <h2 className="ic-card-title">{category.title}</h2>
              <p className="ic-card-description">{category.description}</p>
              <div className="ic-card-action">
                <span className="ic-explore-text">
                  Explore
                  <svg
                    className="ic-arrow-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default InterviewCategories

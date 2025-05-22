import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import './Dashboard.css';


import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../../Context/AuthProvider";
import Header from "../Header/Header";

export default function Dashboard() {
  const navigate = useNavigate();
  const [authUser, setAuthUser, role, token, name] = useAuth();

  const studyOptions = [
    { title: 'MockTest', icon: '📚', color: 'blue', path: '/testTopics' },
    { title: 'Interview Preparation', icon: '👥', color: 'green', path: '/inttypes' },
    { title: 'Entrance Exam Prep', icon: '🎓', color: 'purple', path: '/entrance-exam' },
    { title: 'Quiz', icon: '❓', color: 'yellow', path: '/quiz' },
    { title: 'DSA Preparation', icon: '🚀', color: 'white', path: '/Dsa' },
  ];

  const handleNavigate = (path) => {
    navigate(path); 
  }
  

  return (
    <div className="enhanced-page-container">
      <Header/>
    <main className="enhanced-page-main">
        <h2 className="enhanced-page-welcome-text">Welcome back, {name} !! 🧠 </h2>
        <div className="enhanced-page-study-options">
          {studyOptions.map((option, index) => (
            <div
              key={index}
              className="enhanced-page-option-card"
              onClick={() => handleNavigate(option.path)}
            >
              <div
                className="enhanced-page-icon-container"
                style={{ background: option.color }}
              >
                <span className="enhanced-page-card-icon">{option.icon}</span>
              </div>
              <h3 className="enhanced-page-card-title">{option.title}</h3>
              <p className="enhanced-page-card-description">
                {option.title === "MockTest" &&
                  "Practice with mock tests on core CS subjects"}
                {option.title === "Interview Preparation" &&
                  "Get ready for your next interview"}
                {option.title === "Entrance Exam Prep" &&
                  "Prepare for various entrance exams"}
                {option.title === "Quiz" &&
                  "Test your knowledge with interactive quizzes"}
                {option.title === "DSA Preparation" &&
                  "Enhance your problem-solving skills with DSA preparation"}
              </p>
            </div>
          ))}
        </div>
      </main>
      
    </div>

  );
};


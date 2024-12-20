import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Test_topics.css';

const subjects = [
  { name: 'Computer Science subjects', description: 'Dive into structured programming and problem solving.', path: '/mock-test' },
  { name: 'Aptitude', description: 'Master object-oriented concepts and programming.', path: '/aptitude' },
  { name: 'Reasoning', description: 'Understand computer networks and communication.', path: '/reasoning' },
  { name: 'Verbal', description: 'Explore system software and multitasking.', path: '/verbal' },
  { name: 'Physics', description: 'Learn database management and SQL.', path: '/physics' },
  { name: 'Science', description: 'Delve into AI and predictive analysis.', path: '/science' },
];

const Test_topics = () => {
  const navigate = useNavigate();

  const handleSubjectClick = (path) => {
    // Navigate to the selected subject page
    navigate(path);
  };

  return (
    <div className="unique-mocktest-container">
      <h1 className="unique-heading">Mock Test Subjects</h1>
      <div className="unique-grid">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="unique-subject-box"
            onClick={() => handleSubjectClick(subject.path)}
          >
            <h3 className="unique-subject-title">{subject.name}</h3>
            <p className="unique-subject-description">{subject.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test_topics;


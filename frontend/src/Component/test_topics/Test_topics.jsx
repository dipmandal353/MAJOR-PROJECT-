import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Test_topics.css'
import Header from "../Header/Header"

const subjects = [
  { name: 'Computer Science subjects', description: 'Explore topics like C, Java, Networking, RDBMS, OS etc.', path: '/computer' },
  { name: 'Aptitude', description: 'Explore quantitative aptitude topics like average, probability etc. ', path: '/aptitude' },
  { name: 'Reasoning', description: 'Explore Blood relation, puzzle solving, sitting arrangement etc.', path: '/reasoning' },
  { name: 'Verbal', description: 'Explore reading comprehension, para jumbles, synonyms-antonyms etc. ', path: '/verbal' },
  { name: 'Physics', description: 'Explore real life problems like friction, speed, dynamics etc.', path: '/physics' },
  { name: 'Science', description: 'Explore Biology, Chemistry and other science topics.', path: '/science' },
];

const Test_topics = () => {
  const navigate = useNavigate();

  const handleSubjectClick = (path) => {
    // Navigate to the selected subject page
    navigate(path);
  };

  return (
    <div className="unique-mocktest-container">
      <Header />
      <div className="with-header-offset">
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
    </div>
  );
};

export default Test_topics;

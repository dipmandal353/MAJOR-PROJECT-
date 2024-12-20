import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Full_Test.css';

const subjects = [
  { name: "C Programming", category: "Computer Science" },
  { name: "OOPs using C++", category: "Computer Science" },
  { name: "RDBMS", category: "Computer Science" },
  { name: "Networking", category: "Computer Science" },
  { name: "Machine Learning", category: "Computer Science" },
  { name: "Operating System", category: "Computer Science" },
  { name: "JAVA", category: "Computer Science" },
];

function QuizTopicSelector() {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const navigate = useNavigate();

  const handleTopicChange = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedTopics(subjects.map((subject) => subject.name));
    } else {
      setSelectedTopics([]);
    }
  };

  const handleStartTest = () => {
    // Build query parameters for selected topics
    const queryParams = new URLSearchParams();
    selectedTopics.forEach((topic) => {
      const subject = subjects.find((s) => s.name === topic);
      if (subject) {
        queryParams.append("category", subject.category); // Append category for each topic
        queryParams.append("subjectName", subject.name); // Append each subjectName
      }
    });
  
    // Navigate to the constructed URL
    navigate(`/instruction?${encodeURI(queryParams.toString())}`);

  };
  

  return (
    <div className="quiz-topic-selector">
      <div className="star-field"></div>
      <div className="content">
        <h1 className="quiz-heading">Select Topics for Your Test</h1>
        <div className="select-all">
          <input
            type="checkbox"
            id="selectAll"
            checked={selectedTopics.length === subjects.length}
            onChange={handleSelectAll}
          />
          <label htmlFor="selectAll">Select All</label>
        </div>
        <div className="topics-grid">
          {subjects.map((subject) => (
            <div key={subject.name} className="topic">
              <input
                type="checkbox"
                id={subject.name}
                checked={selectedTopics.includes(subject.name)}
                onChange={() => handleTopicChange(subject.name)}
              />
              <label htmlFor={subject.name}>{subject.name}</label>
            </div>
          ))}
        </div>
        <button
          className={'Start_button'}
          onClick={handleStartTest}
          disabled={selectedTopics.length === 0}
        >
          <div className="Start_button_text">Start Test</div>
        </button>
      </div>
    </div>
  );
}

export default QuizTopicSelector;

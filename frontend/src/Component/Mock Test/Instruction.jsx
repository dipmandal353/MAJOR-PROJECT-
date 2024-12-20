import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './instruction.css';

const InstructionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const categories = queryParams.getAll('category');
  const subjectNames = queryParams.getAll('subjectName');

  const maxQuestions = 20;
  const [questionCount, setQuestionCount] = useState(10);

  const handleSliderChange = (event) => {
    setQuestionCount(parseInt(event.target.value, 10));
  };

  const handleStart = () => {
    // Create a new URLSearchParams object
    const params = new URLSearchParams();
    
    // Add the category (assuming it's common for all subjects)
    if (categories.length > 0) {
      params.append('category', categories[0]);
    }
    
    // Add each subject name as a separate 'subjectName' parameter
    subjectNames.forEach(subject => {
      params.append('subjectName', subject);
    });
    
    // Add the question count
    params.append('questionCount', questionCount);

    // Navigate with the properly formatted query string
    navigate(`/mocktest?${params.toString()}`);
  };

  return (
    <div className="instruction-page">
      <div className="instruction-card">
        <h2 className="instruction-title">Mock Test Instructions</h2>
        <div className="instruction-content">
          <p>Welcome to the Mock Test. Please read the following instructions carefully:</p>
          <ul className="instruction-list">
            <li>Select the number of questions using the slider below.</li>
            <li>The test duration is 1 minute per question.</li>
            <li>You can mark questions for review and revisit them later.</li>
            <li>Once submitted, you cannot change your answers.</li>
            <li>Results will be displayed immediately after submission.</li>
          </ul>

          <div className="selected-subjects">
            <p>Selected Topics:</p>
            <ul>
              {subjectNames.map((subject, index) => (
                <li key={index}>
                  {subject} ({categories[index]})
                </li>
              ))}
            </ul>
          </div>

          <div className="question-selector">
            <p>Select the number of questions:</p>
            <input
              type="range"
              min="1"
              max={maxQuestions}
              value={questionCount}
              onChange={handleSliderChange}
              className="slider"
            />
            <p className="question-count">
              {questionCount} question{questionCount > 1 ? 's' : ''} ({questionCount} minute{questionCount > 1 ? 's' : ''})
            </p>
          </div>
        </div>

        <button onClick={handleStart} className="start-button">
          Start Mock Test
        </button>
      </div>
    </div>
  );
};

export default InstructionPage;
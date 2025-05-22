import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Instruction.css';
const InstructionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const categories = queryParams.getAll('category');
  const subjectNames = queryParams.getAll('subjectName');

  const maxQuestions = 50;
  const [questionCount, setQuestionCount] = useState(10);

  const handleSliderChange = (event) => {
    setQuestionCount(Math.min(maxQuestions, Math.max(1, parseInt(event.target.value, 10))));
  };

  const handleStart = () => {
  if (categories.length === 0 || subjectNames.length === 0) {
    alert("Please select at least one subject.");
    return;
  }

  const params = new URLSearchParams();

  

  // ✅ Get unique categories from the selection
  const uniqueCategories = [...new Set(categories)];
  if (uniqueCategories.length === 1) {
    // ✅ If all subjects share the same category, only add once
    params.append("category", uniqueCategories[0]);
  } else {
    // ✅ Else include all categories
    uniqueCategories.forEach(cat => params.append("category", cat));
  }

  // ✅ Append all selected subjects
  subjectNames.forEach(subject => params.append("subjectName", subject));

  
  // ✅ Add question count
  params.append("questionCount", questionCount);

  // ✅ Navigate
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


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import './set.css';
import Chat from '../Chatbot/Chat'
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, BookOpen, Award, Zap } from 'lucide-react';

const PracticeSet = () => {
  const [questions, setQuestions] = useState([]); // Questions list
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [currentQuestion, setCurrentQuestion] = useState(0); // Current question index
  const [answers, setAnswers] = useState([]); // User's answers
  const [activeTab, setActiveTab] = useState("question"); // Active tab (e.g., explanation)
  const [selectedOption, setSelectedOption] = useState(null); // Selected answer option
  const location = useLocation(); // Router location
  const [difficulty, setDifficulty] = useState("Easy"); // Current difficulty level
  const [animateQuestion, setAnimateQuestion] = useState(false); // Animation state

  // Query parameters (category and subject name)
  const queryParams = new URLSearchParams(window.location.search);
  const category = queryParams.get("category");
  const subjectName = queryParams.get("subjectName");

  // Fetch questions whenever category, subjectName, or difficulty changes
  useEffect(() => {
    if (category && subjectName) {
      fetchQuestions();
    }
  }, [category, subjectName, difficulty]);

  const fetchQuestions = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(
        `/api/v1/question/get-questions?category=${category}&subjectName=${subjectName}&difficulty=${difficulty}`
      );
      const fetchedQuestions = response.data.data.map((question) => ({
        ...question,
        correctAnswerKey: question.answer[0]?.key, // Extract correct answer key
      }));
      setQuestions(fetchedQuestions); // Update questions
      setAnswers(new Array(fetchedQuestions.length).fill(null)); // Reset answers
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch questions.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleAnswer = (selectedKey) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedKey;
    setAnswers(newAnswers);
    setSelectedOption(selectedKey); // Set selected answer
    setActiveTab("explanation"); // Switch to explanation tab
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setAnimateQuestion(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setActiveTab("question");
        setSelectedOption(null); // Reset selected option
        scrollToTop();
        setAnimateQuestion(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setAnimateQuestion(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setActiveTab("question");
        setSelectedOption(null); // Reset selected option
        scrollToTop();
        setAnimateQuestion(false);
      }, 300);
    }
  };

  const scrollToTop = () => {
    const container = document.querySelector(".test-container");
    container?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getOptionClass = (optionKey) => {
    const correctAnswerKey = questions[currentQuestion]?.correctAnswerKey;

    if (!selectedOption) return ""; // Default state

    if (optionKey === correctAnswerKey) return "correct"; // Correct option
    if (optionKey === selectedOption && optionKey !== correctAnswerKey) return "incorrect"; // Incorrect option
    return "";
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
    setCurrentQuestion(0); // Reset to first question
    setSelectedOption(null); // Reset selected option
    setActiveTab("question"); // Reset tab to question
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">!</div>
        <p>{error}</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="empty-container">
        <div className="empty-icon">📚</div>
        <p>No questions found for this category and subject.</p>
      </div>
    );
  }

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="mock-test">
      <Chat/>
      {/* Subject Icons */}
      <div className="subject-icons">
        <div className="subject-icon">
          <img src="/src/assets/cplus.webp" alt="C Programming" />
          <span>OOPs using C++</span>
        </div>
        <div className="subject-icon">
          <img src="/src/assets/rdbms.png" alt="RDBMS" />
          <span>RDBMS</span>
        </div>
        <div className="subject-icon">
          <img src="/src/assets/networking.jpg" alt="Networking" />
          <span>Networking</span>
        </div>
        <div className="subject-icon">
          <img src="/src/assets/machine.avif" alt="Machine Learning" />
          <span>Machine Learning</span>
        </div>
        <div className="subject-icon">
          <img src="/src/assets/os.jpg" alt="Operating Systems" />
          <span>Operating Systems</span>
        </div>
      </div>

      <div className="test-container">
        <div className="test-header">
          <h1>{subjectName} Practice Set</h1>
          <div className="progress-container">
            <div className="question-number">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
        </div>

        <div className="difficulty-selector">
          <label>
            <span>Difficulty:</span>
            <select value={difficulty} onChange={handleDifficultyChange}>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </label>
        </div>

        <div className={`question-container ${animateQuestion ? 'fade-out' : 'fade-in'}`}>
          <div className="question-content">
            <pre className="question-text">
              <h2>{questions[currentQuestion]?.question}</h2>
            </pre>
          </div>

          <div className="options">
            {questions[currentQuestion]?.options.map((option) => (
              <label
                key={option.key}
                className={`option ${getOptionClass(option.key)}`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option.key}
                  checked={selectedOption === option.key}
                  onChange={() => handleAnswer(option.key)}
                  disabled={selectedOption !== null}
                />
                <div className="option-content">
                  <div className="option-key">{option.key}</div>
                  <div className="option-value">{option.value}</div>
                  {getOptionClass(option.key) === "correct" && (
                    <CheckCircle className="option-icon correct-icon" />
                  )}
                  {getOptionClass(option.key) === "incorrect" && (
                    <XCircle className="option-icon incorrect-icon" />
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {activeTab === "explanation" && (
          <div className="explanation-container">
            <div className="explanation-header">
              <BookOpen className="explanation-icon" />
              <h3>Correct Answer</h3>
            </div>
            <div className="explanation-content">
              <p>
                <span className="correct-key">{questions[currentQuestion]?.correctAnswerKey || "N/A"}</span>
                <span className="correct-value">
                  {questions[currentQuestion]?.options.find(
                    (option) => option.key === questions[currentQuestion]?.correctAnswerKey
                  )?.value || "Answer not found"}
                </span>
              </p>
            </div>
          </div>
        )}

        <div className="navigation">
          <button 
            className="nav-button prev-button" 
            onClick={handlePrevious} 
            disabled={currentQuestion === 0}
          >
            <ChevronLeft className="nav-icon" />
            <span>Previous</span>
          </button>
          
          {activeTab !== "explanation" && selectedOption === null && (
            <div className="hint-text">Select an answer to see the Correct Answer</div>
          )}
          
          <button 
            className="nav-button next-button" 
            onClick={handleNext} 
            disabled={currentQuestion >= questions.length - 1}
          >
            <span>Next</span>
            <ChevronRight className="nav-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeSet;

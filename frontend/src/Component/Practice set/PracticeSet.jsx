import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import './set.css';

const PracticeSet = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [activeTab, setActiveTab] = useState("question");
  const [selectedOption, setSelectedOption] = useState(null);
  const location = useLocation();

  // Parse query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const category = queryParams.get("category");
  const subjectName = queryParams.get("subjectName");

  useEffect(() => {
    if (category && subjectName) {
      fetchQuestions();
    }
  }, [category, subjectName]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `/api/v1/question/get-questions?category=${category}&subjectName=${subjectName}`
      );
      const fetchedQuestions = response.data.data.map((question) => ({
        ...question,
        correctAnswerKey: question.answer[0]?.key, // Use the `key` of the correct answer.
      }));
      setQuestions(fetchedQuestions);
      setAnswers(new Array(fetchedQuestions.length).fill(null));
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch questions.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (selectedKey) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedKey;
    setAnswers(newAnswers);
    setSelectedOption(selectedKey);
    setActiveTab("explanation");
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setActiveTab("question");
      setSelectedOption(null);
      scrollToTop();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setActiveTab("question");
      setSelectedOption(null);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    const container = document.querySelector(".test-container");
    container.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getOptionClass = (optionKey) => {
    const correctAnswerKey = questions[currentQuestion]?.correctAnswerKey;

    if (!selectedOption) return "";

    if (optionKey === correctAnswerKey) return "correct";
    if (optionKey === selectedOption) return "incorrect";
    return "";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (questions.length === 0) {
    return <div>No questions found for this category and subject.</div>;
  }

  return (
    <div className="mock-test">
      {/* Left Icons */}
      <div className="left-icons-container">
        <div className="circle-icon-container">
          <div className="circle-icon">
            <img src="/src/assets/cplus.webp" alt="C Programming Logo" className="icon-image" />
            <span className="tooltip">OOPs using C++</span>
          </div>
        </div>
        <div className="circle-icon-container">
          <div className="circle-icon">
            <img src="/src/assets/rdbms.png" alt="Data Structures Logo" className="icon-image" />
            <span className="tooltip">RDBMS</span>
          </div>
        </div>
        <div className="circle-icon-container">
          <div className="circle-icon">
            <img src="/src/assets/networking.jpg" alt="Algorithms Logo" className="icon-image" />
            <span className="tooltip">Networking</span>
          </div>
        </div>
        <div className="circle-icon-container">
          <div className="circle-icon">
            <img src="/src/assets/machine.avif" alt="Operating Systems Logo" className="icon-image" />
            <span className="tooltip">Machine Learning</span>
          </div>
        </div>
        <div className="circle-icon-container">
          <div className="circle-icon">
            <img src="/src/assets/os.jpg" alt="Computer Networks Logo" className="icon-image" />
            <span className="tooltip">Operating Systems</span>
          </div>
        </div>
      </div>
      
        
    <div className="mock-test">
      <div className="test-container">
        <div className="test-header">
          <h1>{subjectName} Practice Set</h1>
          <div className="question-number">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        <div className="question-container">
          <h2>{questions[currentQuestion]?.question}</h2>
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
                <span>
                  <strong>{option.key}.</strong> {option.value}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === "explanation" ? "active" : ""}`}
            onClick={() => setActiveTab("explanation")}
          >
            Correct Answer 
          </button>

          {/* <button
            className={`tab-button ${activeTab === "workspace" ? "active" : ""}`}
            onClick={() => setActiveTab("workspace")}
          >
            Workspace
          </button> */}
        </div>

        <div className="tab-content">
          {activeTab === "explanation" && (
            <div className="explanation-container">
              <h3>Correct Answer:</h3>
              <p>
                <strong>{questions[currentQuestion]?.correctAnswerKey || "N/A"}.</strong>{" "}
                {
                  questions[currentQuestion]?.options.find(
                    (option) => option.key === questions[currentQuestion]?.correctAnswerKey
                  )?.value || "Answer not found"
                }
              </p>
              {/* <h3>Explanation:</h3>
              <p>{questions[currentQuestion]?.explanation}</p> */}
            </div>
          )}
        </div>

        <div className="navigation">
          <button onClick={handlePrevious} disabled={currentQuestion === 0}>
            Previous
          </button>
          {currentQuestion < questions.length - 1 && (
            <button onClick={handleNext}>Next</button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default PracticeSet;


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './Test.css';

const MockTest = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [markedForReview, setMarkedForReview] = useState([]);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const answered = answers.filter(answer => answer !== null).length;
  const [categoryList, setCategoryList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [questionCount, setQuestionCount] = useState(10);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categories = [...new Set(queryParams.getAll("category"))]; // unique categories
    const subjects = queryParams.getAll("subjectName");
    const count = parseInt(queryParams.get("questionCount"), 10) || 10;

    setCategoryList(categories);
    setSubjectList(subjects);
    setQuestionCount(count);

    const fetchQuestions = async () => {
      try {
        const params = new URLSearchParams();
        subjects.forEach(subject => params.append("subjectName", subject));
        categories.forEach(cat => params.append("category", cat));

        const response = await axios.get(`/api/v1/question/get-questions?${params.toString()}`);
        const fetchedQuestions = response.data.data.map((question) => ({
          ...question,
          correctAnswerKey: question.answer[0]?.key,
          subTopic: question.subTopic || "Unknown",
        }));

        const shuffledQuestions = shuffleArray(fetchedQuestions).slice(0, count);
        setQuestions(shuffledQuestions);
        setRandomizedQuestions(shuffledQuestions);
        setAnswers(new Array(shuffledQuestions.length).fill(null));
        setMarkedForReview(new Array(shuffledQuestions.length).fill(false));
        setVisitedQuestions(new Array(shuffledQuestions.length).fill(false));
        setTimeLeft(shuffledQuestions.length * 60);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [location.search]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        clearInterval(timer);
        handleSubmit();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
  if (randomizedQuestions.length > 0) {
    const newVisitedQuestions = [...visitedQuestions];
    newVisitedQuestions[currentQuestion] = true;
    setVisitedQuestions(newVisitedQuestions);
  }
}, [currentQuestion, randomizedQuestions]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleAnswer = (selectedKey) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedKey;
    setAnswers(newAnswers);
    setSelectedOption(selectedKey);
  };

  const handleNext = () => {
    if (currentQuestion < randomizedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]);
    }
  };

  const handleMarkForReview = () => {
    const newMarkedForReview = [...markedForReview];
    newMarkedForReview[currentQuestion] = !newMarkedForReview[currentQuestion];
    setMarkedForReview(newMarkedForReview);
  };

  const handleSubmit = () => {
    const totalTime = randomizedQuestions.length * 60;
    const timeTaken = totalTime - timeLeft;

    navigate("/result", {
      state: {
        answers,
        questions: randomizedQuestions,
        category: categoryList,
        subjectName: subjectList,
        totalQuestions: randomizedQuestions.length,
        timeTaken,
        subTopics: randomizedQuestions.map((question) => question.subTopic),
      },
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (randomizedQuestions.length === 0) {
    return <div>No questions found for this category and subject.</div>;
  }

  
  const visited = visitedQuestions.filter(Boolean).length;
  const notVisited = randomizedQuestions.length - visited;
  const marked = markedForReview.filter(Boolean).length;

  const markButtonText = markedForReview[currentQuestion] ? "Unmark for Review" : "Mark for Review";

  return (
    <div className="mock-test-wrapper">
      <div className="mock-test-sidebar">
        <div className="mock-test-timer-section">
          <div className="mock-test-timer-label">Time Left</div>
          <div className="mock-test-timer">{formatTime(timeLeft)}</div>
        </div>

        <div className="mock-test-status">
          <div className="mock-test-status-item"><span>Visited:</span><span className="mock-test-status-count">{visited}</span></div>
          <div className="mock-test-status-item"><span>Answered:</span><span className="mock-test-status-count">{answered}</span></div>
          <div className="mock-test-status-item"><span>Not Visited:</span><span className="mock-test-status-count">{notVisited}</span></div>
          <div className="mock-test-status-item"><span>Marked for Review:</span><span className="mock-test-status-count">{marked}</span></div>
        </div>

        <div className="mock-test-question-numbers">
          {randomizedQuestions.map((_, index) => {
            let statusClass = '';
            if (markedForReview[index]) statusClass = 'marked-for-review';
            else if (answers[index] !== null) statusClass = 'answered';
            else if (visitedQuestions[index]) statusClass = 'visited';
            else statusClass = 'not-visited';

            return (
              <div
                key={index}
                className={`mock-test-question-box ${statusClass} ${index === currentQuestion ? 'active' : ''}`}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mock-test-content">
        {/* <div className="mock-test-summary">
          <h3>Category: {categoryList.join(', ')}</h3>
          <h4>Subjects: {subjectList.join(', ')}</h4>
        </div> */}

        <div className="mock-test-question">
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '1.2rem', fontWeight: 'bold' }}>
            {randomizedQuestions[currentQuestion].question}
          </pre>
          <div className="mock-test-options">
            {randomizedQuestions[currentQuestion].options.map((option) => (
              <label key={option.key} className="mock-test-option">
                <input
                  type="radio"
                  name="answer"
                  value={option.key}
                  checked={selectedOption === option.key}
                  onChange={() => handleAnswer(option.key)}
                />
                <span>{option.value}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mock-test-navigation">
          <button className="mock-test-nav-button previous" onClick={handlePrevious} disabled={currentQuestion === 0}>Previous</button>
          <button className="mock-test-nav-button review" onClick={handleMarkForReview}>{markButtonText}</button>
          <button className="mock-test-nav-button next" onClick={handleNext} disabled={currentQuestion === randomizedQuestions.length - 1}>Next</button>
        </div>

        <button className="mock-test-submit" onClick={handleSubmit}>Submit Test</button>
      </div>
    </div>
  );
};

export default MockTest;

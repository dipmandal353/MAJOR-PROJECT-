import React from "react";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

const ResultPageEnhanced = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    answers,
    questions,
    category,
    subjectName,
    timeTaken,
    totalQuestions,
    subTopics
  } = location.state;
  

  // Calculate subtopic scores
  const calculateSubtopicScores = () => {
    const subtopics = {};
    questions.forEach((q, index) => {
      const subTopic = q.subTopic || q.subtopic; // Check for variations in key names
      if (!subTopic) {
        console.warn(`Question ${index + 1} is missing a 'subTopic' field.`);
        return;
      }
      if (!subtopics[subTopic]) {
        subtopics[subTopic] = { correct: 0, total: 0 };
      }
      subtopics[subTopic].total++;
      if (q.correctAnswerKey === answers[index]) {
        subtopics[subTopic].correct++;
      }
    });
    return subtopics;
  };

  // Calculate overall score
  const calculateOverallScore = () => {
    const correctAnswers = answers.filter(
      (answer, index) => answer === questions[index].correctAnswerKey
    ).length;
    return {
      score: (correctAnswers / totalQuestions) * 100,
      correctAnswersCount: correctAnswers,
    };
  };

  const { score, correctAnswersCount } = calculateOverallScore();
  const subtopicScores = calculateSubtopicScores();

  // Get color and icon for score
  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "green";
    if (percentage >= 60) return "yellow";
    return "red";
  };

  const getScoreIcon = (percentage) => {
    if (percentage >= 80) return <FaCheckCircle className="icon-green" />;
    if (percentage >= 60) return <FaExclamationTriangle className="icon-yellow" />;
    return <FaTimesCircle className="icon-red" />;
  };

  return (
    <div className="result-page-enhanced">
      <h1 className="result-title">{subjectName} Test Results</h1>
      <p className="paragraph">Category: {category}</p>
      <p className="paragraph">
        Time Taken: {Math.floor(timeTaken / 60)} minutes {timeTaken % 60} seconds
      </p>

      <div className="score-overview">
        <div className="score-card">
          <h2 className="score-card-title">Overall Score</h2>
          <div className="score-container">
            <span className={`score-percentage ${getScoreColor(score)}`}>
              {score.toFixed(1)}%
            </span>
            <span className="score-icon">{getScoreIcon(score)}</span>
          </div>
          <p className="score-summary">
            Correct Answers: {correctAnswersCount} / {totalQuestions}
          </p>
          {score === 100 && (
            <p className="perfect-score-message">🎉 Amazing! You got a perfect score! 🎉</p>
          )}
        </div>
      </div>

      <h2 className="subtopic-title">Areas for Improvement 🤬🤬🤬!!!</h2>
      <div className="subtopic-grid">
        {Object.entries(subtopicScores)
          .filter(([_, { correct, total }]) => (correct / total) * 100 < 50) // Only show subtopics below 50%
          .map(([subtopic, { correct, total }]) => {
            const percentage = (correct / total) * 100;
            return (
              <div key={subtopic} className="subtopic-card">
                <h3 className="subtopic-name">{subtopic}</h3>
                <div className="subtopic-bar-container">
                  <div className="progress-bar">
                    <div
                      className={`progress-bar-fill ${getScoreColor(percentage)}`}
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage.toFixed(1)}%
                    </div>
                  </div>
                  <span className="subtopic-score">
                    {correct}/{total}
                  </span>
                </div>
                <p className="subtopic-message">Focus on improving this area.</p>
              </div>
            );
          })}
      </div>
      {Object.entries(subtopicScores).every(
        ([_, { correct, total }]) => (correct / total) * 100 >= 50 // Updated threshold here as well
      ) && (
        <p className="no-improvement-message">
          Great job! You scored above 50% in all subtopics.
        </p>
      )}

      <h2 className="answers-title">Your Answers</h2>
      <div className="answers">
        {questions.map((question, index) => {
          const userAnswerKey = answers[index];
          const userAnswerValue =
            question.options.find((option) => option.key === userAnswerKey)?.value ||
            "No answer selected";
          const correctAnswerKey = question.correctAnswerKey;
          const correctAnswerValue =
            question.options.find((option) => option.key === correctAnswerKey)?.value;

          const isCorrect = userAnswerKey === correctAnswerKey;

          return (
            <div key={index} className="answer">
              <h3>{question.question}</h3>
              <p className="paragraph">
                Your Answer: {userAnswerKey || "N/A"} : {userAnswerValue}
              </p>
              <p className={`answer-status ${isCorrect ? "correct" : "incorrect"}`}>
                {isCorrect ? "Correct" : "Incorrect"}
              </p>
              {!isCorrect && (
                <p className="correct-answer">
                  Correct Answer :  {correctAnswerValue}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="dashboard-button-container">
        <button className="dashboard-button" onClick={() => navigate("/Dashboard")}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ResultPageEnhanced;

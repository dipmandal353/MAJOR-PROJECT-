"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { examQuestionsData, examInfo } from "./Exam_qs"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../Header/Header"
import "./Exam_qs.css"

// Icons as SVG components
const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const BookOpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
)

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
)

const TagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </svg>
)

const BarChartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" x2="12" y1="20" y2="10" />
    <line x1="18" x2="18" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="16" />
  </svg>
)

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const ExamQuestions = () => {
  const { examId } = useParams()
  const navigate = useNavigate()
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [showAnswer, setShowAnswer] = useState({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [selectedOption, setSelectedOption] = useState({})
  const [isCorrect, setIsCorrect] = useState({})
  const [showExplanation, setShowExplanation] = useState({})
  const canvasRef = useRef(null)

  // Get exam data
  const exam = examInfo[examId]
  const questions = examQuestionsData[examId]

  // Set default year to the most recent year
  useEffect(() => {
    if (exam && exam.years && exam.years.length > 0) {
      setSelectedYear(exam.years[0])
    }
  }, [exam])

  // Filter questions based on selected filters
  useEffect(() => {
    if (!selectedYear || !questions || !questions[selectedYear]) {
      setFilteredQuestions([])
      return
    }

    let filtered = [...questions[selectedYear]]

    if (selectedSubject !== "All") {
      filtered = filtered.filter((q) => q.subject === selectedSubject)
    }

    if (selectedDifficulty !== "All") {
      filtered = filtered.filter((q) => q.difficulty === selectedDifficulty)
    }

    setFilteredQuestions(filtered)
    setCurrentQuestionIndex(0)
  }, [selectedYear, selectedSubject, selectedDifficulty, questions])

  // Get unique subjects from questions
  const getUniqueSubjects = () => {
    if (!questions) return []
    
    const subjects = new Set()
    subjects.add("All")
    
    Object.values(questions).forEach((yearQuestions) => {
      yearQuestions.forEach((q) => {
        if (q.subject) subjects.add(q.subject)
      })
    })
    
    return Array.from(subjects)
  }

  // Handle option selection
  const handleOptionSelect = (questionId, option) => {
    setSelectedOption((prev) => ({ ...prev, [questionId]: option }))
    
    const question = filteredQuestions.find((q) => q.id === questionId)
    const correct = question.answer === option
    
    setIsCorrect((prev) => ({ ...prev, [questionId]: correct }))
  }

  // Toggle answer visibility
  const toggleAnswer = (questionId) => {
    setShowAnswer((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }))
  }

  // Toggle explanation visibility
  const toggleExplanation = (questionId) => {
    setShowExplanation((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }))
  }

  // Navigate to next question
  const nextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  // Navigate to previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  // Navigate back to exams page
//   const goToExams = () => {
//     navigate("/")
//   }

  // Animated background effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles = []
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3

        // Create a color palette based on exam color
        const baseHue = exam && exam.color === "exam-questions-blue" ? 220 :
                        exam && exam.color === "exam-questions-purple" ? 270 :
                        exam && exam.color === "exam-questions-red" ? 0 :
                        exam && exam.color === "exam-questions-green" ? 120 :
                        exam && exam.color === "exam-questions-pink" ? 330 :
                        exam && exam.color === "exam-questions-yellow" ? 60 : 220;
                        
        const hue = baseHue + Math.floor(Math.random() * 30) - 15
        const saturation = Math.floor(Math.random() * 30) + 70
        const lightness = Math.floor(Math.random() * 20) + 40
        this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.6)`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function initParticles() {
      particles = []
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100)

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function connectParticles() {
      if (!ctx) return
      const maxDistance = 120

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            
            // Use color based on exam type
            let strokeColor = "rgba(120, 100, 255, " + opacity * 0.3 + ")"
            
            if (exam) {
              if (exam.color === "exam-questions-blue") strokeColor = `rgba(59, 130, 246, ${opacity * 0.3})`
              if (exam.color === "exam-questions-purple") strokeColor = `rgba(139, 92, 246, ${opacity * 0.3})`
              if (exam.color === "exam-questions-red") strokeColor = `rgba(239, 68, 68, ${opacity * 0.3})`
              if (exam.color === "exam-questions-green") strokeColor = `rgba(16, 185, 129, ${opacity * 0.3})`
              if (exam.color === "exam-questions-pink") strokeColor = `rgba(236, 72, 153, ${opacity * 0.3})`
              if (exam.color === "exam-questions-yellow") strokeColor = `rgba(245, 158, 11, ${opacity * 0.3})`
            }
            
            ctx.strokeStyle = strokeColor
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      connectParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [exam])

  if (!exam) {
    return (
      <div className="exam-questions-page">
        <div className="exam-questions-error">
          <h2>Exam not found</h2>
          {/* <button className="exam-questions-back-button" onClick={goToExams}>
            <HomeIcon /> Back to Exams
          </button> */}
        </div>
      </div>
    )
  }

  const currentQuestion = filteredQuestions[currentQuestionIndex]

  return (
    <div className={`exam-questions-page ${exam.color}`}>
      <Header />
      <canvas ref={canvasRef} className="exam-questions-animated-background"></canvas>

      <div className="exam-questions-container">
        <div className="exam-questions-header">
          {/* <motion.button 
            className="exam-questions-back-button"
            onClick={goToExams}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HomeIcon /> Back to Exams
          </motion.button> */}
          
          <motion.h1 
            className="exam-questions-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {exam.name} - {exam.fullName}
          </motion.h1>
          <motion.h2
            className="exam-questions-subtitle"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            >
            Previous Year Questions
          </motion.h2>
        </div>

        <motion.div 
          className="exam-questions-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="exam-questions-filter-group">
            <label className="exam-questions-filter-label">
              <CalendarIcon /> Year:
            </label>
            <select
              className="exam-questions-select"
              value={selectedYear || ""}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {exam.years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="exam-questions-filter-group">
            <label className="exam-questions-filter-label">
              <BookOpenIcon /> Subject:
            </label>
            <select
              className="exam-questions-select"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {getUniqueSubjects().map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div className="exam-questions-filter-group">
            <label className="exam-questions-filter-label">
              <BarChartIcon /> Difficulty:
            </label>
            <select
              className="exam-questions-select"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </motion.div>

        {filteredQuestions.length > 0 ? (
          <motion.div 
            className="exam-questions-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="exam-questions-navigation">
              <motion.button
                className="exam-questions-nav-button"
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeftIcon /> Previous
              </motion.button>
              <div className="exam-questions-pagination">
                Question {currentQuestionIndex + 1} of {filteredQuestions.length}
              </div>
              <motion.button
                className="exam-questions-nav-button"
                onClick={nextQuestion}
                disabled={currentQuestionIndex === filteredQuestions.length - 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next <ChevronRightIcon />
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={currentQuestionIndex}
                className="exam-questions-card"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="exam-questions-meta">
                  <div className="exam-questions-meta-item">
                    <TagIcon /> {currentQuestion.subject}
                  </div>
                  <div className="exam-questions-meta-item">
                    <BarChartIcon /> {currentQuestion.difficulty}
                  </div>
                </div>

                <div className="exam-questions-question">
                  <h3>Question {currentQuestionIndex + 1}</h3>
                  <p>{currentQuestion.question}</p>
                </div>

                <div className="exam-questions-options">
                  {currentQuestion.options.map((option, index) => (
                    <motion.div
                      key={index}
                      className={`exam-questions-option ${
                        selectedOption[currentQuestion.id] === option
                          ? isCorrect[currentQuestion.id]
                            ? "exam-questions-option-correct"
                            : "exam-questions-option-incorrect"
                          : ""
                      } ${
                        showAnswer[currentQuestion.id] && currentQuestion.answer === option
                          ? "exam-questions-option-answer"
                          : ""
                      }`}
                      onClick={() => handleOptionSelect(currentQuestion.id, option)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="exam-questions-option-letter">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="exam-questions-option-text">{option}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="exam-questions-actions">
                  <motion.button
                    className="exam-questions-action-button"
                    onClick={() => toggleAnswer(currentQuestion.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showAnswer[currentQuestion.id] ? "Hide Answer" : "Show Answer"}
                  </motion.button>
                  
                  <motion.button
                    className="exam-questions-action-button"
                    onClick={() => toggleExplanation(currentQuestion.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showExplanation[currentQuestion.id] ? "Hide Explanation" : "Show Explanation"}
                  </motion.button>
                </div>

                <AnimatePresence>
                  {showExplanation[currentQuestion.id] && (
                    <motion.div
                      className="exam-questions-explanation"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4>Explanation:</h4>
                      <p>{currentQuestion.explanation}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="exam-questions-empty">
            <p>No questions available for the selected filters.</p>
            <p>Please try different filter options.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExamQuestions

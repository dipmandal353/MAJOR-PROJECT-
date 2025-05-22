"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import mockTestData from "../Mock/mockTestData" 
import "./Full_Test.css"

function QuizTopicSelector() {
  const { category } = useParams()
  const [selectedTopics, setSelectedTopics] = useState([])
  const navigate = useNavigate()
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    // Get subjects based on the current category
    if (category && mockTestData[category]) {
      setSubjects(mockTestData[category])
      setSelectedTopics([]) // Reset selections when category changes
    }
  }, [category])

  const handleTopicChange = (topic) => {
    setSelectedTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]))
  }

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedTopics(subjects.map((subject) => subject.name))
    } else {
      setSelectedTopics([])
    }
  }

  const handleStartTest = () => {
    // Build query parameters for selected topics
    const queryParams = new URLSearchParams()
    selectedTopics.forEach((topic) => {
      const subject = subjects.find((s) => s.name === topic)
      if (subject) {
        queryParams.append("category", subject.category) // Append category for each topic
        queryParams.append("subjectName", subject.name) // Append each subjectName
      }
    })

    // Navigate to the constructed URL
    navigate(`/instruction?${encodeURI(queryParams.toString())}`)
  }

  // Get category title for display
  const getCategoryTitle = () => {
    if (!category) return "Mock Test"
    return category.charAt(0).toUpperCase() + category.slice(1) + " Mock Test"
  }

  return (
    <div className="quiz-topic-selector">
      <div className="star-field"></div>
      <div className="content">
        <h1 className="quiz-heading">{getCategoryTitle()}</h1>
        {subjects.length > 0 ? (
          <>
            <div className="select-all">
              <input
                type="checkbox"
                id="selectAll"
                checked={selectedTopics.length === subjects.length && subjects.length > 0}
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
            <button className={"Start_button"} onClick={handleStartTest} disabled={selectedTopics.length === 0}>
              <div className="Start_button_text">Start Test</div>
            </button>
          </>
        ) : (
          <div className="no-subjects">
            <p>No subjects found for this category.</p>
            <button className="Start_button" onClick={() => navigate(-1)}>
              <div className="Start_button_text">Go Back</div>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizTopicSelector

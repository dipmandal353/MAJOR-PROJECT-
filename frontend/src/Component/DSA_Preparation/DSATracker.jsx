"use client"

import { useEffect, useState } from "react"
import "./DSATracker.css"
import Header from "../Header/Header"
import { useAuth } from "../../Context/AuthProvider"
import initialData from "./Data"
// Initial data structure

// Main component
function DSATracker({
  customData,
  storageKey = "studyTrackerData",
  title = "Study Progress Tracker",
  hideTitle = false,
  hideHeader = false,
  columnConfig = {},
  customizeForms = null,
}) {
  const [subjects, setSubjects] = useState([])
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false)
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false)
  const [isNotesOpen, setIsNotesOpen] = useState(false)
  const [currentNotes, setCurrentNotes] = useState({
    subjectId: "",
    topicId: "",
    resourceId: "",
    content: "",
    title: "",
  })
  const [showRevision, setShowRevision] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("")
  const [newTopicTitle, setNewTopicTitle] = useState("")
  const [newSubjectTitle, setNewSubjectTitle] = useState("")
  const [authUser, setAuthUser, role, token, name] = useAuth() // Assume `name` is the username or unique identifier
  const [data, setData] = useState(customData || initialData)
  const [isAddProblemOpen, setIsAddProblemOpen] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState("")
  const [newProblem, setNewProblem] = useState({
    title: "",
    articles: [], // Changed from article to articles array
    youtube: "",
    practice: "",
    difficulty: "Easy",
    completed: false,
    markedForRevision: false,
    notes: "",
  })

  const userKey = name ? name : "guest" // fallback if name is undefined
  const dataKey = `${storageKey}_${userKey}`
  const versionKey = `${storageKey}Version_${userKey}`

  const [newResources, setNewResources] = useState([
    {
      id: `resource-${Date.now()}`,
      title: "",
      difficulty: "Easy",
      completed: false,
      markedForRevision: false,
      notes: "",
    },
  ])

  const renderStars = (value) => {
    const fullStars = Math.min(Math.max(Number(value), 0), 5)
    const stars = []

    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < fullStars ? "#f1c40f" : "none"} // gold filled or outline
          stroke="#f1c40f"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: "2px" }}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>,
      )
    }

    return stars
  }

  const DATA_VERSION = "v2" // Change this when initialData changes

  // Helper function to convert old article format to new format
  const convertArticleFormat = (resources) => {
    return resources.map((resource) => {
      // If resource has article but no articles array
      if (resource.article && (!resource.articles || resource.articles.length === 0)) {
        return {
          ...resource,
          articles: [{ title: "Article", url: resource.article }],
        }
      }
      return resource
    })
  }

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(dataKey)
    const savedVersion = localStorage.getItem(versionKey)

    if (!savedData || savedVersion !== DATA_VERSION) {
      const initialSubjects = customData || initialData
      // Convert old article format to new format
      const convertedSubjects = initialSubjects.map((subject) => ({
        ...subject,
        topics: subject.topics.map((topic) => ({
          ...topic,
          resources: convertArticleFormat(topic.resources),
        })),
      }))

      setSubjects(convertedSubjects)
      localStorage.setItem(dataKey, JSON.stringify(convertedSubjects))
      localStorage.setItem(versionKey, DATA_VERSION)
    } else {
      const parsedData = JSON.parse(savedData)
      // Convert old article format to new format
      const convertedSubjects = parsedData.map((subject) => ({
        ...subject,
        topics: subject.topics.map((topic) => ({
          ...topic,
          resources: convertArticleFormat(topic.resources),
        })),
      }))

      setSubjects(convertedSubjects)
    }
  }, [dataKey, versionKey]) // triggers update when user changes

  // Save data when subjects change
  useEffect(() => {
    if (subjects.length > 0 && name) {
      localStorage.setItem(dataKey, JSON.stringify(subjects))
    }
  }, [subjects, dataKey])

  // Toggle subject expansion
  const toggleSubjectExpand = (subjectId) => {
    setSubjects(
      subjects.map((subject) => (subject.id === subjectId ? { ...subject, expanded: !subject.expanded } : subject)),
    )
  }

  // Toggle topic expansion
  const toggleTopicExpand = (subjectId, topicId) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              topics: subject.topics.map((topic) =>
                topic.id === topicId ? { ...topic, expanded: !topic.expanded } : topic,
              ),
            }
          : subject,
      ),
    )
  }

  // Toggle resource completion
  const toggleResourceCompletion = (subjectId, topicId, resourceId) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              topics: subject.topics.map((topic) =>
                topic.id === topicId
                  ? {
                      ...topic,
                      resources: topic.resources.map((resource) =>
                        resource.id === resourceId ? { ...resource, completed: !resource.completed } : resource,
                      ),
                    }
                  : topic,
              ),
            }
          : subject,
      ),
    )
  }

  // Toggle resource revision
  const toggleResourceRevision = (subjectId, topicId, resourceId) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              topics: subject.topics.map((topic) =>
                topic.id === topicId
                  ? {
                      ...topic,
                      resources: topic.resources.map((resource) =>
                        resource.id === resourceId
                          ? {
                              ...resource,
                              markedForRevision: !resource.markedForRevision,
                            }
                          : resource,
                      ),
                    }
                  : topic,
              ),
            }
          : subject,
      ),
    )
  }

  // Open notes editor
  const openNotes = (subjectId, topicId, resourceId) => {
    const subject = subjects.find((s) => s.id === subjectId)
    const topic = subject.topics.find((t) => t.id === topicId)
    const resource = topic.resources.find((r) => r.id === resourceId)

    setCurrentNotes({
      subjectId,
      topicId,
      resourceId,
      content: resource.notes || "",
      title: resource.title,
    })

    setIsNotesOpen(true)
  }

  // Save notes content
  const saveNotes = () => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === currentNotes.subjectId
          ? {
              ...subject,
              topics: subject.topics.map((topic) =>
                topic.id === currentNotes.topicId
                  ? {
                      ...topic,
                      resources: topic.resources.map((resource) =>
                        resource.id === currentNotes.resourceId
                          ? { ...resource, notes: currentNotes.content }
                          : resource,
                      ),
                    }
                  : topic,
              ),
            }
          : subject,
      ),
    )

    setIsNotesOpen(false)
  }

  // Add new resource to form
  const handleAddResource = () => {
    setNewResources([
      ...newResources,
      {
        id: `resource-${Date.now()}`,
        title: "",
        difficulty: "Easy",
        completed: false,
        markedForRevision: false,
        notes: "",
      },
    ])
  }

  // Handle resource change in form
  const handleResourceChange = (index, field, value) => {
    const updatedResources = [...newResources]
    updatedResources[index] = {
      ...updatedResources[index],
      [field]: value,
    }
    setNewResources(updatedResources)
  }

  // Add new topic
  const handleAddTopic = () => {
    if (!selectedSubject || !newTopicTitle || newResources.some((r) => !r.title)) {
      alert("Please fill in all required fields")
      return
    }

    setSubjects(
      subjects.map((subject) =>
        subject.id === selectedSubject
          ? {
              ...subject,
              topics: [
                ...subject.topics,
                {
                  id: `topic-${Date.now()}`,
                  title: newTopicTitle,
                  resources: newResources,
                  expanded: true,
                },
              ],
            }
          : subject,
      ),
    )

    // Reset form
    setNewTopicTitle("")
    setSelectedSubject("")
    setNewResources([
      {
        id: `resource-${Date.now()}`,
        title: "",
        difficulty: "Easy",
        completed: false,
        markedForRevision: false,
        notes: "",
      },
    ])
    setIsAddTopicOpen(false)
  }

  // Add new subject
  const handleAddSubject = () => {
    if (!newSubjectTitle) {
      alert("Please enter a subject title")
      return
    }

    setSubjects([
      ...subjects,
      {
        id: `subject-${Date.now()}`,
        title: newSubjectTitle,
        topics: [],
        expanded: true,
      },
    ])

    // Reset form
    setNewSubjectTitle("")
    setIsAddSubjectOpen(false)
  }

  // Calculate total progress
  const totalResources = subjects.flatMap((subject) => subject.topics.flatMap((topic) => topic.resources)).length

  const completedResources = subjects.flatMap((subject) =>
    subject.topics.flatMap((topic) => topic.resources.filter((resource) => resource.completed)),
  ).length

  const progressPercentage = totalResources > 0 ? Math.round((completedResources / totalResources) * 100) : 0

  const handleResetToDefault = () => {
    if (window.confirm("Are you sure you want to reset to default data? This will erase all your changes.")) {
      localStorage.removeItem(dataKey)
      setSubjects(customData || initialData)
    }
  }

  // Add new problem to existing topic
  const handleAddProblem = () => {
    if (!selectedTopic || !newProblem.title) {
      alert("Please fill in all required fields")
      return
    }

    // Find the subject that contains the selected topic
    const subjectWithTopic = subjects.find((subject) => subject.topics.some((topic) => topic.id === selectedTopic))

    if (!subjectWithTopic) {
      alert("Topic not found")
      return
    }

    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectWithTopic.id
          ? {
              ...subject,
              topics: subject.topics.map((topic) =>
                topic.id === selectedTopic
                  ? {
                      ...topic,
                      resources: [
                        ...topic.resources,
                        {
                          id: `resource-${Date.now()}`,
                          ...newProblem,
                        },
                      ],
                    }
                  : topic,
              ),
            }
          : subject,
      ),
    )

    // Reset form
    setNewProblem({
      title: "",
      articles: [], // Changed from article to articles array
      youtube: "",
      practice: "",
      difficulty: "Easy",
      completed: false,
      markedForRevision: false,
      notes: "",
    })
    setSelectedTopic("")
    setIsAddProblemOpen(false)
  }

  return (
    <div className="study-tracker__wrapper">
      {!hideHeader && <Header />}

      {!hideTitle && (
        <header className="study-tracker__header">
          <h1 className="study-tracker__main-title">{title}</h1>
        </header>
      )}
      {/* <header className="study-tracker__header">
        <h1 className="study-tracker__main-title">Study Progress Tracker</h1>
      </header> */}

      <div className="study-tracker">
        {/* Progress Bar */}
        <div className="study-tracker__progress-container">
          <div className="study-tracker__progress-info">
            <h2 className="study-tracker__progress-title">
              Your Progress: {completedResources}/{totalResources}
            </h2>
            <div className="study-tracker__progress-bar-container">
              <div className="study-tracker__progress-bar" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <span className="study-tracker__progress-percentage">{progressPercentage}% complete</span>
          </div>
          <div className="study-tracker__actions">
            {/* <button className="study-tracker__shuffle-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"></path>
                <path d="m18 2 4 4-4 4"></path>
                <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"></path>
                <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"></path>
                <path d="m18 14 4 4-4 4"></path>
              </svg>
            </button> */}
            <button className="study-tracker__revision-btn" onClick={() => setShowRevision(!showRevision)}>
              Show Revision
            </button>
            <button className="study-tracker__btn study-tracker__btn--cancel" onClick={handleResetToDefault}>
              Reset to Default
            </button>
          </div>
        </div>

        {/* Subjects */}
        {subjects.map((subject) => (
          <div key={subject.id} className="study-tracker__subject">
            <div className="study-tracker__subject-header">
              <h2 className="study-tracker__subject-title" onClick={() => toggleSubjectExpand(subject.id)}>
                {subject.title}
              </h2>
              <div className="study-tracker__subject-info">
                <span className="study-tracker__subject-count">
                  {subject.topics.flatMap((topic) => topic.resources).filter((resource) => resource.completed).length}/
                  {subject.topics.flatMap((topic) => topic.resources).length}
                </span>
                <button className="study-tracker__toggle-btn" onClick={() => toggleSubjectExpand(subject.id)}>
                  {subject.expanded ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {subject.expanded && (
              <div className="study-tracker__subject-content">
                {/* Topics */}
                {subject.topics.map((topic) => {
                  const completedCount = topic.resources.filter((resource) => resource.completed).length

                  const filteredResources = showRevision
                    ? topic.resources.filter((resource) => resource.markedForRevision)
                    : topic.resources

                  if (showRevision && filteredResources.length === 0) {
                    return null
                  }

                  return (
                    <div key={topic.id} className="study-tracker__topic">
                      <div className="study-tracker__topic-header">
                        <h3
                          className="study-tracker__topic-title"
                          onClick={() => toggleTopicExpand(subject.id, topic.id)}
                        >
                          {topic.title}
                        </h3>
                        <div className="study-tracker__topic-info">
                          <span className="study-tracker__topic-count">
                            {completedCount}/{topic.resources.length}
                          </span>
                          <button
                            className="study-tracker__toggle-btn"
                            onClick={() => toggleTopicExpand(subject.id, topic.id)}
                          >
                            {topic.expanded ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="m18 15-6-6-6 6" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Resources Table */}
                      {topic.expanded && filteredResources.length > 0 && (
                        <div className="study-tracker__resources-container">
                          <table className="study-tracker__resources-table">
                            <thead>
                              <tr>
                                <th className="study-tracker__table-header study-tracker__table-header--status">
                                  STATUS
                                </th>
                                <th className="study-tracker__table-header study-tracker__table-header--problem">
                                  PROBLEM
                                </th>
                                <th className="study-tracker__table-header study-tracker__table-header--article">
                                  ARTICLE
                                </th>
                                <th className="study-tracker__table-header study-tracker__table-header--youtube">
                                  YOUTUBE
                                </th>
                                <th className="study-tracker__table-header study-tracker__table-header--notes">
                                  NOTES
                                </th>
                                <th className="study-tracker__table-header study-tracker__table-header--practice">
                                  {columnConfig.practice?.label || "PRACTICE"}
                                </th>
                                <th className="study-tracker__table-header study-tracker__table-header--difficulty">
                                  {columnConfig.difficulty?.label || "DIFFICULTY"}
                                </th>
                                <th className="study-tracker__table-header study-tracker__table-header--revision">
                                  REVISION
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredResources.map((resource) => (
                                <tr key={resource.id} className="study-tracker__resource-row">
                                  <td className="study-tracker__table-cell study-tracker__table-cell--status">
                                    <div
                                      className={`study-tracker__status-checkbox ${resource.completed ? "study-tracker__status-checkbox--completed" : ""}`}
                                      onClick={() => toggleResourceCompletion(subject.id, topic.id, resource.id)}
                                    >
                                      {resource.completed && (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        >
                                          <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                      )}
                                    </div>
                                  </td>
                                  <td className="study-tracker__table-cell study-tracker__table-cell--problem">
                                    {resource.title}
                                  </td>
                                  <td className="study-tracker__table-cell study-tracker__table-cell--article">
                                    {(resource.articles && resource.articles.length > 0) || resource.article ? (
                                      <div className="study-tracker__dropdown">
                                        <button
                                          className="study-tracker__resource-link"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            const dropdown = e.currentTarget.nextElementSibling
                                            dropdown.style.display =
                                              dropdown.style.display === "block" ? "none" : "block"
                                          }}
                                        >
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
                                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                            <polyline points="14 2 14 8 20 8" />
                                            <line x1="16" x2="8" y1="13" y2="13" />
                                            <line x1="16" x2="8" y1="17" y2="17" />
                                            <line x1="10" x2="8" y1="9" y2="9" />
                                          </svg>
                                        </button>
                                        <div className="study-tracker__dropdown-content">
                                          {resource.articles && resource.articles.length > 0 ? (
                                            resource.articles.map((article, index) => (
                                              <a
                                                key={index}
                                                href={article.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="study-tracker__dropdown-item"
                                              >
                                                {article.title || `Article ${index + 1}`}
                                              </a>
                                            ))
                                          ) : resource.article ? (
                                            <a
                                              href={resource.article}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="study-tracker__dropdown-item"
                                            >
                                              Article
                                            </a>
                                          ) : null}
                                        </div>
                                      </div>
                                    ) : null}
                                  </td>
                                  <td className="study-tracker__table-cell study-tracker__table-cell--youtube">
                                    {resource.youtube && (
                                      <a
                                        href={resource.youtube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="study-tracker__resource-link study-tracker__resource-link--youtube"
                                      >
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
                                          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                                          <path d="m10 15 5-3-5-3z" />
                                        </svg>
                                      </a>
                                    )}
                                  </td>
                                  <td className="study-tracker__table-cell study-tracker__table-cell--notes">
                                    <button
                                      className="study-tracker__notes-btn"
                                      onClick={() => openNotes(subject.id, topic.id, resource.id)}
                                      title={resource.notes ? "Edit Notes" : "Add Notes"}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill={resource.notes ? "currentColor" : "none"}
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={resource.notes ? "study-tracker__notes-icon--has-content" : ""}
                                      >
                                        <path d="M12 20h9"></path>
                                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                                      </svg>
                                    </button>
                                  </td>
                                  <td className="study-tracker__table-cell study-tracker__table-cell--practice">
                                    {resource[columnConfig.practice?.field || "practice"] && (
                                      <a
                                        href={resource[columnConfig.practice?.field || "practice"]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="study-tracker__resource-link"
                                      >
                                        {columnConfig.practice?.icon || (
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
                                            <polyline points="16 18 22 12 16 6" />
                                            <polyline points="8 6 2 12 8 18" />
                                          </svg>
                                        )}
                                      </a>
                                    )}
                                  </td>

                                  <td className="study-tracker__table-cell study-tracker__table-cell--difficulty">
                                    {columnConfig.difficulty?.type === "stars" ? (
                                      <div className="study-tracker__rating-stars">
                                        {renderStars(resource[columnConfig.difficulty.field || "difficulty"])}
                                      </div>
                                    ) : (
                                      <div
                                        className={`study-tracker__difficulty-badge ${
                                          typeof resource.difficulty === "string"
                                            ? `study-tracker__difficulty-badge--${resource.difficulty.toLowerCase()}`
                                            : ""
                                        }`}
                                      >
                                        {resource.difficulty}
                                      </div>
                                    )}
                                  </td>

                                  <td className="study-tracker__table-cell study-tracker__table-cell--revision">
                                    <div
                                      className="study-tracker__revision-star"
                                      onClick={() => toggleResourceRevision(subject.id, topic.id, resource.id)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill={resource.markedForRevision ? "currentColor" : "none"}
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={
                                          resource.markedForRevision ? "study-tracker__revision-star--active" : ""
                                        }
                                      >
                                        {/* <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14  : "" */}
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                      </svg>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {topic.expanded && (
                        <button
                          className="study-tracker__add-btn study-tracker__add-btn--problem"
                          onClick={() => {
                            setSelectedTopic(topic.id)
                            setIsAddProblemOpen(true)
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                          </svg>
                          Add Problem
                        </button>
                      )}
                    </div>
                  )
                })}

                {/* Add Topic Button */}
                <button className="study-tracker__add-btn" onClick={() => setIsAddTopicOpen(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  Add New Topic
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add Subject Button */}
        <button
          className="study-tracker__add-btn study-tracker__add-btn--subject"
          onClick={() => setIsAddSubjectOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Add New Subject
        </button>
      </div>

      {/* Add Topic Dialog */}
      {isAddTopicOpen && (
        <div className="study-tracker__modal">
          <div className="study-tracker__modal-content">
            <div className="study-tracker__modal-header">
              <h2 className="study-tracker__modal-title">Add New Topic</h2>
              <button className="study-tracker__modal-close" onClick={() => setIsAddTopicOpen(false)}>
                &times;
              </button>
            </div>
            <div className="study-tracker__modal-body">
              <div className="study-tracker__form-group">
                <label className="study-tracker__form-label">Subject</label>
                <select
                  className="study-tracker__form-select"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="study-tracker__form-group">
                <label className="study-tracker__form-label">Topic Title</label>
                <input
                  type="text"
                  className="study-tracker__form-input"
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder="Enter topic title"
                />
              </div>

              <div className="study-tracker__form-group">
                <label className="study-tracker__form-label">Problems</label>
                {newResources.map((resource, index) => (
                  <div key={resource.id} className="study-tracker__resource-form">
                    <div className="study-tracker__form-row">
                      <div className="study-tracker__form-group study-tracker__form-group--half">
                        <label className="study-tracker__form-label">Title</label>
                        <input
                          type="text"
                          className="study-tracker__form-input"
                          value={resource.title}
                          onChange={(e) => handleResourceChange(index, "title", e.target.value)}
                          placeholder="Problem title"
                        />
                      </div>
                      <div className="study-tracker__form-group study-tracker__form-group--half">
                        <label className="study-tracker__form-label">
                          {(customizeForms && customizeForms("difficulty")?.label) || "Difficulty"}
                        </label>
                        {customizeForms && customizeForms("difficulty") ? (
                          <select
                            className="study-tracker__form-select"
                            value={resource.difficulty}
                            onChange={(e) => handleResourceChange(index, "difficulty", e.target.value)}
                          >
                            {customizeForms("difficulty").options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <select
                            className="study-tracker__form-select"
                            value={resource.difficulty}
                            onChange={(e) => handleResourceChange(index, "difficulty", e.target.value)}
                          >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                          </select>
                        )}
                      </div>
                    </div>
                    <div className="study-tracker__form-row">
                      <div className="study-tracker__form-group study-tracker__form-group--half">
                        <label className="study-tracker__form-label">YouTube Link</label>
                        <input
                          type="text"
                          className="study-tracker__form-input"
                          value={resource.youtube || ""}
                          onChange={(e) => handleResourceChange(index, "youtube", e.target.value)}
                          placeholder="https://youtube.com/..."
                        />
                      </div>
                      <div className="study-tracker__form-group study-tracker__form-group--half">
                        <label className="study-tracker__form-label">Article Link</label>
                        <input
                          type="text"
                          className="study-tracker__form-input"
                          value={resource.article || ""}
                          onChange={(e) => handleResourceChange(index, "article", e.target.value)}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <div className="study-tracker__form-row">
                      <div className="study-tracker__form-group">
                        <label className="study-tracker__form-label">Practice Link</label>
                        <input
                          type="text"
                          className="study-tracker__form-input"
                          value={resource.practice || ""}
                          onChange={(e) => handleResourceChange(index, "practice", e.target.value)}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  className="study-tracker__add-btn study-tracker__add-btn--resource"
                  type="button"
                  onClick={handleAddResource}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  Add Problem
                </button>
              </div>
            </div>
            <div className="study-tracker__modal-footer">
              <button
                className="study-tracker__btn study-tracker__btn--cancel"
                onClick={() => setIsAddTopicOpen(false)}
              >
                Cancel
              </button>
              <button className="study-tracker__btn study-tracker__btn--primary" onClick={handleAddTopic}>
                Add Topic
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Subject Dialog */}
      {isAddSubjectOpen && (
        <div className="study-tracker__modal">
          <div className="study-tracker__modal-content study-tracker__modal-content--small">
            <div className="study-tracker__modal-header">
              <h2 className="study-tracker__modal-title">Add New Subject</h2>
              <button className="study-tracker__modal-close" onClick={() => setIsAddSubjectOpen(false)}>
                &times;
              </button>
            </div>
            <div className="study-tracker__modal-body">
              <div className="study-tracker__form-group">
                <label className="study-tracker__form-label">Subject Title</label>
                <input
                  type="text"
                  className="study-tracker__form-input"
                  value={newSubjectTitle}
                  onChange={(e) => setNewSubjectTitle(e.target.value)}
                  placeholder="Enter subject title"
                />
              </div>
            </div>
            <div className="study-tracker__modal-footer">
              <button
                className="study-tracker__btn study-tracker__btn--cancel"
                onClick={() => setIsAddSubjectOpen(false)}
              >
                Cancel
              </button>
              <button className="study-tracker__btn study-tracker__btn--primary" onClick={handleAddSubject}>
                Add Subject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes Dialog */}
      {isNotesOpen && (
        <div className="study-tracker__modal">
          <div className="study-tracker__modal-content study-tracker__modal-content--large">
            <div className="study-tracker__modal-header">
              <h2 className="study-tracker__modal-title">Notes: {currentNotes.title}</h2>
              <button className="study-tracker__modal-close" onClick={() => setIsNotesOpen(false)}>
                &times;
              </button>
            </div>
            <div className="study-tracker__modal-body">
              <div className="study-tracker__notes-container">
                <textarea
                  className="study-tracker__notes-textarea"
                  value={currentNotes.content}
                  onChange={(e) => setCurrentNotes({ ...currentNotes, content: e.target.value })}
                  placeholder="Write your notes here..."
                  rows={15}
                ></textarea>
              </div>
            </div>
            <div className="study-tracker__modal-footer">
              <button className="study-tracker__btn study-tracker__btn--cancel" onClick={() => setIsNotesOpen(false)}>
                Cancel
              </button>
              <button className="study-tracker__btn study-tracker__btn--primary" onClick={saveNotes}>
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Problem Dialog */}
      {isAddProblemOpen && (
        <div className="study-tracker__modal">
          <div className="study-tracker__modal-content">
            <div className="study-tracker__modal-header">
              <h2 className="study-tracker__modal-title">Add New Problem</h2>
              <button className="study-tracker__modal-close" onClick={() => setIsAddProblemOpen(false)}>
                &times;
              </button>
            </div>
            <div className="study-tracker__modal-body">
              <div className="study-tracker__form-group">
                <label className="study-tracker__form-label">Topic</label>
                <select
                  className="study-tracker__form-select"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                >
                  <option value="">Select a topic</option>
                  {subjects.flatMap((subject) =>
                    subject.topics.map((topic) => (
                      <option key={topic.id} value={topic.id}>
                        {topic.title} (in {subject.title})
                      </option>
                    )),
                  )}
                </select>
              </div>

              <div className="study-tracker__form-group">
                <label className="study-tracker__form-label">Problem Title</label>
                <input
                  type="text"
                  className="study-tracker__form-input"
                  value={newProblem.title}
                  onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })}
                  placeholder="Enter problem title"
                />
              </div>

              <div className="study-tracker__form-row">
                <div className="study-tracker__form-group study-tracker__form-group--half">
                  <label className="study-tracker__form-label">YouTube Link</label>
                  <input
                    type="text"
                    className="study-tracker__form-input"
                    value={newProblem.youtube}
                    onChange={(e) => setNewProblem({ ...newProblem, youtube: e.target.value })}
                    placeholder="https://youtube.com/..."
                  />
                </div>
                <div className="study-tracker__form-group study-tracker__form-group--half">
                  <label className="study-tracker__form-label">Article Links</label>
                  <div className="study-tracker__multi-input">
                    {newProblem.articles &&
                      newProblem.articles.map((article, index) => (
                        <div key={index} className="study-tracker__multi-input-row">
                          <input
                            type="text"
                            className="study-tracker__form-input"
                            value={article.title || ""}
                            onChange={(e) => {
                              const updatedArticles = [...newProblem.articles]
                              updatedArticles[index] = { ...updatedArticles[index], title: e.target.value }
                              setNewProblem({ ...newProblem, articles: updatedArticles })
                            }}
                            placeholder="Article title"
                          />
                          <input
                            type="text"
                            className="study-tracker__form-input"
                            value={article.url || ""}
                            onChange={(e) => {
                              const updatedArticles = [...newProblem.articles]
                              updatedArticles[index] = { ...updatedArticles[index], url: e.target.value }
                              setNewProblem({ ...newProblem, articles: updatedArticles })
                            }}
                            placeholder="https://..."
                          />
                          <button
                            type="button"
                            className="study-tracker__btn study-tracker__btn--cancel"
                            onClick={() => {
                              const updatedArticles = newProblem.articles.filter((_, i) => i !== index)
                              setNewProblem({ ...newProblem, articles: updatedArticles })
                            }}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="study-tracker__btn study-tracker__btn--primary"
                      onClick={() => {
                        const updatedArticles = [...(newProblem.articles || []), { title: "", url: "" }]
                        setNewProblem({ ...newProblem, articles: updatedArticles })
                      }}
                    >
                      Add Article Link
                    </button>
                  </div>
                </div>
              </div>

              <div className="study-tracker__form-row">
                <div className="study-tracker__form-group study-tracker__form-group--half">
                  <label className="study-tracker__form-label">Practice Link</label>
                  <input
                    type="text"
                    className="study-tracker__form-input"
                    value={newProblem.practice}
                    onChange={(e) => setNewProblem({ ...newProblem, practice: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="study-tracker__form-group study-tracker__form-group--half">
                  <label className="study-tracker__form-label">
                    {(customizeForms && customizeForms("difficulty")?.label) || "Difficulty"}
                  </label>
                  {customizeForms && customizeForms("difficulty") ? (
                    <select
                      className="study-tracker__form-select"
                      value={newProblem.difficulty}
                      onChange={(e) => setNewProblem({ ...newProblem, difficulty: e.target.value })}
                    >
                      {customizeForms("difficulty").options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      className="study-tracker__form-select"
                      value={newProblem.difficulty}
                      onChange={(e) => setNewProblem({ ...newProblem, difficulty: e.target.value })}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  )}
                </div>
              </div>
            </div>
            <div className="study-tracker__modal-footer">
              <button
                className="study-tracker__btn study-tracker__btn--cancel"
                onClick={() => setIsAddProblemOpen(false)}
              >
                Cancel
              </button>
              <button className="study-tracker__btn study-tracker__btn--primary" onClick={handleAddProblem}>
                Add Problem
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DSATracker

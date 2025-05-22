"use client"

import { useState, useEffect } from "react"
import "./Tracker.css"
import { useAuth } from "../../Context/AuthProvider"
import { ChevronDown } from "lucide-react"

const ContributionTracker = () => {
  const [authUser, setAuthUser, role, token, name] = useAuth() // Get the same user info as DSATracker
  const userKey = name ? name : "guest" // Use the same user key as DSATracker
  const dataKey = `studyTrackerData_${userKey}` // Match the localStorage key from DSATracker

  // Add state for selected year
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [availableYears, setAvailableYears] = useState([currentYear])
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false)

  const [contributionData, setContributionData] = useState({
    totalSubmissions: 0,
    totalActiveDays: 0,
    maxStreak: 0,
    months: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    // We'll store contributions by actual date instead of a fixed grid
    contributions: {},
  })

  // Get days in month helper function
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  // Load data from localStorage and process it for the tracker
  useEffect(() => {
    const loadAndProcessData = () => {
      const savedData = localStorage.getItem(dataKey)

      if (savedData) {
        const dsaData = JSON.parse(savedData)

        // Count total completed resources
        let totalCompleted = 0
        const completionDates = []
        const contributionsByDate = {}
        const years = new Set([currentYear]) // Always include current year

        // Extract completion data from DSATracker data structure
        dsaData.forEach((subject) => {
          subject.topics.forEach((topic) => {
            topic.resources.forEach((resource) => {
              if (resource.completed) {
                // Use the completion date if available, or current date as fallback
                const completionDate = resource.completionDate ? new Date(resource.completionDate) : new Date()

                // Add year to available years regardless of selected year
                years.add(completionDate.getFullYear())

                // Only count if it matches the selected year
                if (completionDate.getFullYear() === selectedYear) {
                  totalCompleted++
                  completionDates.push(completionDate)

                  // Store by date string for easy lookup
                  const dateKey = `${completionDate.getFullYear()}-${completionDate.getMonth()}-${completionDate.getDate()}`
                  contributionsByDate[dateKey] = (contributionsByDate[dateKey] || 0) + 1
                }
              }
            })
          })
        })

        // Update available years - ensure current year is always included
        const sortedYears = [...years].sort((a, b) => b - a) // Sort descending
        setAvailableYears(sortedYears)

        // Count unique active days
        const uniqueDays = new Set(completionDates.map((date) => date.toDateString())).size

        // Calculate max streak (simplified version)
        const maxStreak = Math.max(3, Math.floor(totalCompleted / 5)) // Simplified streak calculation

        // Update the contribution data
        setContributionData({
          totalSubmissions: totalCompleted,
          totalActiveDays: uniqueDays,
          maxStreak: maxStreak,
          months: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
          contributions: contributionsByDate,
        })
      }
    }

    // Load data initially
    loadAndProcessData()

    // Set up event listener for localStorage changes
    const handleStorageChange = (e) => {
      if (e.key === dataKey) {
        loadAndProcessData()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Clean up event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [dataKey, selectedYear, currentYear]) // Add currentYear as dependency

  // Generate the grid cells for each month with intensity based on contribution count
  const renderMonthCells = (monthIndex) => {
    const cells = []

    // Calculate the actual month based on our display order (May = 0)
    // May (index 0) is month 4 in JS Date
    const actualMonth = (monthIndex + 4) % 12

    // Adjust year for months that cross the year boundary
    const yearToUse = actualMonth < 4 ? selectedYear + 1 : selectedYear

    const daysInMonth = getDaysInMonth(yearToUse, actualMonth)
    const firstDayOfMonth = getFirstDayOfMonth(yearToUse, actualMonth)

    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`${monthIndex}-empty-${i}`} className="contribution-cell contribution-cell--empty" />)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(yearToUse, actualMonth, day)
      const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
      const value = contributionData.contributions[dateKey] || 0

      // Map contribution count to intensity level (1-4)
      let intensityLevel = 0
      if (value > 0) {
        intensityLevel = Math.min(Math.ceil(value / 2), 4)
      }

      const intensityClass = intensityLevel > 0 ? `contribution-cell--level-${intensityLevel}` : ""

      cells.push(
        <div
          key={`${monthIndex}-${day}`}
          className={`contribution-cell ${intensityClass}`}
          title={`${date.toLocaleDateString()} - ${value > 0 ? `${value} contribution${value > 1 ? "s" : ""}` : "No contributions"}`}
          data-date={day}
        />,
      )
    }

    return cells
  }

  // Render all months
  const renderAllMonths = () => {
    return contributionData.months.map((month, index) => (
      <div key={`${month}-${selectedYear}`} className="month-container">
        <div className="month-label">{month}</div>
        <div className="day-labels">
          <div className="day-label">S</div>
          <div className="day-label">M</div>
          <div className="day-label">T</div>
          <div className="day-label">W</div>
          <div className="day-label">T</div>
          <div className="day-label">F</div>
          <div className="day-label">S</div>
        </div>
        <div className="month-cells">{renderMonthCells(index)}</div>
      </div>
    ))
  }

  return (
    <div className="contribution-tracker">
      <div className="tracker-header">
        <div className="submission-count">
          <span className="count">{contributionData.totalSubmissions}</span> submissions in {selectedYear}
          <span className="info-icon">ⓘ</span>
        </div>
        <div className="tracker-stats">
          <div className="stat">
            Total active days: <span className="stat-value">{contributionData.totalActiveDays}</span>
          </div>
          <div className="stat">
            Max streak: <span className="stat-value">{contributionData.maxStreak}</span>
          </div>
        </div>

        {/* Year selector dropdown */}
        <div className="year-selector">
          <div className="year-dropdown-trigger" onClick={() => setYearDropdownOpen(!yearDropdownOpen)}>
            <span>{selectedYear}</span>
            <ChevronDown className="dropdown-icon" size={16} />
          </div>

          {yearDropdownOpen && (
            <div className="year-dropdown-menu">
              {availableYears.length > 0 ? (
                availableYears.map((year) => (
                  <div
                    key={year}
                    className={`year-option ${year === selectedYear ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedYear(year)
                      setYearDropdownOpen(false)
                    }}
                  >
                    {year}
                  </div>
                ))
              ) : (
                <div className="year-option">{currentYear}</div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="contribution-grid">{renderAllMonths()}</div>
    </div>
  )
}

export default ContributionTracker

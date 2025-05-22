"use client"
import Header from "../Header/Header"
import DSATracker from "../DSA_Preparation/DSATracker"
import systemData from "./SystemDesignInterview"
import { Scroll } from "lucide-react"

function SystemInterview() {

  const customizeForms = (formType) => {
    // For both add topic and add problem forms
    if (formType === "difficulty") {
      return {
        label: "Rating",
        options: [
          { value: "1", label: "1 Star" },
          { value: "2", label: "2 Stars" },
          { value: "3", label: "3 Stars" },
          { value: "4", label: "4 Stars" },
          { value: "5", label: "5 Stars" },
        ],
      }
    }
    return null
  }
  
  return (
    <div className="study-tracker__wrapper">
      <Header />
      <header className="study-tracker__header">
        <h1 className="study-tracker__main-title">Interview Preparation Tracker</h1>
      </header>
      <div className="study-tracker">
        <DSATracker
          customData={systemData}
          storageKey="systemDesignInterviewTrackerData"
          hideTitle={true}
          hideHeader={true}
          columnConfig={{
            practice: {
              label: "Handwritten Notes",
              field: "practice",
              icon: <Scroll size={20} />,
            },
            difficulty: {
              label: "Rating",
              field: "difficulty",
              type: "stars", // Add this line to use stars instead of difficulty badges
            },
          }}
          customizeForms={customizeForms}
        />
      </div>
    </div>
  )
}

export default SystemInterview

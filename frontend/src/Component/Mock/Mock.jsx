import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import mockTestData from "./mockTestData"; // adjust path accordingly
import "./Mock.css";

const MockPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const subjects = mockTestData[category] || [];

  return (
    <div className="subject-page">
      <button className="hamburger" onClick={() => setSidebarOpen(!isSidebarOpen)}>
        ☰
      </button>

      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">Dashboard</div>
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/userprofile")}>Profile</li>
          <li onClick={() => navigate("/register")}>Sign Up</li>
        </ul>
      </aside>

      <div className="main-content">
        <h1 className="page-title">{category.toUpperCase()} Mock Test</h1>
        <div className="subject-container">
          {subjects.map((subject, index) => (
            <div key={index} className="subject-box">
              <h3 className="subject-name">{subject.name}</h3>
              <div className="subject-content">
                <button
                  className="subject-dropdown-link"
                  onClick={() => window.open(subject.URL, "_blank")}
                >
                  YouTube Link
                </button>

                <button
                  onClick={() =>
                    navigate(
                      `/practice-set?category=${encodeURIComponent(subject.category)}&subjectName=${encodeURIComponent(
                        subject.name
                      )}`
                    )
                  }
                  className="subject-dropdown-link"
                >
                  Practice Set
                </button>
                <button
                  onClick={() =>
                    navigate(
                      `/instruction?category=${encodeURIComponent(subject.category)}&subjectName=${encodeURIComponent(
                        subject.name
                      )}`
                    )
                  }
                  className="subject-dropdown-link"
                >
                  Mock Test
                </button>
              </div>
            </div>
          ))}
          <div
            className="new-subject-box"
            onClick={() => navigate(`/CS_MockTest/${category}`)}
            style={{ cursor: "pointer" }}
          >
            <h4 className="subject-name">Full Mock Test</h4>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MockPage;

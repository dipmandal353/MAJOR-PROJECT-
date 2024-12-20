import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Mock.css';

const MockPage = () => {
  const navigate = useNavigate();

  const subjects = [
    { name: "C Programming", category: "Computer Science" },
    { name: "OOPs using C++", category: "Computer Science" },
    { name: "RDBMS", category: "Computer Science" },
    { name: "Networking", category: "Computer Science" },
    { name: "Machine Learning", category: "Computer Science" },
    { name: "Operating System", category: "Computer Science" },
    { name: "JAVA", category: "Computer Science" },
  ];

  return (
    <div className="subject-page">
      <aside className="sidebar">
        <div className="sidebar-header">Dashboard</div>
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li onClick={() => navigate("/register")}>Sign Up</li>
          <li onClick={() => navigate("/register")}>Sign Out</li>
        </ul>
      </aside>

      <div className="main-content">
        <h1 className="page-title">Mock Test Subjects</h1>
        <div className="subject-container">
          {subjects.map((subject, index) => (
            <div key={index} className="subject-box">
              <h3 className="subject-name">{subject.name}</h3>
              <div className="hover-content">
                <button
                  onClick={() => navigate(`/youtube`)}
                  className="dropdown-link"
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
                  className="dropdown-link"
                >
                  Practice Set
                </button>
                <button onClick={() =>
    navigate(
      `/instruction?category=${encodeURIComponent(subject.category)}&subjectName=${encodeURIComponent(subject.name)}`
    )
  }
  className="dropdown-link"
>
  Mock Test
</button>

              </div>
            </div>
          ))}
          
          <div
            className="subject-box new-subject-box"
            onClick={() => navigate("/CS_MockTest")}
          >
            <h4 className="subject-name">
              Full Mock Test on all Computer Science topics
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockPage;


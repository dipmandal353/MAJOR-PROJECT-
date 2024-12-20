import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import './Dashboard.css';


import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../../Context/AuthProvider";
import Header from "../Header/Header";

export default function Dashboard() {
  const navigate = useNavigate();
  const [authUser, setAuthUser, role, token, name] = useAuth();

  const studyOptions = [
    { title: 'MockTest', icon: '📚', color: 'blue', path: '/testTopics' },
    { title: 'Interview Preparation', icon: '👥', color: 'green', path: '/interview-prep' },
    { title: 'Entrance Exam Prep', icon: '🎓', color: 'purple', path: '/entrance-exam' },
    { title: 'Quiz', icon: '❓', color: 'yellow', path: '/quiz' },
  ];

  const handleNavigate = (path) => {
    navigate(path); 
  }
  

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
    

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Welcome back, {name} !! 🧠</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {studyOptions.map((option, index) => (
            <div
              key={index}
              className="block"
              onClick={() => handleNavigate(option.path)} // Programmatic navigation
            >
              <div
                className={`bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 h-full flex flex-col cursor-pointer`}
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full mb-4 bg-${option.color}-100`}
                >
                  <span className="text-2xl">{option.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 flex-grow">
                  {option.title === 'MockTest' && 'Practice with mock tests on core CS subjects'}
                  {option.title === 'Interview Preparation' && 'Get ready for your next interview'}
                  {option.title === 'Entrance Exam Prep' && 'Prepare for various entrance exams'}
                  {option.title === 'Quiz' && 'Test your knowledge with interactive quizzes'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Toaster /> {/* For displaying toast notifications */}
    </div>
    </>
  );
}


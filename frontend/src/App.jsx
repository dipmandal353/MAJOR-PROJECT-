import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from "../src/Context/AuthProvider";

import Animation from './Component/LogoAnimation/LogoAnimation';
import HomePage from './Component/HomePage/HomePage';
import Register from './Component/Register/Register';
import Dashboard from './Component/Dashboard/Dashboard'; 
import MockPage from './Component/Mock/Mock'; 
import IntTypes from './Component/InterviewTypes/InterviewTypes.jsx'
import TechInt from './Component/InterviewPrep/TechnicalInterview.jsx';
import BehaveInt from './Component/InterviewPrep/BehavioralInterview.jsx';
import SDInt from './Component/InterviewPrep/SystemDesignInterview.jsx';
import QuestionForm from './Component/uploadQuestion/QuestionForm';
import PracticeSet from './Component/Practice set/PracticeSet'
import DSA from './Component/DSA_Preparation/DSATracker.jsx';
import Test_topic from './Component/test_topics/Test_topics';

import Userprofile from "./Component/Userprofile/Userprofile.jsx"
import Test from "./Component/Mock Test/Test"
import Instruction from "./Component/Mock Test/Instruction"
import ResultPage from './Component/Mock Test/Result';
import FullTest from './Component/Full_Mock_Test/Full_Test';
import FeedbackForm from "./Component/Feedback/FeedbackForm.jsx"
import Entrance from './Component/Entrance_Exam/Entrance_Exam.jsx'
import Entrance_qs from './Component/Entrance_Exam/Exam_qs.jsx'

import './Component/LogoAnimation/LogoAnimation.css';
import './Component/HomePage/HomePage.css';
import './Component/Register/Register.css';
import './Component/Mock/Mock.css'; 
import './Component/InterviewPrep/Interview.css'; 
import './Component/Dashboard/Dashboard.css';
import './Component/Header/Header.css';
import './Component/test_topics/Test_topics.css';
import './Component/Mock Test/Result.css'
import './Component/Full_Mock_Test/Full_Test.css';
import './Component/Feedback/Feedback.css';
import NotFound from "./Component/NotFound/Notfound.jsx"
import './Component/DSA_Preparation/DSATracker.css';
import './Component/InterviewTypes/InterviewTypes.css'
import './Component/Entrance_Exam/Entrance_Exam.css'
import './Component/Entrance_Exam/Exam_qs.css'

const App = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [authUser, setAuthUser, role, token, name] = useAuth();
  const [testStarted, setTestStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);

  const handleStartTest = (count) => {
    setQuestionCount(count);
    setTestStarted(true);
  };

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
      <Route path="/" element={ <Animation /> } />
        <Route path="/home" element={ <HomePage /> } />

        {/* from homepage to connect  home page and mock page */}
        {/* <Route path="/mocktest" element={authUser ? <Test /> : <Register/>} /> 
        
        */}
        <Route path="/Dashboard" element={authUser ? <Dashboard /> : <Navigate to="/register" />} />
        <Route path="/register" element={<Register isSignIn={isSignIn} setIsSignIn={setIsSignIn} />} />
        {/* <Route path="/Dashboard" element={authUser ? <Dashboard /> : <Register/>} /> */}
        <Route path="/testTopics" element={authUser ? <Test_topic /> : <Register/>} />
        <Route path="/:category" element={authUser ? <MockPage /> : <Register/>} />
        <Route path="/techinterview" element={authUser ? <TechInt/> : <Register/>} />
        <Route path="/behaveinterview" element={authUser ? <BehaveInt /> : <Register/>} />
        <Route path="/sdinterview" element={authUser ? <SDInt /> : <Register/>} />
        <Route path="/practice-set" element={authUser ? <PracticeSet />: <Register/>} />
        <Route path="/result" element={authUser ? <ResultPage />: <Register/>} />
        <Route path="/CS_MockTest/:category" element={authUser ? <FullTest />: <Register/>} />
        <Route path="/instruction" element={authUser ? <Instruction />: <Register/>} />
        <Route path="/Dsa" element={authUser ? <DSA />: <Register/>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/feedback" element={authUser ?<FeedbackForm/> : <Register/>} />
        <Route path="/inttypes" element={authUser ?<IntTypes/> : <Register/>} />
        <Route path="/entrance-exam" element={authUser ?<Entrance/> : <Register/>} />
        <Route path="/:examId/questions" element={authUser ?<Entrance_qs/> : <Register/>} />
        {/* <Route path="/register" element={<Register isSignIn={isSignIn} setIsSignIn={setIsSignIn} />} /> */}
        <Route
          path="/qs"
          element={
            role === "admin" ? (
              <QuestionForm />
            ) : (
              <Navigate to="/" replace /> 
            )
          }
        />
        <Route 
            path="/mocktest" 
            element={
              <Test />
              }
          />
      </Routes>
    </>
  );
};

export default App;

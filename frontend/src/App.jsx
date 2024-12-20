import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from "../src/Context/AuthProvider";

import HomePage from './Component/HomePage/HomePage';
import Register from './Component/Register/Register';
import Dashboard from './Component/Dashboard/Dashboard'; 
import MockPage from './Component/Mock/Mock'; 
import Interview from './Component/InterviewPrep/Interview';
import QuestionForm from './Component/uploadQuestion/QuestionForm';
import PracticeSet from './Component/Practice set/PracticeSet'

import Test_Page from './Component/test_topics/Test_topics';

import Test from "./Component/Mock Test/Test"
import Instruction from "./Component/Mock Test/Instruction"
import ResultPage from './Component/Mock Test/Result';
import FullTest from './Component/Full_Mock_Test/Full_Test';

import './Component/HomePage/HomePage.css';
import './Component/Register/Register.css';
import './Component/Mock/Mock.css'; 
import './Component/InterviewPrep/Interview.css'; 
import './Component/Dashboard/Dashboard.css';
import './Component/Header/Header.css';
import './Component/test_topics/test_topics.css';
import './Component/Mock Test/Result.css'
import './Component/Full_Mock_Test/Full_Test.css';

const MAX_QUESTIONS = 60;

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
        <Route path="/" element={ <HomePage /> } />
        
        <Route path="/Dashboard" element={authUser ? <Dashboard /> : <Navigate to="/register" />} />
        <Route path="/register" element={<Register isSignIn={isSignIn} setIsSignIn={setIsSignIn} />} />
        {/* <Route path="/Dashboard" element={authUser ? <Dashboard /> : <Register/>} /> */}
        <Route path="/testTopics" element={authUser ? <Test_Page /> : <Register/>} />
        <Route path="/mock-test" element={authUser ? <MockPage /> : <Register/>} />
        <Route path="/interview-prep" element={authUser ? <Interview /> : <Register/>} />
        <Route path="/practice-set" element={authUser ? <PracticeSet />: <Register/>} />
        <Route path="/result" element={authUser ? <ResultPage />: <Register/>} />
        <Route path="/CS_MockTest" element={authUser ? <FullTest />: <Register/>} />
        <Route path="/instruction" element={authUser ? <Instruction />: <Register/>} />

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

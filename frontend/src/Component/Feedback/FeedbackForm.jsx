import React, { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import './Feedback.css';

import { useAuth } from "../../Context/AuthProvider";

const FeedbackForm = () => {
  const [authUser, setAuthUser, role, token, sname, email] = useAuth();
  // const styles = {
  //   form: {
  //     width: '100%',
  //     maxWidth: '500px',
  //     margin: '0 auto',
  //     padding: '30px',
  //     backgroundColor: '#f9f9f9',
  //     borderRadius: '8px',
  //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  //     fontFamily: 'Arial, sans-serif',
  //   },
  //   heading: {
  //     fontSize: '24px',
  //     fontWeight: '600',
  //     marginBottom: '10px',
  //     textAlign: 'center',
  //     color: '#333',
  //   },
  //   description: {
  //     fontSize: '16px',
  //     textAlign: 'center',
  //     color: '#666',
  //     marginBottom: '30px',
  //   },
  //   inputContainer: {
  //     marginBottom: '20px',
  //   },
  //   label: {
  //     fontSize: '14px',
  //     fontWeight: '500',
  //     color: '#333',
  //     marginBottom: '5px',
  //     display: 'block',
  //   },
  //   input: {
  //     width: '100%',
  //     padding: '12px',
  //     fontSize: '16px',
  //     border: '1px solid #ddd',
  //     borderRadius: '6px',
  //     boxSizing: 'border-box',
  //     transition: 'border-color 0.3s',
  //   },
  //   textarea: {
  //     width: '400px',
  //     height: 'auto',
  //     height: '100px',
  //     padding: '12px',
  //     fontSize: '16px',
  //     border: '1px solid #ddd',
  //     borderRadius: '6px',
  //     boxSizing: 'border-box',
  //     resize: 'none',
  //     transition: 'border-color 0.3s',
  //   },
  //   submitButton: {
  //     width: '100%',
  //     padding: '12px',
  //     backgroundColor: '#007BFF',
  //     color: '#fff',
  //     border: 'none',
  //     borderRadius: '6px',
  //     fontSize: '16px',
  //     cursor: 'pointer',
  //     transition: 'background-color 0.3s',
  //   },
  // };

  
  
  const [feedback, setFeedback] = useState(''); // State for feedback
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 
    try {
      const response = await axios.post('/api/v1/feedbackform/sendfeedback', { name, email, feedback });
      if (response.status === 200) {
        toast.success('Feedback sent successfully!');
        
        setFeedback(''); // Clear the feedback field
        setName('')
      } else {
        toast.error('Failed to send feedback');
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
      toast.error('An error occurred while sending feedback');
    }
    setIsSubmitting(false);
  };

  return (
    <div className='feedback-container'>
    <form onSubmit={handleSubmit} className="feedback-form">
      <h2 className="form-heading">We Value Your Feedback</h2>
      <p className="form-description">Please share your thoughts with us!</p>

      <div className="input-name-container">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-input"
        />
      </div>

      <div className="input-feedback-container">
        <label htmlFor="feedback" className="form-label">Your Feedback</label>
        <textarea
          id="feedback"
          placeholder="Enter your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
          className="form-textarea"
        />
      </div>

      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
    </div>
  );
};
  

export default FeedbackForm;

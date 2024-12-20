import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './style.css';

const QuestionForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [options, setOptions] = useState([{ key: '', value: '' }]);
  const [answer, setAnswer] = useState([{ key: '', value: '' }]);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const questionData = {
      questionId: data.questionId,
      question: data.question,
      options: options,
      answer: answer,
      category: data.category,
      subjectName: data.subjectName,
      subTopic : data.subTopic,
      difficulty: data.difficulty,
    };

    try {
      const response = await axios.post(
        '/api/v1/question/upload-questions',
        { questions: [questionData] },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || 'Question added successfully!');
        
        // Navigate to PracticeSet with query parameters
        navigate(`/practice-set?category=${data.category}&subjectName=${data.subjectName}`);

        // Reset form fields and states
        reset();
        setOptions([{ key: '', value: '' }]);
        setAnswer([{ key: '', value: '' }]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add question');
    }
  };

  const handleOptionChange = (index, e) => {
    const values = [...options];
    values[index][e.target.name] = e.target.value;
    setOptions(values);
  };

  const handleAnswerChange = (index, e) => {
    const values = [...answer];
    values[index][e.target.name] = e.target.value;
    setAnswer(values);
  };

  const addOption = () => setOptions([...options, { key: '', value: '' }]);
  const removeOption = (index) => setOptions(options.filter((_, i) => i !== index));

  const addAnswer = () => setAnswer([...answer, { key: '', value: '' }]);
  const removeAnswer = (index) => setAnswer(answer.filter((_, i) => i !== index));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="question-form">
      
     

      <div>
        <label>Question</label>
        <input
          {...register('question', { required: 'Question is required' })}
          type="text"
        />
        {errors.question && <p>{errors.question.message}</p>}
      </div>

      <div>
        <label>Category</label>
        <input
          {...register('category', { required: 'Category is required' })}
          type="text"
        />
        {errors.category && <p>{errors.category.message}</p>}
      </div>

      <div>
        <label>Sub Topic</label>
        <input
          {...register('subTopic', { required: 'Sub Topic is required' })}
          type="text"
        />
        {errors.category && <p>{errors.category.message}</p>}
      </div>

      <div>
        <label>Subject Name</label>
        <input
          {...register('subjectName', { required: 'Subject Name is required' })}
          type="text"
        />
        {errors.subjectName && <p>{errors.subjectName.message}</p>}
      </div>

      <div>
        <label>Difficulty</label>
        <select {...register('difficulty', { required: 'Difficulty is required' })}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        {errors.difficulty && <p>{errors.difficulty.message}</p>}
      </div>

      {/* Options */}
      <div>
        <label>Options</label>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              name="key"
              placeholder="Key (e.g., A)"
              value={option.key}
              onChange={(e) => handleOptionChange(index, e)}
              required
            />
            <input
              type="text"
              name="value"
              placeholder="Value (e.g., Option text)"
              value={option.value}
              onChange={(e) => handleOptionChange(index, e)}
              required
            />
            <button type="button" onClick={() => removeOption(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addOption}>Add Option</button>
      </div>

      {/* Answers */}
      <div>
        <label>Answer</label>
        {answer.map((ans, index) => (
          <div key={index}>
            <input
              type="text"
              name="key"
              placeholder="Key (e.g., A)"
              value={ans.key}
              onChange={(e) => handleAnswerChange(index, e)}
              required
            />
            <input
              type="text"
              name="value"
              placeholder="Value (e.g., Correct answer text)"
              value={ans.value}
              onChange={(e) => handleAnswerChange(index, e)}
              required
            />
            <button type="button" onClick={() => removeAnswer(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addAnswer}>Add Answer</button>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionForm;

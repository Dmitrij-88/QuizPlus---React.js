import React, { useState, useEffect, createContext, useReducer, useContext } from 'react';
import '../Styles/createQuiz.css';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

// Create Context
const QuizContext = createContext();

// Reducer function
const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUIZZES':
      return { ...state, quizzes: action.payload };
    case 'CREATE_QUIZ':
      return { ...state, quizzes: [...state.quizzes, action.payload] };
    default:
      return state;
  }
};

// QuizProvider Component
const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, { quizzes: [] });

  return (
    <QuizContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

// Custom hook to use QuizContext
const useQuizContext = () => useContext(QuizContext);

const CreateQuiz = () => {
  const { quizzes, dispatch } = useQuizContext();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch('/api/quiz/getAll', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });

      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'SET_QUIZZES', payload: json });
      } else {
        console.error('Failed to fetch quizzes', json.error);
      }
    };

    fetchQuizzes();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, questions };

    const response = await fetch('/api/quiz/createQuiz', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    } else {
      dispatch({ type: 'CREATE_QUIZ', payload: json });
      setTitle('');
      setQuestions([]);
    }
  };

  return (
    <div className='createQuiz-container'>
      <form onSubmit={handleSubmit} className='createQuiz'>
        <div className='title'>
          <center><h3>Create Your Quiz</h3></center>
        </div>
        <div className="input-group">
          <label>Quiz Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Questions (comma-separated):</label>
          <input
            type="text"
            value={questions.join(',')}
            onChange={(e) => setQuestions(e.target.value.split(','))}
          />
        </div>
        <button>Create</button>
      </form>
      <div className='createdQuizzes'>
        <h3><b>Quiz List</b></h3>
        {quizzes && quizzes.map(quiz => (
          <div key={quiz.id}>
            <p><strong>Title:</strong> {quiz.title}</p>
            <Link to={`/editQuiz/${quiz.id}`}>
              <span><FontAwesomeIcon icon={faPenToSquare} /></span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// Wrap CreateQuiz with QuizProvider
const CreateQuizWithProvider = () => (
  <QuizProvider>
    <CreateQuiz />
  </QuizProvider>
);

export default CreateQuizWithProvider;

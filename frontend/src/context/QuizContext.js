// frontend/src/context/QuizContext.js
import { createContext, useReducer, useContext } from 'react';

const QuizContext = createContext();

const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUIZZES':
      return { ...state, quizzes: action.payload };
    case 'DELETE_QUIZ':
      return { ...state, quizzes: state.quizzes.filter(quiz => quiz.id !== action.payload) };
    default:
      return state;
  }
};

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, { quizzes: [] });

  return (
    <QuizContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }

  return context;
};

export { QuizContext };

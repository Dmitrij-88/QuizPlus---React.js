import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import './Styles/index.css';
import { QuizProvider } from './context/QuizContext'; // Correct import
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <QuizProvider>
        <App />
      </QuizProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

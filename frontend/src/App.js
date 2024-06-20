// frontend/src/App.js
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import CreateQuiz from './pages/createQuiz';
import Signup from './pages/signup';
import OpenQuiz from './pages/openQuiz';
import QuizEdit from './views/quizEdit';
import DeleteQuiz from './pages/deleteQuiz';
import EditQuiz from './pages/editQuiz';
import EditExistingQuiz from './pages/editExistingQuiz';
import AnalyticsQuiz from './pages/analyticsQuiz';
import React, { useState, useEffect } from 'react';
import QuizEditor from './pages/quizEditor';
import { QuizProvider, useQuizContext } from './context/QuizContext'; // Correct path for context
import { Toggle } from './components/toggle';
import SignIn from './pages/signin';
import Intro from './pages/intro';

export const App = () => {

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);
  console.log(isDark);
  
  function EditQuizWrapper() {
    const { quizInput_id } = useParams();
    const { quizzes } = useQuizContext();
    const quizToEdit = quizzes.find(q => q.id === quizInput_id);

    if (!quizToEdit) {
      return <div>Quiz not found</div>;
    }

    return <QuizEdit quizDataProp={quizToEdit} />;
  } 

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
      <QuizProvider>
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/createQuiz" element={<CreateQuiz />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/openQuiz" element={<OpenQuiz />} />
              <Route path="/QuizEdit" element={<EditQuiz />} />
              <Route path="/deleteQuiz" element={<DeleteQuiz />} />
              <Route path="/analyticsQuiz" element={<AnalyticsQuiz />} />
              <Route path="/editQuiz/:quizInput_id" element={<EditQuizWrapper />} />
              <Route path="/editExistingQuiz/:quizId" element={<EditExistingQuiz />} />
              <Route path="/quizEditor" element={<QuizEditor />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/intro" element={<Intro />} />
            </Routes>
          </div>
        </BrowserRouter>
      </QuizProvider>
    </div>
  );
}

export default App;

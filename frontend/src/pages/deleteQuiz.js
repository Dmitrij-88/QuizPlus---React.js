// frontend/src/pages/deleteQuiz.js
import { useEffect } from 'react';
import { useQuizContext } from '../context/QuizContext'; // Correct path for context
import '../Styles/openQuiz.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DeleteQuiz = () => {
  const { quizzes, dispatch } = useQuizContext();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
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
          console.error('Failed to fetch quizzes:', json.message);
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, [dispatch]);

  const handleDeleteClick = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this quiz?");
    if (confirmation) {
      try {
        const response = await fetch(`/api/quiz/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          dispatch({ type: 'DELETE_QUIZ', payload: id });
          alert("Quiz deleted!");
        } else {
          alert("Failed to delete quiz.");
        }
      } catch (error) {
        console.error('Error deleting quiz:', error);
        alert("Failed to delete quiz.");
      }
    } else {
      console.log("Deletion canceled.");
    }
  };

  return (
    <div className="openQuiz-Container">
      {quizzes && quizzes.map(quiz => (
        <div key={quiz.id} className='openQuiz-Card blue'>
          <span>{quiz.id}</span>
          <FontAwesomeIcon icon={faTrash} className='icon' onClick={() => handleDeleteClick(quiz.id)} />
        </div>
      ))}
      {quizzes.length === 0 && <div>No quizzes found</div>}
    </div>
  );
};

export default DeleteQuiz;

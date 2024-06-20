import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { db } from '../pages/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import '../Styles/quizListCards.css'

function QuizListCards() {
    const [quizzes, setQuizzes] = useState([]);
  
    useEffect(() => {
      const fetchQuizzes = async () => {
        const quizCollectionRef = collection(db, "quizzes");
        const data = await getDocs(quizCollectionRef);
        setQuizzes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // Store quiz data and doc IDs
      };
  
      fetchQuizzes();
    }, []);
  
    return (
      <div>
        <h1>Previous Quizzes</h1>
        <div className="quizCardContainer">
          {quizzes.map(quiz => (
            <>
            <div className="quizCardSpace"></div><Link to={`/editExistingQuiz/${quiz.id}`}>
            <div className="quizCard" key={quiz.id}>
              {quiz.name}
              <div>{quiz.createdAt}</div>
              <div className="separateNameAndDate"></div>
            </div></Link>
              
            
            </>
          ))}
        </div>
      </div>
    );
  }
  
  export default QuizListCards;
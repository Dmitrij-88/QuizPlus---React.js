import React, { useEffect, useState } from 'react';
import { db } from '../pages/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

function QuizList() {
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
        <div>
          {quizzes.map(quiz => (
            <div key={quiz.id}>{quiz.name} {quiz.createdAt}</div> // Displaying quiz names and date
          ))}
        </div>
      </div>
    );
  }
  
  export default QuizList;
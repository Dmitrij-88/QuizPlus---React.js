import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom';

function EditExistingQuiz() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [name, setName] = useState("untitled");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      const docRef = doc(db, "quizzes", quizId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const quizData = docSnap.data();
        setName(quizData.name);
        setDescription(quizData.description);
        setQuestions(quizData.questions);
      } else {
        console.log("No such document!");
      }
    };

    fetchQuiz();
  }, [quizId]);

  const addQuestion = (type) => {
    const newQuestion = {
      type,
      content: "",
      options: [""]
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (index, key, value) => {
    const updatedQuestions = questions.map((q, i) => {
      if (i === index) {
        return { ...q, [key]: value };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = questions.map((question, index) => {
      if (index === questionIndex) {
        const updatedOptions = question.options.map((option, idx) => {
          if (idx === optionIndex) return value;
          return option;
        });
        return { ...question, options: updatedOptions };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = questions.map((question, index) => {
      if (index === questionIndex) {
        return { ...question, options: [...question.options, ""] };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = doc(db, "quizzes", quizId);
      await updateDoc(docRef, {
        name: name,
        questions: questions,
        description: description,
        updatedAt: new Date().toLocaleDateString() // Store the update date
      });
      console.log("Document updated with ID: ", quizId);
      alert('Quiz updated successfully!');
    } catch (e) {
      console.error("Error updating document: ", e);
      alert('Error updating quiz.');
    }
  };

  return (
    <div>
      <h1>Quiz Editor</h1>
      <form onSubmit={handleSubmit}>
        <label>Quiz name:</label>
        <input value={name} placeholder="Quiz name" onChange={(e) => setName(e.target.value)} />
        <label>Description:</label>
        <textarea value={description} placeholder="Description" type="text" onChange={(e) => setDescription(e.target.value)}></textarea>
        {questions.map((question, index) => (
          <div key={index}>
            <h2>Question {index + 1}</h2>
            <textarea
              value={question.content}
              onChange={(e) => handleQuestionChange(index, 'content', e.target.value)}
              placeholder="Enter the question"
            />
            {['multiplequestion', 'selectquestion'].includes(question.type) && question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                  placeholder={`Option ${optionIndex + 1}`}
                />
              </div>
            ))}
            {['multiplequestion', 'selectquestion'].includes(question.type) && (
              <button type="button" onClick={() => addOption(index)}>Add Option</button>
            )}
            <button type="button" onClick={() => removeQuestion(index)}>Remove Question</button>
          </div>
        ))}
        <button type="submit">Save Quiz</button>
      </form>
      <div>
        <button onClick={() => addQuestion('multiplequestion')}>Add Multiple Choice Question</button>
        <button onClick={() => addQuestion('selectquestion')}>Add Select Question</button>
        <button onClick={() => addQuestion('textquestion')}>Add Text Question</button>
      </div>
    </div>
  );
}

export default EditExistingQuiz;

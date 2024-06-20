import React, { useState } from 'react';
import { db } from './firebase-config';
import { collection, addDoc } from "firebase/firestore";

function QuizEditor() {
  const [questions, setQuestions] = useState([]);

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
      const docRef = await addDoc(collection(db, "quizzes"), {
        questions: questions,
        createdAt: new Date()  // Store the creation date
      });
      console.log("Document written with ID: ", docRef.id);
      alert('Quiz saved successfully!');
    } catch (e) {
      console.error("Error adding document: ", e);
      alert('Error saving quiz.');
    }
  };

  return (
    <div>
      <h1>Quiz Editor</h1>
      <div>.</div>
      <div>.</div>
      <button>Send</button><button>Analytics</button><button>Delete</button>
      <form onSubmit={handleSubmit}>
        <text>csdcsc</text>
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

export default QuizEditor;
import { useState } from 'react';
import '../Styles/quizEdit.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function QuizEdit({ quizDataProp }) {
    const [quizData, setQuizData] = useState(quizDataProp)

    const handleSave = async (e) => {
      e.preventDefault()

      const data = quizData

      const response = await fetch('/api/quiz/update/' + quizData._id, {
          method: 'PATCH',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json'
          }
      })

      const json = await response.json()

      if (!response.ok){
        console.log(json.error)
      }
    }

    const addQuestion = () => {
        const newQuestion = {
          questionText: 'Question ' + quizData.questions.length, 
          options: [], 
        }
    
        setQuizData(currentData => {

          const updatedQuizData = {
            ...currentData,
            questions: [...currentData.questions, newQuestion],
            numOfQuestions: currentData.numOfQuestions + 1, 
          }
    
          return updatedQuizData
        });
    }

    const addOption = (questionIndex) => {
      
        setQuizData(currentData => {
          const newData = { ...currentData }

          const newOption = 'Option ' + (currentData.questions[questionIndex].options.length + 1)
    
          newData.questions = currentData.questions.map((question, index) => {
            if (index === questionIndex) {
              return {
                ...question,
                options: [...question.options, newOption],
              }
            }
            return question
          })
    
          return newData
        })
      }

    function handleInputChangeQuestion(event, index) {

      const newQuizData = { ...quizData }
      newQuizData.questions[index].questionText = event.target.value
    
      setQuizData(newQuizData)
    }

    function handleInputChangeOption(event, index, optionIndex) {

      const newQuizData = { ...quizData }
      newQuizData.questions[index].options[optionIndex] = event.target.value
    
      setQuizData(newQuizData)
    }

    return (
        <div>
          <div className='updateQuizBtn-layout'>
            <button onClick={handleSave} >Save</button>
            <button onClick={''} >Publish</button>
          </div>
          <div className="layout-details">
            <p><strong>Title:</strong> {quizData?.quizName}</p>
            {quizData && quizData.questions.map((question, index) => (
              <div>
                <div>
                  <button className='' onClick={() => addOption(index)} >
                      <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <div key={index}>
                  <input type='text' id={index} value={question.questionText} onChange={(e) => handleInputChangeQuestion(e, index)} />
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <input type='text' id={optionIndex} value={option} onChange={(e) => handleInputChangeOption(e, index, optionIndex)} />
                      </div>
                    ))}
                </div>
              </div>
              ))}
          </div>
          <div>
            <button onClick={addQuestion} className='addQuestionBtn'>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
    )
}

export default QuizEdit

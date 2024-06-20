import { Link } from 'react-router-dom'
import { faPenToSquare  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import '../Styles/quizDetails.css'

function QuizDetails({ quizInput }) {

   
    return (
        <div className="layout-details">
            <div className="quiz-info">
                <div className="info">
                    <p><strong>Name:</strong> {quizInput.quizName}</p>
                    <p><strong>Type:</strong> {quizInput._id}</p>
                    <p><strong>Number of Questions:</strong> {quizInput.numOfQuestions}</p>
                    <Link to={`/editQuiz/${quizInput._id}`}>
                        <span ><FontAwesomeIcon icon={faPenToSquare} />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default QuizDetails
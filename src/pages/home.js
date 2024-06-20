import { Link } from 'react-router-dom'
import {
    faTrashCan, 
    faFolder,
    faPlus,
    faPenToSquare,
    faTachographDigital,
    faLineChart,
    faGears,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../Styles/homeStyle.css'
import QuizListCards from '../components/quizListCards'

const Home = () => {

    return(
        <>
            <div className="homeContainer">
                <Link to='/createQuiz'>
                    <div className="homeCard btn1">
                        <FontAwesomeIcon icon={faPlus} className='icon'/>
                        <span>Create Quiz</span>
                    </div>
                </Link> 

                <Link to='/openQuiz'>
                    <div className="homeCard btn2">   
                        <FontAwesomeIcon icon={faFolder} className='icon'/>
                        <span>Open Quiz</span>
                    </div>
                </Link>

                <Link to='/QuizEdit'>
                    <div className="homeCard btn3">
                        <FontAwesomeIcon icon={faPenToSquare} className='icon'/>
                        <span>Edit Quiz</span>
                    </div>
                </Link>

                <Link to='/deleteQuiz'>
                    <div className="homeCard btn4">
                        <FontAwesomeIcon icon={faTrashCan} className='icon'/>
                        <span>Delete Quiz</span>
                    </div>
                </Link> 

                <Link to='/analyticsQuiz'>
                    <div className="homeCard btn5">
                        <FontAwesomeIcon icon={faLineChart} className='icon'/>
                        <span>Analytics</span>
                    </div>
                </Link> 

                <Link to='/exportQuiz'>
                    <div className="homeCard btn6">
                        <FontAwesomeIcon icon={faTachographDigital} className='icon'/>
                        <span>Export</span>
                    </div>
                </Link> 

                <Link to='/intro'>
                    <div className="homeCard btn7">
                        <FontAwesomeIcon icon={faGears} className='icon'/>
                        <span>Intro</span>
                    </div>
                </Link>
                
            </div>
            <div className='space'></div>
            <div>
                <QuizListCards />
            </div>
        </>
    )
}

export default Home

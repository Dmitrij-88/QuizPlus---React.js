import { Link } from 'react-router-dom'
import{
    faEgg,
    faPlus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../Styles/openQuiz.css'

const settings = () => {
    

    return(
        <div className="openQuiz-Container">
            <Link to='/openQuiz'>
                <div className='openQuiz-Card blue'>
                    <FontAwesomeIcon icon={faEgg} className='icon'/>
                    <span>Quiz 1</span>
                </div>
            </Link> 

            <Link to='/openQuiz'>
                <div className='openQuiz-Card yellow'>
                    <FontAwesomeIcon icon={faEgg} className='icon'/>
                    <span>Quiz 2</span>
                </div>
            </Link>

            <Link to='/openQuiz'>
                <div className='openQuiz-Card teal'>
                    <FontAwesomeIcon icon={faEgg} className='icon'/>
                    <span>Quiz 3</span>
                </div>
            </Link>

            <Link to='/openQuiz'>
                <div className='openQuiz-Card red'>
                    <FontAwesomeIcon icon={faEgg} className='icon'/>
                    <span>Quiz 4</span>
                </div>
            </Link>

            <Link to='/openQuiz'>
                <div className='openQuiz-Card black'>
                    <FontAwesomeIcon icon={faEgg} className='icon'/>
                    <span>Quiz 5</span>
                </div>
            </Link>

            <Link to='/createQuiz'>
                <div className='openQuiz-Card pink'>
                    <FontAwesomeIcon icon={faPlus} className='icon'/>
                    <span>Add New Quiz</span>
                </div>
            </Link> 
            

        </div>
    )
}

export default settings
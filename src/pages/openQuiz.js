import { Link } from 'react-router-dom'
import{
    faEgg,
    faPlus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../Styles/openQuiz.css'
import { useEffect } from 'react'
import { useQuizContext } from '../hooks/useQuizContext'

const OpenQuiz = () => {
    const { quiz, dispatch } = useQuizContext()

    useEffect(() => {
        const fetchQuiz = async () => {
            const response = await fetch('/api/quiz/getAll', {
                method: 'GET',
                headers:{
                    'Content-type': 'application/json'
                }
            })
            
            const json = await response.json()
            if (response.ok) {
                dispatch({type: 'SET_QUIZ', payload: json})
            }
        }

        fetchQuiz()

    }, [dispatch])

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

export default OpenQuiz
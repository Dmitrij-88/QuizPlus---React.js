

function QuizEdit({ quizData }) {
    
    return (
        <div className="layout-details">
            <p><strong>Name:</strong> {quizData.quizName}</p>
            {quizData && quizData.questions.map((question, index) => (
                <div key={index}>
                    <p>{question.questionText}</p>
                    {question.options.map((option, optionIndex) => (
                        <div key={optionIndex}>
                            <p>{option}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default QuizEdit
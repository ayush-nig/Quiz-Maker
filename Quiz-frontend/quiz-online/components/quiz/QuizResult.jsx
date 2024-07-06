import React from 'react'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom'

const QuizResult = () => {
    const location = useLocation();
    const {quizquestions, totalscores} = location.state
    const numofquestions = quizquestions.length;
    const percentage = Math.round((totalscores / numofquestions)* 100)
    const handleretakequiz = () => {
        alert("Oops! this functionality was not implemented!!!")
    }
  return (
    <section className='container mt-5'>
        <h3>Your Quiz Result Summary</h3>
        <hr/>

        <h5>You Answered {totalscores} out of {numofquestions} questions correctly.</h5>
        <p>Your total score is {percentage}%.</p>
        <button className='btn btn-primary btn-sm' onClick={handleretakequiz}> 
            Retake this quiz
        </button>

    </section>
  )
}

export default QuizResult
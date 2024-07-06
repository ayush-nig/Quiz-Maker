
import React, { useEffect, useState } from 'react'
import {useNavigate, useLocation} from "react-router-dom"

const Quiz = () => {
    const[quizquestion,setquizquestion] = useState([{
        id: "", correctanswers: "", queston: "",questiontype: ""
    }])
    const[selectedanswer, setselectedanswer] = useState([{
        id: "", answer: [""]
    }])
    const[currentquestionindex, setcurrentquestionindex] = useState(0);
    const[totalscores, settotalscores]  = useState(0);
    const location = useLocation()
    const navigate = useNavigate()
    const[selectedsubject, selectednumofquestion] = location.state

    useEffect(() => {
        fetchquizdata()
    }, [])
    const fetchquizdata = async() => {
        if(selectednumofquestion&&selectedsubject)
            {
                const questions =await fetchquizforuser(selectednumofquestion, selectedsubject)
                setquizquestion(questions)
            }
    }

    const handleAnswerchange = (questionid, answer) => {
        setselectedanswer((prevAnswers) => {
            const existinganswerindex = prevAnswers.findIndex((answerobj) => answerobj.id === questionid)
            const selectedanswer = Array.isArray(answer)? answer.map((a) => a.charAt(0)) : answer.charAt(0)

            if(existinganswerindex !== -1){
                const updatedanswers = [...prevAnswers]
                updatedanswers[existinganswerindex] = {id: questionid, answer: selectedanswer}
                return updatedanswers
            }
            else {
                const newanswer = {id: questionid, answer: selectedanswer}
                return [...prevAnswers, newanswer]
            }
        })
    }

    const ischecked = (questionid, choice) => {
        const selectedanswer = selectedanswer.find((answer) => answer.id === questionid)
        if(!selectedanswer){
            return false;
        } 
        if(Array.isArray(selectedanswer.answer)){
            return selectedanswer.answer.includes(choice.charAt(0))
        }

        return selectedanswer.answer === choice.charAt(0)
    }

    const handlecheckboxchange = (questionid, choice) => {
        setselectedanswer((prevAnswers) => {
            const existinganswerindex = prevAnswers.findIndex((answerobj) => answerobj.id === questionid)
            const selectedanswer = Array.isArray(choice)? choice.map((c) => c.charAt(0)) : choice.charAt(0)

            if(existinganswerindex !== -1)  // !+ -1
                {
                    const updatedanswer = [...prevAnswers];
                    const existinganswers = updatedanswer[existinganswerindex].answer
                    let newanswer;
                    if(Array.isArray(existinganswers))
                        {
                            newanswer = existinganswers.includes(selectedanswer)? existinganswers.filter((a) => a !==selectedanswer)
                            : [...existinganswers, selectedanswer]
                        }
                        else{
                            newanswer = [existinganswers, selectedanswer]
                        }
                        updatedanswers[existinganswerindex] = {id: questionid, answer: newanswer}
                        return updatedanswers
                }
                else{
                    const newanswer = {id: questionid, answer: [selectedanswer]}
                    return [...prevAnswers, newanswer]
                }
    })
}

const handlesubmit = () => {
    let scores = 0;
    quizquestion.forEach((question) => {
        const selectedanswer = selectedanswer.find((answer) => answer.id === question.id)
        if(selectedanswer)
            {
                const selectedoptions = Array.isArray(selectedanswer.answer)? selectedanswer.answer :[selectedanswer.answer]
                const correctoptions = Array.isArray(question.correctanswers)? question.correctanswers :[question.correctanswers]
                const iscorrect = selectedoptions.every((option) => correctoptions.includes(option))
                if(iscorrect)
                    {
                        scores++;
                    }
            }
    })

    settotalscores(scores)
    setselectedanswer([{id: "", answer: [""]}])
    setcurrentquestionindex(0)
    navigate("/quiz-result", {state:{quizquestion, totalscores:scores}})
}

const handlenextquestion = () => {
    if(currentquestionindex < quizquestion.length -1)
        {
            setcurrentquestionindex((prevIndex) => prevIndex +1)
        }
    else{
            handlesubmit();
        }
}

const handlepreviousquestion = () => {
    if(currentquestionindex > 0)
        {
            setcurrentquestionindex((prevIndex) => prevIndex -1)
        }
}




  return (
    <div className='p-5'>
        <h3 className='text-info'>
            Question {quizquestion.length > 0 ? currentquestionindex + 1 : 0} of {quizquestion.length}

        </h3>

        <h4 className='mb-4'>
            {quizquestion[currentquestionindex]?.question}

            <Answeroptions 
            question={quizquestion[currentquestionindex]}
            ischecked={ischecked}
            handleAnswerchange={handleAnswerchange}
            handlecheckboxchange={handlecheckboxchange}/>

            <div className='mt-4'>
                <button
                className='btn btn-sm btn-primary me-2'
                onClick={handlepreviousquestion}
                disabled={currentquestionindex === 0}>
                    Previous Question
                </button>

                <button
                className={`btn btn-info btn-sm ${currentquestionindex === quizquestion.length -1} && "btn btn-warning btn-sm"`}
                disabled={!selectedanswer.find((answer) => answer.id === quizquestion[currentquestionindex]?.id || answer.answer.length > 0)}
                onClick={handlenextquestion}>
                    {currentquestionindex === quizquestion.length -1 ? "Submit Quiz" : "Next Question"}

                </button>
            </div>
        </h4>
    </div>
  )
}

export default Quiz
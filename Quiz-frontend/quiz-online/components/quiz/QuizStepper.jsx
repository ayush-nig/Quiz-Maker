import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getallsubjects } from '../../utils/QuizService';

const QuizStepper = () => {
    const[currentstep, setcurrentstep] = useState(1);
    const[selectedsubject, setselectedsubject] = useState("");
    const[selectednumofquestion, setselectednumofquestion] = useState("");
    const[subject, setsubject] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchsubjects()
    }, [])

    const fetchsubjects = async() => {
        try {
            const allsubjects = await getallsubjects()
            setsubject(allsubjects);
        } catch (error) {
            console.error(error);
        }
    }

    const handlenext = () => {
        if(currentstep === 3){
            if(selectedsubject && selectednumofquestion)
                {
                    navigate("/take-quiz", { state : {selectednumofquestion, selectedsubject}})
                }
            else{
                    alert("please select a subject and number of questions to be answered");
                }
        }
        else{
            setcurrentstep((prevstep) => prevstep + 1)
        }
    }

    const handlepreviousstep = (e) => {
        setcurrentstep((prevstep) => prevstep - 1)
    }

    const handleselectedsubject = (e) => {
        setselectedsubject(e.target.value)
    }

    const handlenumofquestionchange = (e) => {
        setselectednumofquestion(e.target.value)
    }

    const renderstepcontent = () => {
        switch(currentstep)
        {
            case 1:
                return(
                    <div>
                        <h3 className='text-info mb-2'>I want to a quiz on :</h3>
                        <select className='form-select'
                        value={selectedsubject}
                        onChange={handleselectedsubject}>
                            <option>Select a subject..</option>
                            {subject.map((sub) => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>
                    </div>
                )
            case 2:
                return(
                    <div>
                        <h4 className='text-info mb-2'>How many questions would like to attempt?</h4>
                        <input
                        type='number'
                        className='form-control'
                        value={selectednumofquestion}
                        onChange={handlenumofquestionchange}
                        placeholder='Enter number of questions'/>
                    </div>
                )
            case 3:
                return(
                    <div>
                        <h2>Confirmation</h2>
                        <p>Subject : {selectedsubject}</p>
                        <p>Number of Question : {selectednumofquestion}</p>
                    </div>
                )
            default: return null;
        }
    }

    const renderprogressbar = () => {
        const progress = currentstep === 3 ? 100 : ((currentstep-1)/2)*100
        return(
            <div className='progress'>
                <div className='progress-bar'
                role='progressbar'
                style={{width: `${progress}%`}}
                aria-valuenow={progress}>
                    Step (currentstep)
                </div>

            </div>
        )
    }
  return (
    <section className='mt-5'>
        <h3 style={{color: "GrayText"}}> Welcome to Quiz Online</h3>
        {renderprogressbar()}
        <div className='card'>
            <div className='card-body'>
                {renderstepcontent()}
                <div>
                    {currentstep > 1 && (
                        <button className='btn btn-primary' onClick={handlepreviousstep}>Previous</button>
                    )}
                    
                    {currentstep < 3 && (
                        <button
                        className='btn btn-primary'
                        onClick={handlenext}
                        disabled={(currentstep === 1 && !selectedsubject) ||
                         (currentstep === 2 && !selectednumofquestion)}>
                            Next
                        </button>
                    )}

                    {currentstep === 3 && (
                        <button
                        className='btn btn-success' 
                        onClick={handlenext}>
                        Start Quiz</button>
                    )}

                </div>
            </div>
        </div>

    </section>
  )
}

export default QuizStepper
import React, { useEffect, useState } from 'react'
import { getquestionbyid } from '../../utils/QuizService';
import {Link, useParams} from "react-router-dom"

const Updatequestion = () => {
    const[question, setquestion]= useState("");
    const[choices , setchoices] = useState([""]);
    const[correctanswers, setcorrectanswers] = useState([""])
    const[isLoading, setisLoading] = useState(true);

    const {id} = useParams();

    useEffect(() => {
        fetchquestion()
    }, []);
    
    const fetchquestion = async() => {
        try
        {
            const questiontoupdate = await getquestionbyid(id);
            if(questiontoupdate)
                {
                    setquestion(questiontoupdate.question);
                    setchoices(questiontoupdate.choices);
                    setcorrectanswers(questiontoupdate.correctanswers);
                }
                setisLoading(false);
        }
        catch(error)
        {
            console.error(error);
        }
    }

    const handlequestionchange = (e) => {
        setquestion(e.target.value);
    }

    const handlechoicechange = (index, e) => {
        const updatechoice = [...choices]
        updatechoice[index] = e.target.value;
        setchoices(updatechoice);
    }

    const handlecorrectanswerchange = (e) => {
        setcorrectanswers(e.target.value);
    }

    const handlequestionupdate = async(e) => {
        e.preventDefault()
        try {
            const updatedquestion = {
                question,
                choices,
                correctanswers: correctanswers.toString().split(",").map((answer) => {answer.trim()})
            }

            await updatequestion(id, updatedquestion);
        } catch (error) {
            console.error(error);
        }
    }

    if(isLoading)
        {
            return <p>Loading...</p>
        }
  return (
    <section className='container'>
        <h4 className='mt-5' style={{color: "GrayText"}}>Update Quiz Question</h4>

        <div className='col-md-8'>
            <form onSubmit={handlequestionupdate}>
                <div className='form-group'>
                    <label className='text-info'>Question</label>
                    <textarea
                     className='form-control'
                     rows={4}
                     value={question}
                     onChange={handlequestionchange}/>
                    
                </div>
                <div className='form-group'>
                    <label className='text-info'>choices</label>
                    {choices.map((choice, index) => (
                        <input 
                        key={index}
                        className='form-control'
                        type='text'
                        value={choice}
                        onChange={(e) => {handlechoicechange(index,e)}}
                        />
                        
                    ))}
                </div>
                <div className='form-group'>
                    <label className='text-info'>Correct Answers</label>
                    <input 
                        key={index}
                        className='form-control mb-4'
                        type='text'
                        value={correctanswers}
                        onChange={handlecorrectanswerchange}
                        />
                </div>
                <div className='btn-group'>
                    <button type='submit' className='btn btn-sm btn-outline-warning'>
                        Update Question
                    </button>
                    <Link to={"/all-quizzes"} className='btn btn-outline-primary btn-sm'>
                        Back to all questions
                    </Link>
                </div>
            </form>

        </div>
    </section>
  )
}

export default Updatequestion
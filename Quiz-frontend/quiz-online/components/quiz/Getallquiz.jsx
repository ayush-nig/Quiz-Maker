import React, { useEffect, useState } from 'react'
import { deletequestion, getallquestions } from '../../utils/QuizService';

const Getallquiz = () => {
    const[question, setQuestion] = useState([{id:"", question: "", correctanswers: "", choices: []}]);
    const[isLoading, setisLoading] =useState(true);
    const[isquestiondeleted, setisquestiondeleted] =useState(false);
    const[deletesuccessmessage, setdeletesuccessmessage] =useState("");

    useEffect(() => {
        fetchallquestions()
    }, []);

    const fetchallquestions = async() => {
        try {
            const data = await getallquestions();
            setQuestion(data);
            setisLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handledelete = async(id) => {
        try {
            await deletequestion(id);
            setQuestion(question.filter((question) => {question.id !== id}));
            setisquestiondeleted(true);
            setdeletesuccessmessage("Question deleted successfully");
        } catch (error) {
            console.error(error);
        }
        setTimeout(() => {
           setdeletesuccessmessage(""); 
        }, 4000);
    }

    if(isLoading)
        {
            return <div>Loading...</div>
        }
  return (
    <section className='container'>
        <div className='row mt-5'>
            <div className='col-md-6 mb-2 md-mb-0' style={{color: 'GrayText'}}>
                <h4>All Quiz Questions</h4>
            </div>
            <div className='col-md-4 d-flex justify-content-end'>
                <Link to={"/create-quiz"}>
                    <FaPlus /> Add Question
                </Link>
            </div>
        </div>
        <hr/>
        {isquestiondeleted && <div className='alert alert-success'>{deletesuccessmessage}</div>}

        {question.map((question, index) =>(
            <div>
                <h4 style={{color: 'GrayText'}}>{`${index+1}.${question.question}`}</h4>
                <ul>
                    {question.choices.map((choice, index) => (
                        <li key={index}>{choice}</li>
                    ))}
                </ul>
                <p className='text-success'>Correct answer: {question.correctanswers}</p>
                <div className='btn-group mb-4'>
                    <Link to={`/update-quiz/${question.id}`}>
                        <button className='btn btn-sm btn-outline-warning mr-2'>Edit Question</button>
                    </Link>
                    <button className='btn btn-outline-danger btn-sm'
                    onClick={() => (handledelete(question.id))}>
                        Delete Question
                    </button>
                </div>
            </div>
        ))}
    </section>
  )
}

export default Getallquiz
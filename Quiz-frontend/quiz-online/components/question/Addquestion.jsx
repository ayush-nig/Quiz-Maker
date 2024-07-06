import React, { useEffect, useState } from 'react'
import { createquestion, getallsubjects } from '../../utils/QuizService';
import { Link } from 'react-router-dom';

const Addquestion = () => {
    const[question, setQuestion] = useState("");
    const[questiontype, setQuestiontype] = useState("single");
    const[choices, setChoices] = useState([""]);
    const[correctanswers, setCorrectanswers] = useState([""]);
    const[subject, setSubject] = useState("");
    const[newsubject, setNewsubject] = useState("");
    const[subjectoptions, setSubjectoptions] = useState([""]);

    useEffect(() => {
        fetchsubjects()
    }, []);

    const fetchsubjects = async() => {
        try {
            const allsubjects = await getallsubjects();
            setSubjectoptions(allsubjects);
        } catch (error) {
            console.log(error);
        }
    }

    const handeladdchoices = async() => {
       const lastchoice = choices[choices.length-1];
       const lastchoiceletter = lastchoice ? lastchoice.charAt(0) : "A";
       const  newchoiceletter = String.fromCharCode(lastchoiceletter.charCodeAt(0) +1);
       const newchoice = `${newchoiceletter}`;
       setChoices([...choices, newchoice]); 
    }

    const handelremovechoices = (index) => {
        setChoices(choices.filter((choice, i) => i!==index));
    }

    const handelchoicechange = (index, value)=>{
        setChoices(choices.map((choice , i) => (i===index ? value : choice)));
    }

    const handelcorrectanswerchange = (index, value)=>{
        setCorrectanswers(correctanswers.map((choice , i) => (i===index ? value : answer)));
    }

    const handeladdcorrectanswer = () => {
        setCorrectanswers([...setCorrectanswers ,""]);
    }

    const handelremovecorrectanswer = (index) => {
        setCorrectanswers(correctanswers.filter((answer, i) => i!==index));
    }

    const handlesubmit = async(e) => {
        e.preventDefault();
        try {
            const result = {question, 
                questiontype,
                choices,
                correctanswers: correctanswers.map((answer) => {
                    const choiceletter = answer.charAt(0).toUpperCase();
                    const choiceindex = answer.charCodeAt(0) - 65;
                    return choiceindex>=0 && choiceindex<choices.length ? choiceletter: null;
                }),
                subject
            }
            await createquestion(result);
            setQuestion("");
            setQuestiontype("single");
            setChoices([""]);
            setCorrectanswers([""]);
            setSubject("");

        } catch (error) {
            console.log(error);
        }
    }

    const handeladdsubject = () => {
        if(newsubject.trim()!=="")
            {
                setSubject(newsubject.trim());
                setSubjectoptions([...subjectoptions, newsubject.trim()]);
                setNewsubject("");
            }
    }

  return (
    <div className='container'>
        <div className='row justify-content-center'>
            <div className='col-md-6 mt-5'>
                <div className='card'>
                    <div className='cardheader'>
                        <h5 className='card-title'>Add New Question</h5>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={handlesubmit} className='p-2'>
                            <div className='mb-3'>
                                <label htmlFor='subject' className='form-label text info'>Select a Subject</label>
                                <select
                                    id='subject'
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.val)}
                                    className='form-control'>
                                        <option value={""}>Select a Subject</option>
                                        <option value={"New"}>Add New Subject</option>
                                        {subjectoptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            
                                {subject === "New"&& (
                                    <div className='mb-3'>
                                        <label htmlFor='new-subject' className='form-label text-info'>
                                            Add a New Subject
                                        </label>
                                        <input
                                            type='text'
                                            id='new-subject'
                                            value={newsubject}
                                            onChange={(e) => setNewsubject(e.target.value)}
                                            className='form-control'/>
                                        <button 
                                            type='button'
                                            className='btn btn-outline-primary btn-sm mt-2'
                                            onClick={handeladdsubject}>
                                            Add Subject
                                        </button>
                                    </div>
                                )}
                                <div className='mb-2'>
                                    <label htmlFor='question' className='form-label text-info'>
                                        Question
                                    </label>
                                
                                <textarea 
                                    className='form-control'
                                    rows={4}
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.val)}>

                                </textarea>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='question-type' className='form-label text-info'>
                                        Question Type
                                    </label>
                                    <select
                                        className='form-control'
                                        id='question-type'
                                        value={questiontype}
                                        onChange={(e) => setQuestiontype(e.target.value)}>
                                            <option value={"single"}>Single Answer</option>
                                            <option value={"multiple"}>Multiple Answers</option>
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='choices' className='form-label text-info'>
                                        Choices
                                    </label>
                                    {choices.map((choice, index) => (
                                        <div key={index} className='input-group mb-3'>
                                            <input
                                                type='text'
                                                value={choice}
                                                onChange={(e) => handelchoicechange(index, e.target.val)}
                                                className='form-control'/>
                                            <button
                                                type='button'
                                                onClick={() => handelremovechoices(index)}
                                                className='btn btn-outline-danger btn-sm'>
                                                Remove
                                            </button>
                                        </div>


                                    ))}
                                    <button
                                                type='button'
                                                onClick={handeladdchoices}
                                                className='btn btn-outline-primary btn-sm'>
                                                Add Choice
                                    </button>
                                    
                                </div>
                                {questiontype ==="single" && (
                                    <div className='mb-3'>
                                        <label htmlFor='answer' className='form-label text-info'>
                                            Correct Answer
                                        </label>
                                        <input
                                                type='text'
                                                value={correctanswers[0]}
                                                onChange={(e) => handelcorrectanswerchange(0, e.target.val)}
                                                className='form-control'
                                        />
                                    </div>
                                )}

                                {questiontype ==="multiple" && (
                                    <div className='mb-3'>
                                        <label htmlFor='answer' className='form-label text-info'>
                                            Correct Answer (s)
                                        </label>
                                        {correctanswers.map((answer, index) => (
                                            <div>
                                                <input
                                                type='text'
                                                value={answer}
                                                onChange={(e) => handelcorrectanswerchange(index, e.target.val)}
                                                className='form-control'
                                                />
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handelremovecorrectanswer(index)}>

                                                        Remove

                                                </button>
                                            )}
                                            </div>
                                        ))}

                                        <button
                                            type='button'
                                            className='btn btn-outline-info'
                                            onClick={handeladdcorrectanswer}>
                                                Add Correct Answer
                                           
                                        </button>
                                    </div>
                                )}

                                {!correctanswers.length && <p>Please Enter Atleast One Correct Answer.</p>}
                                <div className='btn-group'>
                                    <button type="submit" className='btn btn-outline-success mr-2'>
                                        Save Question
                                    </button>
                                    <Link to={"/all-quizzes"} className='btn btn-outline-primary btn-sm'>
                                        Existing questions
                                    </Link>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Addquestion
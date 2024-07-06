import React from 'react'

const Answeroptions = (question, isChecked, handleanswerchange, handlecheckboxchange) => {
    if(!question)
        {
            return <div>No question available..</div>
        }
    const {id, questiontype,choices} = question

    if(questiontype === "single")
        {
            return (
                <div>
                    {choices.sort().map((choice, index) => (
                        <div key={choice} className='form-check mb-3'>
                            <input
                            type='radio'
                            className='form-check-input'
                            id={choice}
                            value={choice}
                            checked={isChecked(question.id, choice)}
                            onChange={() => handleanswerchange(id, choice)}/>

                            <label className='form-check-label ms-2'>{choice}</label>

                        </div>
                    ))}
                </div>
              )

        }
        else if(questiontype === "multiple")
            {
                return (
                    <div>
                        <p>Select all that apply</p>
                        {choices.sort().map((choice, index) => (
                        <div key={choice} className='form-check mb-3'>
                            <input
                            type='checkbox'
                            className='form-check-input'
                            id={choice}
                            value={choice}
                            name={question.id}
                            checked={isChecked(question.id, choice)}
                            onChange={() => handlecheckboxchange(id, choice)}/>

                            <label className='form-check-label ms-2'>{choice}</label>

                        </div>
                    ))}
                    </div>
                )
            }
            else{
                return null;
            }
    }

export default Answeroptions
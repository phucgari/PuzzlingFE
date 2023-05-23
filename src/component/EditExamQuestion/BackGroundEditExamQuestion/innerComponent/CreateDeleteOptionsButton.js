import React from 'react';

function CreateDeleteOptionsButton(props) {
    const {exam, setExam, index, question} = props
    return (
        <div className="btn-group float-right" role="group">
            <i className="btn btn-secondary fa fa-plus" onClick={() => {
                exam.questions[index] = {
                    ...question,
                    options: [
                        ...question.options,
                        {
                            name: "",
                            status: false
                        }
                    ]
                }
                setExam({...exam})
            }}/>
            <i className="btn btn-secondary fa fa-minus"
               onClick={() => {
                   exam.questions[index].options.pop()
                   setExam({...exam})
               }}
            />
        </div>
    );
}

export default CreateDeleteOptionsButton;
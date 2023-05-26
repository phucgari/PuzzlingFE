import React from 'react';

function DeleteQuestionButton(props) {
    const {exam, setExam, index} = props
    return (
        <div>
            <div className="btn-group float-right" role="group">
                <i className="btn btn-danger fa fa-minus"
                   onClick={() => {
                       exam.questions.splice(index, 1)
                       setExam({...exam})
                   }}
                />
            </div>
        </div>
    );
}

export default DeleteQuestionButton;
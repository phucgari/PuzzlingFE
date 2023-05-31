import React from 'react';

function CreateDeleteOptionsButton(props) {
    const {exam, setExam, index, question} = props
    return (
        <div className="btn-group float-right mt-4 mb-2" role="group">
            <button className="btn btn-success" onClick={() => {
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
            }}>Thêm ô lựa chọn</button>
            &nbsp;
            <button className="btn btn-danger"
               onClick={() => {
                   exam.questions[index].options.pop()
                   setExam({...exam})
               }}
            >Xoá ô lựa chọn</button>
        </div>
    );
}

export default CreateDeleteOptionsButton;
import React from 'react';

function SideBarEditExamQuestion(props) {
    const {setExam, exam} = props

    function addOneChoiceQuestion() {
        setExam(
            {
                ...exam,
                questions: [...exam.questions, {
                    level: "",
                    name: "",
                    questionType: "ONE_CHOICE",
                    options: []
                }]
            })
    }

    function addMultiChoiceQuestion() {
        setExam(
            {
                ...exam,
                questions: [...exam.questions, {
                    level: "",
                    name: "",
                    questionType: "MULTI_CHOICE",
                    options: [],
                }]
            }
        )
    }

    return (
        <div className="col-3 border ">
            <button type="button" className="btn btn-primary" onClick={addOneChoiceQuestion}>Thêm câu hỏi lựa chọn một
                đáp án
            </button>
            <button type="button" className="btn btn-primary" onClick={addMultiChoiceQuestion}>Thêm câu hỏi lựa chọn
                nhiều đáp án
            </button>
        </div>
    );
}

export default SideBarEditExamQuestion;
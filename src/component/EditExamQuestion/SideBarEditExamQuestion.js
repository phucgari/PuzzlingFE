import React from 'react';
import {useNavigate, useParams} from "react-router-dom";

function SideBarEditExamQuestion(props) {
    const {setExam, exam} = props
    let { id } = useParams();
    const navigate = useNavigate();

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
    const handleOptionSelect = (event) => {
        const selectedOption = event.target.value;

        switch (selectedOption) {
            case 'search-add':
                navigate('/exam/edit/search-add');
                break;
            case 'one-choice':
                addOneChoiceQuestion();
                break;
            case 'multi-choice':
                addMultiChoiceQuestion();
                break;
            default:
                // Xử lý khi không có lựa chọn nào được chọn
                break;
        }
    };


    return (
        <div className="container">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content rounded-modal shadow p-3 border-0"
                     style={{marginTop: 6 + 'rem', backgroundColor: "#d5fdfd"}}>
                    <h5>Vui lòng chọn loại câu hỏi bạn muốn</h5>
                    <div className="col-3">
                        <select className="form-select textfield-rounded" onChange={handleOptionSelect}>
                            <option>Chọn loại câu hỏi</option>
                            <option value="search-add">Thêm câu hỏi từ bộ có sẵn</option>
                            <option value="one-choice" onClick={addOneChoiceQuestion}>
                                Thêm câu hỏi lựa chọn một đáp án
                            </option>
                            <option value="multi-choice" onClick={addMultiChoiceQuestion}>
                                Thêm câu hỏi lựa chọn nhiều đáp án
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SideBarEditExamQuestion;
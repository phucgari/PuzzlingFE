import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

function SideBarEditExamQuestion(props) {
    const { setExam, exam } = props;
    let { id } = useParams();
    const navigate = useNavigate();
    const [questionTypeSelected, setQuestionTypeSelected] = useState(false);

    function addOneChoiceQuestion() {
        setExam({
            ...exam,
            questions: [...exam.questions, {
                level: "",
                name: "",
                questionType: "ONE_CHOICE",
                options: []
            }]
        });
        setQuestionTypeSelected(true);
    }

    function addMultiChoiceQuestion() {
        setExam({
            ...exam,
            questions: [...exam.questions, {
                level: "",
                name: "",
                questionType: "MULTI_CHOICE",
                options: [],
            }]
        });
        setQuestionTypeSelected(true);
    }

    const handleOptionSelect = (event) => {
        const selectedOption = event.target.value;
        switch (selectedOption) {
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
                     style={{ marginTop: 6 + 'rem', backgroundColor: "#d5fdfd" }}>
                    <h5>Vui lòng chọn loại câu hỏi bạn muốn</h5>
                    <div className={"row"}>
                        <div className={"col col-6"} style={{ display: "flex", justifyContent: "left" }}>
                            <select className="form-select textfield-rounded" onChange={handleOptionSelect}>
                                <option hidden>Chọn loại câu hỏi</option>
                                <option value="one-choice" onClick={addOneChoiceQuestion}>
                                    Thêm câu hỏi lựa chọn một đáp án
                                </option>
                                <option value="multi-choice" onClick={addMultiChoiceQuestion}>
                                    Thêm câu hỏi lựa chọn nhiều đáp án
                                </option>
                            </select>
                        </div>
                        <div className={"col col-6"} style={{ display: "flex", justifyContent: "right" }}>
                            <button type="button" className="gradientBtn animated wow fadeInUpy"
                                    onClick={() => navigate(`/exam/edit/${exam.id}/search-add`)}>
                                Thêm câu hỏi từ bộ có sẵn
                            </button>
                        </div>
                    </div>
                    {questionTypeSelected && (
                        <div>
                            {/* Thẻ div chứa nút submit và phân trang */}
                            <button type="submit">Submit</button>
                            {/* Các phần trang */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SideBarEditExamQuestion;

import React, {useState} from 'react';
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


    return (
        <div className="container">
            <div className="modal-dialog modal-xl" role="document" >
                <div className="modal-content rounded-modal shadow p-3 border-0"
                     style={{marginTop: 6 + 'rem', backgroundColor: "#d5fdfd"}}>
                    <h4>Vui lòng chọn loại câu hỏi bạn muốn:</h4>
                    <br/>
                    <div className={"row"}>
                        <div className={"col col-16"} style={{display: "flex", justifyContent: "left"}}>
                            <button className="gradientBtn animated wow fadeInUpy" onClick={addOneChoiceQuestion}>
                                Thêm câu hỏi lựa chọn một đáp án
                            </button>
                        </div>
                        <div className={"col col-16"} style={{display: "flex", justifyContent: "center"}}>
                            <button className="gradientBtn animated wow fadeInUpy" onClick={addMultiChoiceQuestion}>
                                Thêm câu hỏi lựa chọn nhiều đáp án
                            </button>
                        </div>
                        <div className={"col col-16"}
                            style={{display:"flex",justifyContent:"right"}} >
                            <button type="button" className="gradientBtn animated wow fadeInUpy"
                                    onClick={() => navigate(`/exam/edit/${exam.id}/search-add`)}>
                                Thêm câu hỏi từ bộ có sẵn
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default SideBarEditExamQuestion;
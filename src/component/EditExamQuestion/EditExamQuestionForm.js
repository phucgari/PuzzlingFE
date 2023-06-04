import React from 'react';
import SideBarEditExamQuestion from "./SideBarEditExamQuestion";
import BackGroundEditExamQuestion from "./BackGroundEditExamQuestion";
import axios from "axios";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import SearchAddQuestion from "../searchAddQuestion/SearchAddQuestion";

function EditExamQuestionForm() {
    const navigate = useNavigate();
    let {id} = useParams();
    const [exam, setExam] = React.useState({
        category: {
            name: ""
        },
        questions: []
    })
    React.useEffect(
        () => {
            axios.get(`http://localhost:8080/puzzling/exam/info?examId=${id}`)
                .then((response) => {
                    setExam(response.data)
                })
                .catch((error) => {
                    navigate(`/${error.response.status}`)
                })
        }
        , [])
    return (
        <div className="container">

            <h3 className="d-flex justify-content-center"> Bộ câu hỏi {exam.name} </h3>
            <h5 className="d-flex justify-content-center"> Tổng số câu hỏi: {exam.questions.length} </h5>
            <div style={{display: "flex", justifyContent: "center"}} className="container">
                <input className=" textfield-rounded"
                       readOnly={"http://localhost:3000/exam/do/" + exam.id} type="text"
                       value={"http://localhost:3000/exam/do/" + exam.id}></input>
                <button className={"gradientBtn animated wow fadeInUp"} type={'button'}
                        onClick={() => navigator.clipboard.writeText("http://localhost:3000/exam/do/" + exam.id)}>Copy &#10004;</button>
            </div>

            <div className="modal-dialog modal-xl" role="document">
                <Routes>
                    <Route path={`/`} element={
                        <div className="container">
                            <div className="row">
                                <SideBarEditExamQuestion
                                    setExam={setExam}
                                    exam={exam}
                                />
                                <div className="col-1"></div>
                                {exam.questions.length > 0 &&
                                    <BackGroundEditExamQuestion
                                        exam={exam}
                                        setExam={setExam}
                                        id={exam.id}
                                    />
                                }
                            </div>
                        </div>
                    }/>
                    <Route path={`/search-add`} element={
                        <SearchAddQuestion
                            exam={exam}
                            setExam={setExam}
                        />
                    }/>
                </Routes>
            </div>
        </div>
    );
}

export default EditExamQuestionForm;
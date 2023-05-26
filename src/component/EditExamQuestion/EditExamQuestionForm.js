import React from 'react';
import SideBarEditExamQuestion from "./SideBarEditExamQuestion";
import BackGroundEditExamQuestion from "./BackGroundEditExamQuestion";
import axios from "axios";
import {Route, Routes, useLocation} from "react-router-dom";
import SearchAddQuestion from "../searchAddQuestion/SearchAddQuestion";

function EditExamQuestionForm() {
    const {state} = useLocation();
    const [exam, setExam] = React.useState({
        questions: []
    })
    React.useEffect(
        () => {
            const {id} = state;
            axios.get(`http://localhost:8080/puzzling/exam/info?examId=${id}`)
                .then((response) => {
                    setExam(response.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        , [])
    return (
        <div className="container">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content rounded-modal shadow p-3 border-0"
                     style={{marginTop: 6 + 'rem', backgroundColor: "#d5fdfd"}}>
                    <>
                        <h3 className="d-flex justify-content-center"> Bộ câu hỏi {exam.name} </h3>
                        <h5 className="d-flex justify-content-center"> Tổng số câu hỏi: {exam.questions.length} </h5>
                        <Routes>
                            <Route path={`/`} element={
                                <div className="container">
                                    <div className="row">
                                        <SideBarEditExamQuestion
                                            setExam={setExam}
                                            exam={exam}
                                        />
                                        <div className="col-1"></div>
                                        <BackGroundEditExamQuestion
                                            exam={exam}
                                            setExam={setExam}
                                            id={exam.id}
                                        />
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
                    </>
                </div>
            </div>
        </div>
    );
}

export default EditExamQuestionForm;
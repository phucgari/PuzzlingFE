import React from 'react';
import SideBarEditExamQuestion from "./SideBarEditExamQuestion";
import BackGroundEditExamQuestion from "./BackGroundEditExamQuestion";
import axios from "axios";
import {Route, Routes, useLocation} from "react-router-dom";
import SearchAddQuestion from "../searchAddQuestion/SearchAddQuestion";

function EditExamQuestionForm() {
    const {state} = useLocation();
    const {id} = state;
    const [exam, setExam] = React.useState({
        questions: []
    })
    React.useEffect(

        ()=>{axios.get(`http://localhost:8080/puzzling/exam/info?examId=${id}`)
                .then((response) => {
                    setExam(response.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        , [])
    return (
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
                            id={id}
                        />
                    </div>
                </div>
            } />
            <Route path={`/search-add`} element={
                <SearchAddQuestion
                    exam={exam}
                    setExam={setExam}
                />
            }/>
        </Routes>
    );
}

export default EditExamQuestionForm;
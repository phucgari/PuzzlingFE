import React from 'react';
import SideBarEditExamQuestion from "./SideBarEditExamQuestion";
import BackGroundEditExamQuestion from "./BackGroundEditExamQuestion";
import axios from "axios";
import {useLocation} from "react-router-dom";

function EditExamQuestionForm() {
    const {state} = useLocation();
    const { id } = state;
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
                })}
    , [])
    return (
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
    );
}

export default EditExamQuestionForm;
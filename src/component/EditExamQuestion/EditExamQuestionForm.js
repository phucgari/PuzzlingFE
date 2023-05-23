import React from 'react';
import SideBarEditExamQuestion from "./SideBarEditExamQuestion";
import BackGroundEditExamQuestion from "./BackGroundEditExamQuestion";
import axios from "axios";

function EditExamQuestionForm() {
    const [exam, setExam] = React.useState({
        questions: []
    })
    React.useEffect(
        ()=>{axios.get(`http://localhost:8080/puzzling/exam/infoExam?examId=1`)
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
                />
            </div>
        </div>
    );
}

export default EditExamQuestionForm;
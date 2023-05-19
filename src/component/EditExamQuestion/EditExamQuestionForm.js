import React from 'react';
import SideBarEditExamQuestion from "./SideBarEditExamQuestion";
import BackGroundEditExamQuestion from "./BackGroundEditExamQuestion";

function EditExamQuestionForm(props) {
    const [exam, setExam] = React.useState({
        questions: []
    })
    React.useEffect(() => {
        //call Exam here
        setExam({questions: []})
    }, [])
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
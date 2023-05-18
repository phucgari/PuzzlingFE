import React from 'react';
import SideBarEditExamQuestion from "./SideBarEditExamQuestion";
import BackGroundEditExamQuestion from "./BackGroundEditExamQuestion";

function EditExamQuestionForm(props) {
    const {exam} = props
    const [questions, setQuestions] = React.useState([])
    React.useEffect(() => {
        //call Questions here
        setQuestions([])
    }, [])
    return (
        <div className="container">
            <div className="row">
                <SideBarEditExamQuestion
                    setQuestions={setQuestions}
                    questions={questions}
                />
                <div className="col-1"></div>
                <BackGroundEditExamQuestion
                    questions={questions}
                    setQuestions={setQuestions}
                    exam={exam}
                />
            </div>
        </div>
    );
}

export default EditExamQuestionForm;
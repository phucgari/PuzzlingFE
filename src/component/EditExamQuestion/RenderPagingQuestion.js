import React from 'react';
import {FieldArray, Form} from "formik";
import RenderQuestionForm from "./BackGroundEditExamQuestion/RenderQuestionForm";
import Pagination from "../searchAddQuestion/Pagination";

function RenderPagingQuestion(props) {
    const {values,isValid,setExam} =props
    const [currentPage, setCurrentPage] = React.useState(1);
    const [questionsPerPage] = React.useState(5);

    // Get current posts
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = values.questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <Form>
            <FieldArray name={`questions`}>
                <>
                    {
                        currentQuestions.map(((question, index) =>
                                <RenderQuestionForm
                                    question={question}
                                    index={index+indexOfFirstQuestion}
                                    setExam={setExam}
                                    exam={values}
                                />
                        ))
                    }
                    <Pagination
                        elementPerPage={questionsPerPage}
                        totalElements={values.questions.length}
                        paginate={paginate}
                    />
                </>
            </FieldArray>
            <button type="submit" className="btn btn-secondary" disabled={!isValid}>submit</button>
        </Form>
    )
}


export default RenderPagingQuestion;
import React from 'react';
import {FieldArray, Form} from "formik";
import RenderQuestionForm from "./BackGroundEditExamQuestion/RenderQuestionForm";
import Pagination from "../searchAddQuestion/Pagination";
import {useNavigate} from "react-router-dom";

function RenderPagingQuestion(props) {
    const navigate = useNavigate();
    const {values, isValid, setExam} = props
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
                                    index={index + indexOfFirstQuestion}
                                    setExam={setExam}
                                    exam={values}
                                />
                        ))
                    }
                    <Pagination
                        elementPerPage={questionsPerPage}
                        totalElements={values.questions.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </>
            </FieldArray>
            <div style={{display: "flex", justifyContent: "center"}}>
                <button onClick={() => navigate("/exam/all")} type="submit"
                        className="gradientBtn animated wow fadeInUp mt-4 mb-3" disabled={!isValid}>Thêm mới
                </button>
            </div>
        </Form>
    )
}


export default RenderPagingQuestion;
import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from "./Pagination";
import MappingQuestionsSearched from "./MappingQuestionsSearched";
import {Field, Form, Formik} from "formik";

function SearchAddQuestion(props) {
    const{exam,setExam}=props
    const [questionsSearched, setQuestionsSearched] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage] = useState(10);

    useEffect(() => {

    }, []);

    // Get current posts
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questionsSearched.slice(indexOfFirstQuestion, indexOfLastQuestion);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className='container mt-5'>
            <h1 className='text-primary mb-3'>Search Questions</h1>
            <Formik initialValues={({
                name: "",
                category:exam.category,
                questionType:"",
                level:""
            })}>
                {({value})=>
                    <Form>
                        <Field name={`name`} className={"form-control"}
                               id={`name`}
                               placeholder="Tên câu hỏi"/>
                        <br/>
                        <label htmlFor={`level`}>Chọn độ khó</label>
                        <Field as="select" className={"form-control"} name={`level`}
                               id={`level`}>
                            <option value="">Chọn</option>
                            <option value="EASY"> Dễ</option>
                            <option value="MEDIUM"> Vừa</option>
                            <option value="HARD"> Khó</option>
                        </Field>
                        <br/>
                        <label htmlFor={`questionType`}>Chọn loại câu hỏi</label>
                        <Field as="select" className={"form-control"} name={`questionType`}
                               id={`questionType`}>
                            <option value="">Chọn</option>
                            <option value="ONE_CHOICE"> Lựa chọn một đáp án</option>
                            <option value="MULTI_CHOICE"> Lựa chọn nhiều đáp án</option>
                        </Field>
                        <button type="submit" className="btn btn-secondary">Tìm kiếm</button>
                    </Form>
                }
            </Formik>
            {/*<MappingQuestionsSearched questions={currentQuestions} loading={loading} />*/}
            {/*<Pagination*/}
            {/*    questionsPerPage={questionsPerPage}*/}
            {/*    totalQuestions={questionsSearched.length}*/}
            {/*    paginate={paginate}*/}
            {/*/>*/}
        </div>
    );
}

export default SearchAddQuestion;
import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from "./Pagination";
import MappingQuestionsSearched from "./MappingQuestionsSearched";
import {Field, FieldArray, Form, Formik} from "formik";
import {useNavigate, useParams} from "react-router-dom";

function SearchAddQuestion(props) {
    const {exam, setExam} = props
    let {id} = useParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [ElementPerPage] = useState(5);
    const [selectQuestionToAdd, setSelectQuestionToAdd] = useState({elements: []})
    const [searchForm] = useState({
        name: "",
        category: exam.category.name,
        questionType: "",
        level: ""
    })

    function addToExam(values, action) {
        let newQ = []
        values.elements.forEach((element) => {
            let question = element.question
            if (element.add)
                newQ.push({
                    level: question.level,
                    name: question.name,
                    questionType: question.questionType,
                    options: question.options.map((option) => ({
                        name: option.name,
                        status: option.status
                    }))
                })
        })
        setExam((exam) => ({
            ...exam,
            questions: [
                ...exam.questions,
                ...newQ
            ]
        }))
        action.resetForm()
        navigate(`/exam/edit/${id}`)
    }

    function search(searchForm) {
        axios.post(`http://localhost:8080/puzzling/question/search`, searchForm)
            .then((response) => {
                let mapper = response.data.map((question) =>
                    ({
                        question: question,
                        add: false
                    })
                )
                setSelectQuestionToAdd({elements: mapper})
            })
    }

    useEffect(() => {
        search(searchForm)
    }, [searchForm]);

    // Get current posts
    const indexOfLastElement = currentPage * ElementPerPage;
    const indexOfFirstElement = indexOfLastElement - ElementPerPage;
    const currentElements = selectQuestionToAdd.elements.slice(indexOfFirstElement, indexOfLastElement);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container mt-5">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content rounded-modal shadow p-4 border-0"
                     style={{backgroundColor: "#bef6fd"}}
                >
                    <h2 className='mb-4'
                        style={{textAlign: "center", fontWeight: "bold"}}
                    >
                        Tìm kiếm câu hỏi
                    </h2>
                    <Formik initialValues={searchForm}
                            onSubmit={search}
                    >
                        {() =>
                            <Form>
                                <Field name={"name"} className={"form-control textfield-rounded mt-4"}
                                       id={"name"} placeholder="Tên câu hỏi"/>
                                <label htmlFor={"level"} className={"mt-4"}>Chọn độ khó: </label>
                                <Field as="select" className={"form-control textfield-rounded mt-2"}
                                       name={"level"} id={"level"}>
                                    <option value="" hidden>Chọn</option>
                                    <option value="EASY"> Dễ</option>
                                    <option value="MEDIUM">Vừa</option>
                                    <option value="HARD"> Khó</option>
                                </Field>
                                <label htmlFor={"questionType"} className={"mt-4"}>Chọn loại câu hỏi:</label>
                                <Field as="select" className={"form-control textfield-rounded mt-2"} name={"questionType"}
                                       id={"questionType"}>
                                    <option value="" hidden>Chọn</option>
                                    <option value="ONE_CHOICE"> Một đáp án</option>
                                    <option value="MULTI_CHOICE">Nhiều đáp án</option>
                                </Field>
                                <button type="submit" className="gradientBtn w-50 animated wow fadeInUp mt-4">Tìm kiếm</button>
                            </Form>
                        }
                    </Formik>
                    <br/>
                    <Formik
                        initialValues={selectQuestionToAdd}
                        enableReinitialize={true}
                        onSubmit={addToExam}
                    >
                        <Form className={"mt-4"}>
                            <FieldArray name={"element"}>
                                {
                                    () =>
                                        <MappingQuestionsSearched
                                            elements={currentElements}
                                            startIndex={indexOfFirstElement}/>
                                }
                            </FieldArray>
                            <button type="submit" className="btn btn-secondary">Thêm vào</button>
                        </Form>
                    </Formik>
                    <Pagination
                        elementPerPage={ElementPerPage}
                        totalElements={selectQuestionToAdd.elements.length}
                        paginate={paginate}
                    />
                    <button type="button" onClick={() => navigate(`/exam/edit/${id}`)}
                            className="btn btn-primary"
                    >
                        Trở về trình quản lý câu hỏi
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SearchAddQuestion;
import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from "./Pagination";
import MappingQuestionsSearched from "./MappingQuestionsSearched";
import {Field, FieldArray, Form, Formik} from "formik";
import {useNavigate, useParams} from "react-router-dom";

function SearchAddQuestion(props) {
    const {exam, setExam} = props
    let { id } = useParams();
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
    function addtoExam(values,action){
        let newQ=[]
        values.elements.forEach((element)=> {
            let question=element.question
            if(element.add)
            newQ.push({
                level:question.level,
                name:question.name,
                questionType:question.questionType,
                options:question.options.map((option)=>({
                    name:option.name,
                    status:option.status
                }))
            })
        })
        setExam((exam)=>({
            ...exam,
            questions:[
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
    }, []);

    // Get current posts
    const indexOfLastElement = currentPage * ElementPerPage;
    const indexOfFirstElement = indexOfLastElement - ElementPerPage;
    const currentElements = selectQuestionToAdd.elements.slice(indexOfFirstElement, indexOfLastElement);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className='container mt-5'>
            <button type="button" onClick={() => navigate(`/exam/edit/${id}`) }className="btn btn-primary"> Trở về trình quản
                lý câu hỏi
            </button>
            <h1 className='text-primary mb-3'>Search Questions</h1>
            <Formik initialValues={searchForm}
                onSubmit={search}
            >
                {({value}) =>
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
            <Formik
                initialValues={selectQuestionToAdd}
                enableReinitialize={true}
                onSubmit={addtoExam}
            >
                <Form>
                    <FieldArray name={"element"}>
                        {
                            (arrayHelper) =>
                                <MappingQuestionsSearched
                                    elements={currentElements}
                                    startIndex={indexOfFirstElement}/>
                        }
                    </FieldArray>
                    <button type="submit" className="btn btn-secondary">Thêm vào </button>
                </Form>
            </Formik>
            <Pagination
                elementPerPage={ElementPerPage}
                totalElements={selectQuestionToAdd.elements.length}
                paginate={paginate}
            />
        </div>
    );
}

export default SearchAddQuestion;
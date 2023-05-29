import React, {useEffect, useState} from 'react';
import {FieldArray, Form, Formik} from "formik";
import RenderQuestionForm from "./BackGroundEditExamQuestion/RenderQuestionForm";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import RenderPagingQuestion from "./RenderPagingQuestion";

const validationExam = Yup.object().shape({
    questions: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required(),
            level: Yup.string().required(),
            questionsType: Yup.string(),
            options: Yup.array().when('questionType', ([questionType], schema) => {
                if (questionType === "ONE_CHOICE") {
                    return schema.test("test Option Array", (value, context) => {
                        let checkStatus = false
                        let checkName = true
                        value.forEach((option) => {
                            if (option.status) checkStatus = true
                            if (!option.name) checkName = false
                        })
                        return checkName && checkStatus
                    })
                } else if (questionType === "MULTI_CHOICE") {
                    return schema.test("test Option Array", (value, context) => {
                        let checkName = true
                        let countStatus = 0
                        value.forEach((option) => {
                            if (!option.name) checkName = false
                            if (option.status===true||option.status==='true') countStatus++
                        })
                        let checkStatus = countStatus >= 2
                        return checkName && checkStatus
                    })
                }
            })
        })
    )
})

function BackGroundEditExamQuestion(props) {
    const navigate = useNavigate();
    const {exam, setExam, id} = props
    useEffect(
        () => {

        },
        [exam]
    )
    return (
        <div className="container">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content rounded-modal shadow p-3 border-0"
                     style={{marginTop: 6 + 'rem', backgroundColor: "#d5fdfd"}}>
                    <div className="col-8 border ">
                        <div className="container">
                            <Formik initialValues={exam}
                                    onSubmit={(values) => {
                                        console.log(values)
                                        axios.put(`http://localhost:8080/puzzling/exam/update?examId=${id}`, values)
                                            .then(() => {
                                                alert("Thành công!")
                                                navigate('/');
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            });
                                    }}
                                    enableReinitialize={true}
                                    validationSchema={validationExam}
                            >
                                {({values, isValid}) => <RenderPagingQuestion
                                    values={values}
                                    isValid={isValid}
                                    setExam={setExam}
                                />
                                }
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BackGroundEditExamQuestion;
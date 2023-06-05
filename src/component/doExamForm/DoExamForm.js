import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Render1Question from "./Render1Question";
import {Form, Formik} from "formik";
import AdditionalInformation from "./AdditionalInformation";
import Clock from "./AdditionalInformation/Clock";
import AuthorAndLevel from "./AdditionalInformation/AuthorAndLevel";

function DoExamForm(props) {
    const {examId} = useParams();
    const navigate = useNavigate();

    function submitRecord(values) {
        values.user.id = JSON.parse(localStorage.getItem("id"))
        axios.post(`http://localhost:8080/puzzling/record/createExamResult`, values)
            .then((response) => {
                navigate(`/record/` + response.data.id)
            })
            .catch((error) => {
                navigate(`/${error.response.status}`)
            });
    }

    const [record, setRecord] = React.useState(
        {
            user: {
                id: ""
            },
            exam: {
                id: "",
                name: "",
                time: 10,
                passScore: 0,
                questions: [{
                    name: "",
                    level: "",
                    options: [{
                        name: ""
                    }]
                }],
                category: "",
                user: {}
            },
            recordDetail: [
                {
                    question: {},
                    answers: [
                        {
                            option: {},
                            answerStatus: "false"
                        }
                    ]
                }
            ]
        });
    const [currentIndex, setCurrentIndex] = React.useState(0);
    useEffect(() => {
        axios.get(`http://localhost:8080/puzzling/exam/info?examId=${examId}`)
            .then((response) => {
                let Sexam= response.data
                setRecord({
                    user: {
                        id: ""
                    },
                    exam: {
                        name:Sexam.name,
                        time:Sexam.time,
                        passScore:Sexam.passScore,
                        category:Sexam.category,
                        user:Sexam.user,
                        questions:Sexam.questions.map((question)=>({
                            level:question.level,
                            name:question.name,
                            questionType: question.questionType,
                            options:question.options.map((option)=>({
                                name:option.name,
                                status:option.status
                            }))
                        }))
                    },
                    recordDetail: response.data.questions.map((question) => ({
                        question: question,
                        answers: question.options.map((option) => ({
                            option: option,
                            answerStatus: "false"
                        }))
                    }))
                })
            })
            .catch((error) => {
                navigate(`/${error.response.status}`)
            })
    }, [examId])
    return (
        <div className="container mt-5">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content rounded-modal shadow p-4 border-0 bg-img">
                    <Formik initialValues={record}
                            onSubmit={submitRecord}
                            enableReinitialize={true}
                    >
                        {
                            (formik) => {
                                return (
                                    <Form>
                                        <div className={"row"}>
                                            <div className={"col col-6"}>
                                                <Clock
                                                    formik={formik}
                                                />
                                            </div>
                                            <div className={"col col-6"} style={{textAlign: "right"}}>
                                                <AuthorAndLevel
                                                    formik={formik}
                                                    currentIndex={currentIndex}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Render1Question
                                                currentIndex={currentIndex}
                                                formik={formik}
                                            />
                                        </div>
                                        <AdditionalInformation
                                            formik={formik}
                                            currentIndex={currentIndex}
                                            setCurrentIndex={setCurrentIndex}
                                        />
                                        <div>
                                            {currentIndex !== 0 &&
                                                <button type="button"
                                                        onClick={() => setCurrentIndex((cur) => --cur)}
                                                        className="gradientBtn mt-4 animated wow fadeInUp">
                                                    Câu hỏi trước
                                                </button>
                                            }
                                            {
                                                currentIndex !== record.exam.questions.length - 1 &&
                                                <button type="button"
                                                        onClick={() => setCurrentIndex((cur) => ++cur)}
                                                        className="gradientBtn mt-4 animated wow fadeInUp">
                                                    Câu hỏi tiếp theo
                                                </button>
                                            }
                                            {
                                                currentIndex === record.exam.questions.length - 1 &&
                                                <button type="submit"
                                                        className="gradientBtn mt-4 animated wow fadeInUp">
                                                    Nộp bài thi
                                                </button>
                                            }
                                        </div>
                                    </Form>
                                )
                            }
                        }
                    </Formik>

                </div>
            </div>
        </div>
    );
}

export default DoExamForm;
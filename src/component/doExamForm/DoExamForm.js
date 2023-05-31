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
    if(JSON.parse(localStorage.getItem("id"))===undefined){
        document.getElementById("mySidenav").style.cssText = "width:270px; border-right: 10px solid #fff; box-shadow: 1px 8px 8px 8px rgba(73,21,155,0.3); -webkit-box-shadow: 1px 8px 8px 8px rgba(73,21,155,0.3);  -moz-box-shadow: 1px 8px 8px 8px rgba(73,21,155,0.3);";
    }
    function submitRecord(values) {
        axios.post(`http://localhost:8080/puzzling/record/createExamResult`, values)
            .then((response) => {
                navigate(`/record/`+response.data.id)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const [record, setRecord] = React.useState(
        {
            user: {
                id: JSON.parse(localStorage.getItem("id"))
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
                setRecord({
                    user: {
                        id: JSON.parse(localStorage.getItem("id"))
                    },
                    exam: response.data,
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
                console.log(error);
            })
    }, [examId])
    return (
        <div className="container mt-5">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content rounded-modal shadow p-4 border-0"
                     style={{backgroundColor: "#bef6fd"}}>
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
import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import Render1Question from "./Render1Question";
import {Form, Formik} from "formik";

function DoExamForm(props) {
    const { examId } = useParams();
    const[record,setRecord]= React.useState(
        {
            user:{
                id:JSON.parse(localStorage.getItem("id"))
            },
            exam: {
                id: "",
                name: "",
                time: 10,
                passScore: 0,
                questions: [{
                    name: "",
                    options: [{
                        name: ""
                    }]
                }],
                category: "",
                user: {}
            },
            recordDetail:[]
        });
    const[currentIndex,setCurrentIndex]=React.useState(0);
    useEffect(()=>{
        axios.get(`http://localhost:8080/puzzling/exam/info?examId=${examId}`)
            .then((response) => {
                setRecord(  {
                        user:{
                            id:JSON.parse(localStorage.getItem("id"))
                        },
                        exam: response.data,
                        recordDetail: response.data.questions.map((question)=>({
                            question: question,
                            answers:question.options.map((option)=>({
                                option:option,
                                answerStatus:"false"
                            }))
                        }))
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    },[examId])
    return (
        <div>
            <Formik initialValues={record}
                    onSubmit={console.log}
                    enableReinitialize={true}
            >
                <Form>
                    <Render1Question
                        questions={record.exam.questions}
                        currentIndex={currentIndex}
                    />
                    {
                        currentIndex!==record.exam.questions.length-1 ?
                        <button type="button" onClick={() => setCurrentIndex((cur) => ++cur)} className="btn btn-primary">
                            Câu hỏi tiếp theo
                        </button>:
                        <button type="submit" className="btn btn-primary">
                            Nộp bài thi
                        </button>
                    }
                    {currentIndex!==0 &&
                        <button type="button" onClick={()=>setCurrentIndex((cur)=>--cur)} className="btn btn-primary">
                            Câu hỏi trước
                        </button>
                    }
                </Form>
            </Formik>
        </div>
    );
}

export default DoExamForm;
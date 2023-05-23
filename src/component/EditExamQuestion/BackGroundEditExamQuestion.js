import React, {useEffect} from 'react';
import {FieldArray, Form, Formik} from "formik";
import RenderQuestionForm from "./BackGroundEditExamQuestion/RenderQuestionForm";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const validationExam=Yup.object().shape({
    questions:Yup.array().of(
        Yup.object().shape({
            name:Yup.string().required(),
            level:Yup.string().required(),
            questionsType:Yup.string(),
            options:Yup.array().when('questionType',([questionType],schema)=>{
                if(questionType==="ONE_CHOICE"){
                    return schema.test("test Option Array",(value, context)=>{
                        let checkStatus=false
                        let checkName=true
                        value.forEach((option)=>{
                            if(option.status)checkStatus=true
                            if(!option.name)checkName=false
                        })
                        return checkName&&checkStatus
                    })
                }else if(questionType==="MULTI_CHOICE"){
                    return schema.test("test Option Array",(value, context)=>{
                        let checkName=true
                        value.forEach((option)=>{
                            if(!option.name)checkName=false
                        })
                        return checkName
                    })
                }
            })
        })
    )
})
function BackGroundEditExamQuestion(props) {
    const navigate = useNavigate();
    const {exam, setExam} = props
    useEffect(
        () => {

        },
        [exam]
    )
    return (
        <div className="col-8 border ">
            <div className="container">
                <Formik initialValues={exam}
                        onSubmit={(values) => {
                            axios.put(`http://localhost:8080/puzzling/exam/updateExam?examId=1`, values)
                                .then(() => {
                                    navigate('/');
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }}
                        enableReinitialize={true}
                        validationSchema={validationExam}
                >
                    {({values,isValid}) =>
                        <Form>
                            <FieldArray name={`questions`}>
                                {() => {
                                    return (<>
                                        {
                                            values.questions.map(((question, index) =>
                                                    <RenderQuestionForm
                                                        question={question}
                                                        index={index}
                                                        setExam={setExam}
                                                        exam={values}
                                                    />
                                            ))
                                        }
                                    </>)
                                }
                                }
                            </FieldArray>
                            <button type="submit" className="btn btn-secondary" disabled={!isValid}>submit</button>
                        </Form>
                    }
                </Formik>
            </div>
        </div>
    );
}

export default BackGroundEditExamQuestion;
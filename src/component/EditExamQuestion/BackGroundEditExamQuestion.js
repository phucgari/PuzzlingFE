import React, {useEffect} from 'react';
import {FieldArray, Form, Formik} from "formik";
import RenderQuestionForm from "./BackGroundEditExamQuestion/RenderQuestionForm";

function BackGroundEditExamQuestion(props) {
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
                        onSubmit={console.log}
                        enableReinitialize={true}>
                    {({values}) =>
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
                            <button type="submit" className="btn btn-secondary">submit</button>
                        </Form>
                    }
                </Formik>
            </div>
        </div>
    );
}

export default BackGroundEditExamQuestion;
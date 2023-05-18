import React from 'react';
import {Field, FieldArray, Form, Formik} from "formik";

function renderQuestionForm(question, index, arrayHelpers) {
    switch (question.questionType) {
        case "ONE_CHOICE":
            return (
                <div className={"form-group"}>
                    <h3>Câu hỏi lựa chọn một đáp án</h3>
                    <div className="btn-group float-right" role="group">
                        <i className="btn btn-secondary fa fa-plus">1</i>
                        <i className="btn btn-secondary fa fa-minus">2</i>
                        <i className="btn btn-secondary">3</i>
                        <i className="btn btn-secondary">4</i>
                    </div>
                    <Field name={`questions.${index}.name`} className={"form-control"} id={`questions.${index}.name`}
                           placeholder="Tên câu hỏi"/>
                    <br/>
                    <label htmlFor={`questions.${index}.level`}>Chọn độ khó</label>
                    <Field as="select" className={"form-control"} name={`questions.${index}.level`}
                           id={`questions.${index}.level`}>
                        <option value="">Chọn</option>
                        <option value="EASY"> Dễ</option>
                        <option value="MEDIUM"> Vừa</option>
                        <option value="HARD"> Khó</option>
                    </Field>
                </div>
            )
        case "MULTI_CHOICE":
            return (
                <>
                    <h1>MULTI_CHOICE</h1>
                </>
            )
    }
}

function BackGroundEditExamQuestion(props) {
    const {questions, setQuestions, exam} = props
    console.log(questions)
    return (
        <div className="col-8 border ">
            <div className="container">
                <Formik initialValues={{
                    questions: questions
                }}
                        onSubmit={console.log}
                        enableReinitialize={true}>
                    <Form>
                        <FieldArray name={`questions`}
                                    render={arrayHelpers =>
                                        <>
                                            {
                                                questions.map(((question, index) =>
                                                        <>
                                                            {
                                                                renderQuestionForm(question, index, arrayHelpers)
                                                            }
                                                        </>
                                                ))
                                            }
                                        </>
                                    }
                        />
                        <button type="submit" className="btn btn-secondary">submit</button>
                    </Form>
                </Formik>

            </div>
        </div>
    );
}

export default BackGroundEditExamQuestion;
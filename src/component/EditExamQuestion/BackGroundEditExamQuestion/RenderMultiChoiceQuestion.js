import React from 'react';
import DeleteQuestionButton from "./innerComponent/DeleteQuestionButton";
import NameAndDifficultiesField from "./innerComponent/NameAndDifficultiesField";
import {Field, FieldArray} from "formik";
import CreateDeleteOptionsButton from "./innerComponent/CreateDeleteOptionsButton";

function RenderMultiChoiceQuestion(props) {
    const {question, index, setExam, exam} = props
    return (
        <div>
            <h3>Câu hỏi lựa chọn nhiều đáp án</h3>
            <DeleteQuestionButton
                exam={exam}
                setExam={setExam}
                index={index}
            />
            <NameAndDifficultiesField
                index={index}
            />
            <FieldArray name={`questions[${index}].options`}>
                <>
                <CreateDeleteOptionsButton
                    exam={exam}
                    setExam={setExam}
                    index={index}
                    question={question}
                />
                {
                    question.options.map((option, optionIndex) =>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <Field type="checkbox"
                                           name={`questions.${index}.options.${optionIndex}.status`}
                                           id={`questions.${index}.options.${optionIndex}.status`}
                                           checked={option.status}
                                    />
                                </div>
                            </div>
                            <Field type="text" className="form-control"
                                   name={`questions.${index}.options.${optionIndex}.name`}
                                   id={`questions.${index}.options.${optionIndex}.name`}
                                   placeholder="Tên lựa chọn"
                            />
                        </div>
                    )
                }
                </>
            </FieldArray>
        </div>
    );
}

export default RenderMultiChoiceQuestion;
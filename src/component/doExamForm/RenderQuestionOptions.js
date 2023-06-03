import React from 'react';
import {Field} from "formik";

function RenderQuestionOptions(props) {
    const {currentIndex, formik} = props

    function changeAnswerStatusRadio(trueIndex) {
        formik.values.recordDetail[currentIndex].answers =
            formik.values.recordDetail[currentIndex].answers.map((prev) => ({
                ...prev,
                answerStatus: false
            }))
        // formik.values.recordDetail[currentIndex].answers[trueIndex].answerStatus=true
    }

    // eslint-disable-next-line default-case
    switch (formik.values.exam.questions[currentIndex].questionType) {
        case "MULTI_CHOICE":
            return (
                <div className="row options">
                    {
                        formik.values.exam.questions[currentIndex].options.map((option, index) =>
                            <div className="col-6 option">
                                <label htmlFor={`recordDetail.${currentIndex}.answers.${index}.answerStatus`}>
                                    <Field type="checkbox"
                                           id={`recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                           name={`recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                           checked={formik.values.recordDetail[currentIndex].answers[index].answerStatus === true}/>
                                    <br/>
                                    {option.name}
                                </label>
                            </div>
                        )
                    }
                </div>
            );
        case "ONE_CHOICE":
            return (
                <div className={"row options"}>
                    {
                        formik.values.exam.questions[currentIndex].options.map((option, index) =>
                            <div className={"col-6 option"}>
                                <label htmlFor={`recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                       onClick={() => changeAnswerStatusRadio(index)}
                                >
                                    <Field type="radio"
                                           id={`recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                           name={`recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                           value={'true'}
                                    />
                                    <br/>
                                    {option.name}
                                </label>
                            </div>
                        )
                    }
                </div>
            );
    }

}

export default RenderQuestionOptions;
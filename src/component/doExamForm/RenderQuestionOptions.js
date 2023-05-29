import React from 'react';
import {Field} from "formik";

function RenderQuestionOptions(props) {
    const{currentIndex,formik}=props
    function changeAnswerStatusRadio(trueIndex){
        formik.values.recordDetail[currentIndex].answers=
            formik.values.recordDetail[currentIndex].answers.map((prev)=>({
            ...prev,
            answerStatus:false
        }))
        formik.values.recordDetail[currentIndex].answers[trueIndex].answerStatus=true
    }
    switch (formik.values.exam.questions[currentIndex].questionType){
        case "MULTI_CHOICE":
            return (
                <>
                    {
                        formik.values.exam.questions[currentIndex].options.map((option,index)=>
                            <li className="animated wow fadeInUp delay-0-1s">
                                <Field type="checkbox"
                                       id={`recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                       name={`recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                       checked={formik.values.recordDetail[currentIndex].answers[index].answerStatus===true}
                                />
                                <label htmlFor={`recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                       className="align-middle  element-animation">{option.name}</label>
                            </li>
                        )
                    }
                </>
            );
        case "ONE_CHOICE":
            return (
                <>
                    {
                        formik.values.exam.questions[currentIndex].options.map((option,index)=>
                            <li className="animated wow fadeInUp delay-0-1s" onClick={()=>changeAnswerStatusRadio(index)} >
                                <Field type="radio" id={`recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                       name={`recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                       value={'true'}
                                />
                                <label htmlFor={`recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                       className="align-middle  element-animation">{option.name}</label>
                            </li>
                        )
                    }
                </>
            );
    }

}

export default RenderQuestionOptions;
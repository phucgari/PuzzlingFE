import React from 'react';
import {Field} from "formik";

function RenderQuestionOptions(props) {
    const{currentQuestion,currentIndex,changeAnswerStatusRadio}=props
    switch (currentQuestion.questionType){
        case "MULTI_CHOICE":
            return (
                <>
                    {
                        currentQuestion.options.map((option,index)=>
                            <li className="animated wow fadeInUp delay-0-1s">
                                <Field type="checkbox"
                                       id={`recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                       name={`recordDetail.${currentIndex}.answers.${index}.answerStatus`}
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
                        currentQuestion.options.map((option,index)=>
                            <li className="animated wow fadeInUp delay-0-1s" onClick={()=>changeAnswerStatusRadio(currentIndex,index)}>
                                <Field type="radio" id={`recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                       name={`recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                       value="true"
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
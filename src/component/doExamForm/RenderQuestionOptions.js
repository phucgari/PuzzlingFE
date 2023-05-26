import React from 'react';
import {Field} from "formik";

function RenderQuestionOptions(props) {
    const{currentQuestion,currentIndex}=props
    console.log(currentQuestion.options)
    console.log(currentQuestion)

    switch (currentQuestion.questionType){
        case "MULTI_CHOICE":
            return (
                <>
                    {
                        currentQuestion.options.map((option,index)=>
                            <li className="animated wow fadeInUp delay-0-1s">
                                <Field type="checkbox"
                                       id={`record.recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                       name={`record.recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                />
                                <label htmlFor={`record.recordDetail.${currentIndex}.answers.${index}.answerStatus`}
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
                            <li className="animated wow fadeInUp delay-0-1s" onClick={()=>changeAnswerStatusInRadio(index)}>
                                <input type="radio" id={`record.recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                       name={`record.recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                />
                                <label htmlFor={`record.recordDetail.${currentIndex}.answers.${index}.answerStatus`}
                                       className="align-middle  element-animation">{option.name}</label>
                            </li>
                        )
                    }
                </>
            );
    }

}

export default RenderQuestionOptions;
import React from 'react';
import {Field} from "formik";
const MappingQuestionsSearched = ({ elements, startIndex}) => {
    return (
        <ul className='list-group mb-4'>
            {elements.map((element, index) => (
                <li key={index + startIndex} className='list-group-item'>
                    <label htmlFor={`elements.${index+startIndex}.add`}>Chọn</label>
                    <Field type="checkbox" name={`elements.${index+startIndex}.add`}
                           id={`elements.${index+startIndex}.add`}
                    ></Field>
                    <br/>
                    Câu hỏi {element.question.name}
                    <br/>
                    Đáp án
                    <br/>
                    {element.question.options.map((option)=>(
                        <>
                            {option.status==='true' ?
                                <span className="fa fa-ok"></span>:
                                <span className="fa fa-remove"></span>
                            }
                            {option.name}
                            <br/>
                        </>
                    ))}
                </li>
            ))}
        </ul>
    )

};

export default MappingQuestionsSearched;
import React from 'react';
import {Field} from "formik";
const MappingQuestionsSearched = ({ elements, startIndex}) => {
    return (
        <div className='list-group mb-4'>
            {elements.map((element, index) => (
                <div key={index + startIndex} className='list-group-item'>
                    <label htmlFor={`elements.${index+startIndex}.add`}>Chọn</label>
                    <Field type="checkbox" name={`elements.${index+startIndex}.add`}
                           id={`elements.${index+startIndex}.add`}>
                    </Field>
                    <p>Câu hỏi: {element.question.name}</p>
                    <p>Đáp án:</p>
                    {element.question.options.map((option)=>(
                        <>
                            {option.status==='true' ?
                                <i className={"fa fa-check"} style={{color:"forestgreen"}}></i>:
                                <i className={"fa fa-remove"} style={{color:"red"}}></i>
                            }&nbsp;
                            {option.name}
                            <br/>
                        </>
                    ))}
                </div>
            ))}
        </div>
    )

};

export default MappingQuestionsSearched;
import React from 'react';
import {ErrorMessage, Field} from "formik";

function NameAndDifficultiesField(props) {
    const {index} = props
    return (
        <div>
            <Field name={`questions[${index}].name`} className={"form-control"}
                   id={`questions.${index}.name`}
                   placeholder="Tên câu hỏi"/>
            <br/>
            <label htmlFor={`questions[${index}].level`}>Chọn độ khó</label>
            <Field as="select" className={"form-control"} name={`questions.${index}.level`}
                   id={`questions.${index}.level`}>
                <option value="">Chọn</option>
                <option value="EASY"> Dễ</option>
                <option value="MEDIUM"> Vừa</option>
                <option value="HARD"> Khó</option>
            </Field>
        </div>
    );
}

export default NameAndDifficultiesField;
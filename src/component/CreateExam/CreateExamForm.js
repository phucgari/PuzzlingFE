import React from 'react';
import {Field, Form, Formik} from "formik";
import axios from "axios";
import * as Yup from "yup";
const validationSchema=Yup.object().shape({
    name:Yup.string().required(),
    category:Yup.object().shape({
        id:Yup.string().required()
    }),
    user:Yup.object().required()
})
function CreateExamForm(props) {
    const[exam,setExam]=React.useState({
        name:"",
        category:{

        },
        user : JSON.parse(localStorage.getItem('account')).user
    })
    const[categories,setCategories]=React.useState([])
    React.useEffect(()=>{
        axios.get("http://localhost:8080/puzzling/categories").then((response)=>{
            setCategories(response.data)
        })
    },[])
    return (
        <div>
            <Formik
                initialValues={exam}
                // validationSchema={validationSchema}
                onSubmit={console.log}
            >
                {({isValid})=>
                (
                <Form>
                    <div className="container" >
                        <h3> Tạo mới bài thi </h3>
                        <Field name={`name`} className={"form-control"}
                               id={`name`}
                               placeholder="Tên Bài thi"/>
                        <br/>
                        <Field as="select" name="category.id">
                            {categories.map((cate)=>(
                                <>
                                    <option value={`${cate.id}`}>{cate.name}</option>
                                </>
                            ))}
                        </Field>
                        <button type="submit" className="btn btn-secondary">submit</button>
                    </div>
                </Form>
                )}
            </Formik>
        </div>
    );
}

export default CreateExamForm;
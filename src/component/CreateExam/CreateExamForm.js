import React from 'react';
import {Field, Form, Formik} from "formik";
import axios from "axios";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
const validationSchema=Yup.object().shape({
    name:Yup.string().required(),
    category:Yup.object().shape({
        id:Yup.string().required()
    }),
    passScore:Yup.number().required().min(0).max(100),
    time:Yup.number().required().min(0),
})
function CreateExamForm(props) {
    const navigate = useNavigate();
    const[exam,setExam]=React.useState({
        name:"",
        category:{
            id:""
        },
        user : {
<<<<<<< HEAD
            id:JSON.parse(localStorage.getItem('id')).user
=======
            id:JSON.parse(localStorage.getItem('id'))
>>>>>>> 94cfa941c7d7a571c47af10a4e66ac409e41de16
        }
    })
    const[categories,setCategories]=React.useState([])
    React.useEffect(()=>{
        axios.get("http://localhost:8080/puzzling/categories/").then((response)=>{
            setCategories(response.data)
        })
    },[])
    return (
        <div>
            <Formik
                initialValues={exam}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values)
                    axios.post(`http://localhost:8080/puzzling/exam/create`, values)
                        .then((response) => {
                            navigate('/exam/edit',{state:{id:response.data.id}} );
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }}
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
                                    <option value="">chọn</option>
                                    {categories.map((cate)=>(
                                        <>
                                            <option value={`${cate.id}`}>{cate.name}</option>
                                        </>
                                    ))}
                                </Field>
                                <br/>
                                <label>Điểm đạt</label>
                                <br/>
                                <Field type="number" name="passScore" />
                                <br/>
                                <label>Thời gian bài thi</label>
                                <br/>
                                <Field type="text" name="time" />
                                <br/>
                                <button type="submit" className="btn btn-secondary" disabled={!isValid}>submit</button>
                            </div>
                        </Form>
                    )}
            </Formik>
        </div>
    );
}

export default CreateExamForm;
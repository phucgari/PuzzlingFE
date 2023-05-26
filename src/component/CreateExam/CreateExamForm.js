import React from 'react';
import {Field, Form, Formik} from "formik";
import axios from "axios";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";

const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    category: Yup.object().shape({
        id: Yup.string().required()
    }),
    passScore:Yup.number().required().min(0).max(100),
    time:Yup.number().required().min(0),
    user:Yup.object().required()
})

function CreateExamForm(props) {
    const navigate = useNavigate();
    const [exam, setExam] = React.useState({
        name: "",
        category: {
            id: ""
        },

        user : {
            id:JSON.parse(localStorage.getItem('id'))
        }
    })
    const [categories, setCategories] = React.useState([])
    React.useEffect(() => {
        axios.get("http://localhost:8080/puzzling/categories/").then((response) => {
            setCategories(response.data)
        })
    }, [])
    return (
        <div className="container">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content rounded-modal shadow p-3 border-0" style={{marginTop: 6 + 'rem',backgroundColor:"#d5fdfd"}}>
                    <Formik
                        initialValues={exam}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            axios.post(`http://localhost:8080/puzzling/exam/create`, values)
                                .then((response) => {
                                    navigate('/exam/edit', {state: {id: response.data.id}});
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }}
                    >
                        {({isValid}) =>
                            (
                                <Form>
                                    <h1 style={{textAlign:"center",fontWeight:"bold"}} className="title,"> Tạo bài thi mới </h1>
                                    <hr/>
                                    <div className="container mt-5">
                                        <h4>Tiêu đề bài thi</h4>
                                        <Field name={`name`} className={"form-control textfield-rounded"}
                                               id={`name`}
                                               placeholder="Tên Bài thi"/>
                                        <br/>
                                        <h4>Danh mục bài thi</h4>
                                            <div
                                                className="form-group input-group w-100 animated wow fadeInDown delay-0-1s">
                                                <div className="input-group-prepend">
                                                </div>
                                                <Field as="select" name="category.id"
                                                       className={"form-control textfield-rounded"}>
                                                    <option value="">Vui lòng chọn</option>
                                                    {categories.map((cate) => (
                                                        <>
                                                            <option value={`${cate.id}`}>{cate.name}</option>
                                                        </>
                                                    ))}
                                                </Field>
                                            </div>
                                            <h4>Điểm đạt</h4>
                                        <div
                                            className="wrapper">
                                            <div className="input-group-prepend">
                                            </div>
                                            <Field type="number" name="passScore" className={"form-control textfield-rounded"}/>
                                        </div>
                                        <br/>
                                            <h4>Thời gian làm bài</h4>
                                        <div
                                            className="wrapper">
                                            <div className="input-group-prepend">
                                            </div>
                                            <Field type="text" name="time" className={"form-control textfield-rounded"}/>
                                        </div>
                                            <br/>
                                        <button type="submit" className="btn btn-success" disabled={!isValid}>Tạo bài thi
                                        </button>
                                    </div>
                                </Form>

                            )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default CreateExamForm;
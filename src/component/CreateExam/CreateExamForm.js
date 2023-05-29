import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên bài thi!!!"),
    category: Yup.object().shape({
        id: Yup.string().required()
    }),
    passScore: Yup.number().required("Vui lòng nhập điểm tối thiểu để qua bài thi!!!").min(1, "Điểm tối thiểu để qua bài thi phải lớn hơn 1").max(100, "Điểm tối đa để qua bài thi là 100 điểm!!!"),
    time: Yup.number().required("Vui lòng nhập thời gian làm bài thi!!!").min(1, "Thời gian làm bài phải hợp lệ!!!"),
    user: Yup.object().required()
})

function CreateExamForm(props) {
    const navigate = useNavigate();
    const [exam, setExam] = React.useState({
        name: "",
        category: {
            id: ""
        },

        user: {
            id: JSON.parse(localStorage.getItem('id'))
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
                <div className="modal-content rounded-modal shadow p-3 border-0"
                     style={{marginTop: 6 + 'rem', backgroundColor: "#bef6fd"}}>
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
                                    <h1 style={{textAlign: "center", fontWeight: "bold"}} className="title,"> Tạo bài
                                        thi mới </h1>
                                    <hr/>
                                    <div className="container mt-5">
                                        <label htmlFor={"name"} style={{fontSize: 18}}>Tiêu đề bài thi</label>
                                        <Field name={`name`} className={"form-control textfield-rounded"}
                                               id={`name`}
                                               placeholder="Tên Bài thi"
                                        />
                                        <span style={{color: "red", fontSize: 18 + "px"}}>
                                        < ErrorMessage name={'name'}/></span>
                                        <br/>
                                        <label htmlFor={"category"} style={{fontSize: 18}}>Danh mục bài thi</label>
                                        <div
                                            className="form-group input-group w-100 animated wow ">
                                            <div className="input-group-prepend">
                                            </div>
                                            <Field as="select" name="category.id"
                                                   className={"form-control textfield-rounded"}>
                                                <option value="" hidden>Vui lòng chọn</option>
                                                {categories.map((cate) => (
                                                    <>
                                                        <option value={`${cate.id}`}>{cate.name}</option>
                                                    </>
                                                ))}
                                            </Field>
                                        </div>

                                        <label htmlFor={"passScore"} style={{fontSize: 18}}>Điểm đạt</label>
                                        <div
                                            className="wrapper">
                                            <div className="input-group-prepend">
                                            </div>
                                            <Field type="number" name="passScore"
                                                   className={"form-control textfield-rounded"}
                                                   placeholder="Tối đa 100 điểm"/>
                                            <span style={{color: "red", fontSize: 18 + "px"}}>
                                                < ErrorMessage name={'passScore'}/></span>
                                        </div>
                                        <br/>
                                        <label htmlFor={"time"} style={{fontSize: 18}}>Thời gian làm bài</label>
                                        <div
                                            className="wrapper">
                                            <div className="input-group-prepend">
                                            </div>
                                            <Field type="text" name="time" className={"form-control textfield-rounded"}
                                                   placeholder="Nhập thời gian làm bài thi"/>
                                            <span style={{color: "red", fontSize: 18 + "px"}}>
                                                < ErrorMessage name={'time'}/></span>
                                        </div>
                                        <div style={{textAlign: "center"}}>
                                            <button type="submit" className="gradientBtn mt-4 animated wow fadeInUp
" disabled={!isValid}>Tạo bài thi
                                            </button>
                                        </div>
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
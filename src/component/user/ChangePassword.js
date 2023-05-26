import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import axios from "axios";
import * as Yup from "yup";

export default function ChangePassword() {
    const id = JSON.parse(localStorage.getItem("id"));
    const [password, setPassword] = useState({});
    const initialValues = {
        oldPassword: password || "",
        newPassword: "",
        confirmPassword:""
    }

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required("Không được để trống!")
            .test("password","Sai mật khẩu",async function (password) {
                return axios.get(`http://localhost:8080/puzzling/users/check/${id}?password=` + password)
                    .then(() => true)
                    .catch(() => false)
            }),
        newPassword: Yup.string().required("Không được để trống!")
            .min(6, "Tối thiểu là 6 ký tự!")
            .max(32,"Tối đa 32 ký tự!"),
        confirmPassword:Yup.string().required("Không được để trống!")
            .min(6, "Tối thiểu là 6 ký tự!")
            .max(32,"Tối đa 32 ký tự!")
            .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không trùng nhau!'),
    })

    useEffect(() => {
        axios
            .get(`http://localhost:8080/puzzling/users/${id}`)
            .then((response) => {
                setPassword(response.data.password);
            })
            .catch((error) => {
                console.log(error);
            });
    },[id]);
    return (
        <div className="modal fade mt-5" id="passModal" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog mt-5" role="document">
                <div className="modal-content rounded-modal shadow p-3" style={{marginTop: 4 + 'rem'}}>
                    <center>
                        <span className="loginSquare mt-n5">
                        <p className="text-white line-height-20 text-center ml-n2 mt-2 change-pass">
                            Đổi mật khẩu
                        </p>
                    </span>
                    </center>
                    <div className="modal-header border-0 p-0">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Formik initialValues={initialValues}
                                onSubmit= {handleChangePassword}
                                validationSchema={validationSchema}>
                            <Form>
                                <center>
                                    <div className="form-group input-group w-75 animated wow fadeInDown delay-0-1s">
                                        <Field type="text" name={"oldPassword"}
                                               className="form-control textfield-rounded shadow-sm p-3 mb-3 zIndex-1"
                                               id="oldPassword" placeholder="Mật khẩu cũ..."/>
                                        <div className="input-group-append z-Index-2">
                                        <span>
                                            <img src="/images/right-icon.png" className="ml-n6" alt={""}/>
                                            <i className="fa fa-key ml-n4-1 text-white"></i>
                                        </span>
                                        </div>
                                    </div>
                                    <div
                                        className="form-group input-group w-75 z-Index-2 animated wow fadeInDown delay-0-2s">
                                        <div className="input-group-prepend z-Index-2">
                                    <span>
                                        <img src="/images/left-icon.png" alt={""}/>
                                        <i className="fa fa-key ml-n4-2 text-white"></i>
                                    </span>
                                        </div>
                                        <Field type="text" name={"newPassword"}
                                               className="form-control textfield-rounded shadow-sm p-3 mb-3 zIndex-1"
                                               id="newPassword" placeholder="Mật khẩu mới..."/>
                                    </div>
                                    <div
                                        className="form-group input-group w-75 z-Index-2 animated wow fadeInDown delay-0-3s">
                                        <div className="input-group-prepend z-Index-2">
                                    <span>
                                        <img src="/images/left-icon.png" alt={""}/>
                                        <i className="fa fa-key ml-n4-2 text-white"></i>
                                    </span>
                                        </div>
                                        <Field type="text" name={"confirmPassword"}
                                               className="form-control textfield-rounded shadow-sm p-3 mb-4 zIndex-1"
                                               id="confirmPassword" placeholder="Xác nhận mật khẩu..."/>
                                    </div>
                                </center>
                                <center>
                                    <button type="submit"
                                            className="gradientBtn w-75 animated wow fadeInUp delay-0-4s">
                                        Lưu
                                    </button>
                                </center>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )

    function handleChangePassword(values) {
        axios.put("http://localhost:8080/puzzling/users/changePassword")
            .then((response) => {
                alert("Đổi mật khẩu thành công!")
            })
            .catch(() => {
                alert("Không  thành công!")
            })
    }
}
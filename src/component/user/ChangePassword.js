import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import axios from "axios";
import * as Yup from "yup";
import Swal from "sweetalert2";

export default function ChangePassword() {
    const id = JSON.parse(localStorage.getItem("id"));
    const initialValues = {
        oldPassword: "", newPassword: "", confirmPassword: ""
    }

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required("Không được để trống!")
            .test("oldPassword", "Sai mật khẩu", async function (password) {
                return axios.get(`http://localhost:8080/puzzling/users/check/${id}?password=` + password,
                    {
                        auth:JSON.parse(localStorage.getItem('auth'))
                    }
                    )
                    .then(() => true)
                    .catch(() => false)
            }),
        newPassword: Yup.string().required("Không được để trống!")
            .min(6, "Tối thiểu là 6 ký tự!")
            .max(32, "Tối đa 32 ký tự!"),
        confirmPassword: Yup.string().required("Không được để trống!")
            .min(6, "Tối thiểu là 6 ký tự!")
            .max(32, "Tối đa 32 ký tự!")
            .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không trùng nhau!'),
    })

    return (<div className="modal fade mt-5" id="passModal" tabIndex="-1" role="dialog"
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
                            onSubmit={handleChangePassword}
                            validationSchema={validationSchema}>
                        <Form>
                            <center>
                                <span style={{color: "red", fontSize: 14}}><ErrorMessage name={"oldPassword"}/></span>
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

                                <span style={{color: "red", fontSize: 14}}><ErrorMessage name={"newPassword"}/></span>
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

                                <span style={{color: "red", fontSize: 14}}><ErrorMessage
                                    name={"confirmPassword"}/></span>
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
    </div>)

    function handleChangePassword(values) {
        console.log(values)
        axios.put("http://localhost:8080/puzzling/users/changePassword/" + JSON.parse(localStorage.getItem("id")), values,
            {
                auth:JSON.parse(localStorage.getItem('auth'))
            }
            )
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Đổi mật khẩu thành công!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(r => r.isConfirmed)
            })
            .catch(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Không thành công!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(r => r.isDenied)
            })
    }
}

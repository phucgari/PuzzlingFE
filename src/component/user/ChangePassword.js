import {Field, Form, Formik} from "formik";
import {useEffect} from "react";

export default function ChangePassword() {
    const id = JSON.parse(localStorage.getItem("id"))

    useEffect(() => {

    })
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
                        <Formik initialValues={""} onSubmit={""} enableReinitialize={true}>
                            <Form>
                                <center>
                                    <div className="form-group input-group w-75 animated wow fadeInDown delay-0-1s">
                                        <Field type="password"
                                               className="form-control textfield-rounded shadow-sm p-3 mb-3 zIndex-1"
                                               id="recipient-name" placeholder="Old Password"/>
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
                                        <Field type="password"
                                               className="form-control textfield-rounded shadow-sm p-3 mb-3 zIndex-1"
                                               id="recipient-pass" placeholder="New Password"/>
                                    </div>
                                    <div
                                        className="form-group input-group w-75 z-Index-2 animated wow fadeInDown delay-0-3s">
                                        <div className="input-group-prepend z-Index-2">
                                    <span>
                                        <img src="/images/left-icon.png" alt={""}/>
                                        <i className="fa fa-key ml-n4-2 text-white"></i>
                                    </span>
                                        </div>
                                        <Field type="password"
                                               className="form-control textfield-rounded shadow-sm p-3 mb-4 zIndex-1"
                                               id="recipient-pass" placeholder="Confirm Password"/>
                                    </div>
                                </center>
                                <center>
                                    <button type="button"
                                            className="gradientBtn w-75 animated wow fadeInUp delay-0-4s">
                                        Save
                                    </button>
                                </center>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}
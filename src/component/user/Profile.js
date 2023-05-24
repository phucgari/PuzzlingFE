import {Link} from "react-router-dom";
import ChangePassword from "./ChangePassword";

export default function Profile() {
    return (
        <div className="container">
            {/*<div className="modal fade" id="" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"*/}
            {/*     aria-hidden="true" style={{display: "contents !important"}}>*/}
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content rounded-modal shadow p-3 border-0" style={{marginTop: 6 + 'rem'}}>
                            <img src="/images/user.png" id="profileImage" alt={""}
                                 className="user-profile shadow mx-auto img-fluid rounded-circle mt-n5 mb-1 animated wow pulse"/>
                            <input id="imageUpload" type="file" name="profile_photo" placeholder="Photo" required=""
                                   capture/>
                            {/*<h4 className="color-dark text-right mt-n4 animated wow fadeInUp">25,600</h4>*/}
                            <h5 className="color-light text-center animated wow fadeInDown delay-0-3s">Henna Leo</h5>
                            <h6 className="color-light text-center animated wow fadeInDown delay-0-4s">henna4@gmail.com</h6>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div
                                                className="form-group input-group w-100 animated wow fadeInDown delay-0-1s">
                                                <div className="input-group-prepend">
                                                    <span><img src="/images/left-icon.png" alt={""}/></span>
                                                </div>
                                                <input type="text" id="recipient-user" placeholder="Username"
                                                       className="form-control textfield-rounded shadow-sm mb-4 ml-n3"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div
                                                className="form-group input-group w-100 animated wow fadeInDown delay-0-2s">
                                                <div className="input-group-prepend">
                                                    <span><img src="/images/right-icon.png" className="rotate-180" alt={""}/></span>
                                                </div>
                                                <input type="text" id="recipient-mobile" placeholder="Mobile Number"
                                                       className="form-control textfield-rounded shadow-sm p-3 mb-4 ml-n3"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div
                                                className="form-group input-group w-100 animated wow fadeInDown delay-0-3s">
                                                <div className="input-group-prepend">
                                                    <span><img src="/images/right-icon.png" className="rotate-180" alt={""}/></span>
                                                </div>
                                                <input type="text" id="recipient-adress" placeholder="Address"
                                                       className="form-control textfield-rounded shadow-sm p-3 mb-4 ml-n3"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div
                                                className="form-group input-group w-100 animated wow fadeInDown delay-0-4s">
                                                <div className="input-group-prepend">
                                                    <span><img src="/images/left-icon.png" alt={""}/></span>
                                                </div>
                                                <input type="text" id="recipient-country" placeholder="Country"
                                                       className="form-control textfield-rounded shadow-sm p-3 mb-4 ml-n3"/>
                                            </div>
                                        </div>
                                    </div>
                                    <center>
                                        <button type="button" className="gradientBtn w-50 animated wow fadeInUp">Lưu</button>
                                    </center>
                                </form>
                            </div>
                            <div className="modal-footer border-0 mt-n4">
                                <center>
                                    <p className="text-center mt-3 animated wow fadeInUp">
                                        <Link to={""} data-toggle="modal" data-target="#passModal"
                                              data-whatever="" className="color-blue">
                                            Đổi mật khẩu
                                        </Link>
                                    </p>
                                </center>
                            </div>
                    </div>
                </div>
            {/*</div>*/}
            {/*Change Password Modal*/}
            <ChangePassword/>
        </div>
    )
}
import React, {useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Swal from 'sweetalert2/src/sweetalert2.js'
import * as Yup from 'yup'


function closeNav() {
    document.getElementById("mySidenav").style.cssText = "width:0; border:none; box-shadow: none;";
}

function openNav() {
    document.getElementById("mySidenav").style.cssText = "width:270px; border-right: 10px solid #fff; box-shadow: 1px 8px 8px 8px rgba(73,21,155,0.3); -webkit-box-shadow: 1px 8px 8px 8px rgba(73,21,155,0.3);  -moz-box-shadow: 1px 8px 8px 8px rgba(73,21,155,0.3);";
}

function SideNavBar(props) {
    const account = JSON.parse(localStorage.getItem("account"))
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const validation = Yup.object().shape({
        username: Yup.string().required("Không được để trống!").min(6, "Tối thiểu là 6 ký tự!!").max(32,"Tối đa 32 ký tự!")
            .test("username","Tên người dùng đã tồn tại",async function (username) {
                return axios.get("http://localhost:8080/puzzling/check/" + username).then(
                    () => true
                ).catch(
                    () => false
                )
            })
        ,
        password: Yup.string().required("Không được để trống!").min(6, "Tối thiểu là 6 ký tự!"),
        confirmPassword:Yup.string().required("Không được để trống!").min(6, "Tối thiểu là 6 ký tự!").max(32,"Tối đa 32 ký tự!").oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng nhau!'),
        user: Yup.object().shape({
            email:Yup.string().required("Không được để trống!")
        })

    })
    return (
        <div>
            {/*Side Bar*/}
            <div id="mySidenav" className="sidenav">
                <Link to={"javascript:void(0)"} className="closebtn " onClick={closeNav}>
                    <i className="fa fa-arrow-left" style={{marginRight:10, fontSize:25}}/>
                </Link>
                <Link to="/profile" className="">
                    <img
                        src="/images/user.png"
                        className="user-profile shadow img-fluid rounded-circle ml-3"
                        alt={""}/>
                </Link>
                {
                    account != null &&
                    (
                        <a href="" className="text-white text-left">
                            <small>
                                <p>{account.username}</p>
                            </small>
                        </a>
                    )
                }
                <Link to="/categories">
                    <i className="fa fa-th-large text-white mr-3"/>
                    Danh mục
                </Link>
                {
                    account != null && (
                        <Link to={"/exam/all"}>
                            <i className="fa fa-question text-white mr-3"/>
                            Xem bài Quiz
                        </Link>
                    )
                }
                <a href="category.html">
                    <i className="fa fa-question text-white mr-3"/>
                    Giải câu đố
                </a>
                <a href="quiz.html">
                    <i className="fa fa-random text-white mr-3"/>
                    Giải đố ngẫu nhiên
                </a>
                <a href="leaderboard.html">
                    <i className="fa fa-users text-white mr-3"/>
                    Bảng xếp hạng
                </a>
                <a href="score-history.html">
                    <i className="fa fa-history text-white mr-3"/>
                    Lịch sử thi
                </a>
                {
                    account != null && (
                        <Link to={"/profile"}>
                            <i className="fa fa-user-o text-white mr-3"/>
                            Thông tin cá nhân
                        </Link>
                    )
                }
                {
                    account != null && (
                        <a href="#" onClick={logout}>
                            <i className="fa fa-power-off text-white mr-3"/>
                            Đăng xuất
                        </a>
                    )
                }
            </div>
            {/*Nav Bar*/}
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <span className="menu" onClick={openNav}>
                        <img src="/images/menu.png" alt={""}/>
                    </span>
                    <a className="zIndex-1 ml-n5 mr-5" href="#">
                        <img
                            src="/images/logo.png" alt={""}
                            className="d-none d-sm-none d-md-block ml-n5 mr-5"
                        />
                    </a>
                    {account === null && <ul className="nav">
                        <li className="nav-item" onClick={openLogin}>
                            <a
                                className="nav-link text-white cursor-pointer"
                                style={{fontWeight:"bold"}}
                                // data-toggle="modal"
                                // data-target="#loginModal"
                                // data-whatever=""
                            >
                                Đăng nhập
                            </a>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link color-blue" href="#">
                                |
                            </span>
                        </li>
                        <li className="nav-item" onClick={openSignUp}>
                            <div
                                className="nav-link text-white cursor-pointer"
                                style={{fontWeight:"bold"}}
                                // data-toggle="modal"
                                // data-target="#signUpModal"
                                // data-whatever=""
                            >
                                Đăng ký
                            </div>
                        </li>
                    </ul>}
                    {account !== null}
                </div>
            </nav>
            {/*Login Modal*/}
            <div
                className="modal mt-5"
                id="loginModal"
                // tabIndex={-1}
                // role="dialog"
                // aria-labelledby="exampleModalLabel"
                // aria-hidden="true"
            >
                <div className="modal-dialog mt-5" role="document">
                    <div
                        className="modal-content rounded-modal shadow p-3"
                        style={{marginTop: "4rem"}}
                    >
                        <center>
                            <span className="loginSquare mt-n5">
                                <p className="text-white" id="exampleModalLabel">
                                    Đăng nhập
                                </p>
                            </span>
                        </center>
                        <div className="modal-header border-0 p-0">
                            <button onClick={closeLogin}
                                type="submit"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Formik initialValues={{
                                username: "",
                                password: ""
                            }}
                                    onSubmit={(values) => {
                                        login(values)
                                    }}
                            >
                                <Form>
                                    <center>
                                        <div className="form-group input-group w-75 animated wow fadeInDown delay-0-1s">
                                            <Field
                                                type="text"
                                                className="form-control textfield-rounded shadow-sm p-3 mb-3 zIndex-1"
                                                id="username"
                                                placeholder="Username"
                                                name="username"
                                            />
                                            <div className="input-group-append z-Index-2">
                                            <span>
                                                <img src="/images/right-icon.png" className="ml-n6" alt={""}/>
                                                <i className="fa fa-user-o ml-n4-1 text-white"/>
                                            </span>
                                            </div>
                                        </div>
                                        <div className="form-group input-group w-75 animated wow fadeInDown delay-0-2s">
                                            <div className="input-group-prepend z-Index-2">
                                            <span>
                                                <img src="/images/left-icon.png" alt={""}/>
                                                <i className="fa fa-key ml-n4-2 text-white"/>
                                            </span>
                                            </div>
                                            <Field
                                                type="password"
                                                className="form-control textfield-rounded shadow-sm p-3 mb-4 zIndex-1"
                                                id="password"
                                                placeholder="Password"
                                                name="password"
                                            />
                                        </div>
                                    </center>
                                    <center>
                                        <button
                                            type="submit"
                                            className="gradientBtn w-75 animated wow fadeInDown delay-0-3s"
                                        >
                                            Đăng nhập
                                        </button>
                                    </center>
                                    <p className="text-center color-blue mt-3 animated wow fadeInDown delay-0-3s">
                                        Hoặc
                                    </p>
                                </Form>
                            </Formik>
                        </div>
                        <div className="modal-footer border-0 mt-n4">
                            <center>
                                <button
                                    type="button"
                                    className="btn-lg social-login rounded-circle shadow mr-4 bg-white animated wow zoomIn delay-0-5s"
                                >
                                    <i className="fa fa-google google-icon"/>
                                </button>
                                <button
                                    type="button"
                                    className="social-login rounded-circle shadow bg-white animated wow zoomIn delay-0-6s"
                                >
                                    <i className="fa fa-facebook fb-icon"/>
                                </button>
                                <p className="text-center color-dark mt-3 animated wow fadeInUp delay-0-3s">
                                    Bạn chưa có tài khoản?{" "}
                                    <a onClick={openSignUp}
                                        // data-dismiss="modal"
                                        className="color-blue"
                                        // data-toggle="modal"
                                        // data-target="#signUpModal"
                                        // data-whatever=""
                                    >
                                        Đăng ký
                                    </a>{" "}
                                </p>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
            {/*Signup modal*/}
            <div
                className="modal mt-5"
                id="signUpModal"
                // tabIndex={-1}
                // role="dialog"
                // aria-labelledby="exampleModalLabel"
                // aria-hidden="true"
                // style={{opacity: "1"}}
            >
                <div className="modal-dialog modal-lg mt-5" role="document">
                    <div
                        className="modal-content rounded-modal shadow p-3"
                        style={{marginTop: "4rem"}}
                    >
                        <center>
                            <span className="loginSquare mt-n5">
                                <p className="text-white" id="exampleModalLabel">
                                    Đăng ký
                                </p>
                            </span>
                        </center>
                        <div className="modal-header border-0 p-0">
                            <button
                                onClick={closeSignUp}
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <Formik initialValues={{
                                username: "",
                                password: "",
                                confirmPassword: "",
                                user: {
                                    email: ""
                                },
                                role: {
                                    id: 2
                                }
                            }}
                                onSubmit={(values) => {
                                    signup(values)
                                }}

                                validationSchema={validation}
                            >
                                <Form>
                                    <center>
                                        <div className="row">
                                            <div
                                                className="col-lg-6 form-group input-group w-75 animated wow fadeInDown delay-0-1s">
                                                <div className="input-group-prepend z-Index-2">
                                                <span>
                                                    <img src="/images/left-icon.png" alt={""}/>
                                                    <i className="fa fa-user-o zIndex-2 ml-n4-2 text-white"/>
                                                </span>
                                                </div>
                                                <Field
                                                    type="text"
                                                    className="form-control textfield-rounded shadow-sm p-3 mb-4 zIndex-1"
                                                    id="username"
                                                    placeholder="Username"
                                                    name="username"/>
                                                < ErrorMessage name={'username'}/>
                                            </div>

                                            <div
                                                className="col-lg-6 form-group input-group w-75 animated wow fadeInDown delay-0-2s">
                                                <div className="input-group-prepend z-Index-2">
                                                <span>
                                                    <img src="/images/right-icon.png" className="rotate-180" alt={""}/>
                                                    <i className="fa fa-envelope zIndex-2 ml-n4-2 text-white rotate-n0"/>
                                                </span>
                                                </div>
                                                <Field
                                                    type="text"
                                                    className="form-control textfield-rounded shadow-sm p-3 mb-4 zIndex-1"
                                                    id="user.email"
                                                    placeholder="Email"
                                                    name="user.email"/>
                                                < ErrorMessage name={'email'}
                                                />
                                            </div>
                                            <div
                                                className="col-lg-6 form-group input-group w-75 animated wow fadeInDown delay-0-3s">
                                                <div className="input-group-prepend z-Index-2">
                                                <span>
                                                    <img src="/images/right-icon.png" className="rotate-180" alt={""}/>
                                                    <i className="fa fa-key rotate-n0 zIndex-2 ml-n4-2 text-white"/>
                                                </span>
                                                </div>
                                                <Field
                                                    type="password"
                                                    className="form-control textfield-rounded shadow-sm p-3 mb-4 zIndex-1"
                                                    id="password"
                                                    placeholder="Password"
                                                    name="password"/>
                                                < ErrorMessage name={'password'}
                                                />
                                            </div>
                                            <div
                                                className="col-lg-6 form-group input-group w-75 animated wow fadeInDown delay-0-4s">
                                                <div className="input-group-prepend z-Index-2">
                                                <span>
                                                    <img src="/images/left-icon.png" alt={""}/>
                                                    <i className="fa fa-key zIndex-2 ml-n4-2 text-white"/>
                                                </span>
                                                </div>
                                                <Field
                                                    type="password"
                                                    className="form-control textfield-rounded shadow-sm p-3 mb-4 zIndex-1"
                                                    id="confirmPassword"
                                                    placeholder="Confirm Password"
                                                    name="confirmPassword"/>
                                                <ErrorMessage name={'confirmPassword'}
                                                />
                                            </div>
                                        </div>
                                    </center>
                                    <center>
                                        <button
                                            // id={"btn-signup"}
                                            type="submit"
                                            className="gradientBtn w-75 animated wow fadeInUp delay-0-5s"
                                            // data-toggle="modal"
                                            // data-target="#loginModal"
                                            // data-dismiss="modal"
                                            // aria-label="Close"
                                        >
                                            Đăng ký
                                        </button>
                                    </center>
                                    <p className="text-center color-blue mt-3 animated wow fadeInUp delay-0-5s pb-5">
                                        Hoặc
                                    </p>
                                </Form>
                            </Formik>
                            <div className="modal-footer border-0 mt-n5">
                                <center>
                                    <button
                                        type="button"
                                        className="btn-lg social-login rounded-circle shadow mr-4 bg-white animated wow zoomIn delay-0-5s"
                                    >
                                        <i className="fa fa-google google-icon"/>
                                    </button>
                                    <button
                                        type="button"
                                        className="social-login rounded-circle shadow bg-white animated wow zoomIn delay-0-6s"
                                    >
                                        <i className="fa fa-facebook fb-icon"/>
                                    </button>
                                    <p className="text-center color-dark mt-3 animated wow fadeInUp delay-0-6s">
                                        Bạn đã có tài khoản?{" "}
                                        <a onClick={openLogin}
                                            // data-dismiss="modal"
                                           className="color-blue"
                                            // data-toggle="modal"
                                            // data-target="#signUpModal"
                                            // data-whatever=""
                                        >
                                            Đăng nhập
                                        </a>{" "}
                                    </p>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    function signup(values) {
        // alert("ok")
        axios.post('http://localhost:8080/puzzling/register', values).then(() => {
            closeSignUp()
        }).then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đăng ký thành công!',
                showConfirmButton: false,
                timer: 1500
            })
        })
            .catch(()=>{
                alert("Đăng ký không thành công!")
            })
    }

    function login(values) {
        axios.post('http://localhost:8080/puzzling/login', values)
            .then(response => {
                const { username, password, user } = response.data;
                const account = {
                    username: username,
                    password: password,
                    user: user
                };
                setIsLoggedIn(true);
                alert('Đăng nhập thành công.');
                localStorage.setItem('account', JSON.stringify(account));
            })
            .then(() => {
                closeLogin();
            })
            .catch(() => {
                alert('Sai tài khoản hoặc mật khẩu! Vui lòng thử lại');
            });
    }

    function logout() {
        localStorage.removeItem('account');
        setIsLoggedIn(false);
        alert('Đăng xuất thành công.');
        // openSignUp()
        window.location.reload()
    }

    function openSignUp(){
        document.getElementById("signUpModal").style.display = "block";
    }

    function closeSignUp() {
        document.getElementById("signUpModal").style.display = "none";

    }

    function closeLogin() {
        document.getElementById("loginModal").style.display = "none";
    }

    function openLogin() {
        document.getElementById("loginModal").style.display = "block";
    }
}

export default SideNavBar;
import React from 'react';
import {Field, Form, Formik} from "formik";

function closeNav() {
    document.getElementById("mySidenav").style.cssText = "width:0; border:none; box-shadow: none;";
}

function openNav() {
    document.getElementById("mySidenav").style.cssText = "width:270px; border-right: 10px solid #fff; box-shadow: 1px 8px 8px 8px rgba(73,21,155,0.3); -webkit-box-shadow: 1px 8px 8px 8px rgba(73,21,155,0.3);  -moz-box-shadow: 1px 8px 8px 8px rgba(73,21,155,0.3);";
}

function SideNavBar(props) {
    const [isSideNavOpen, setIsSideNavOpen] = React.useState(false)
    return (
        <div>
            {/*Side Bar*/}
            <div id="mySidenav" className="sidenav">
                <a href="javascript:void(0)" className="closebtn " onClick={closeNav}>
                    ×
                </a>
                <a href="profile.html" className="">
                    <img
                        src="images/user.png"
                        className="user-profile shadow img-fluid rounded-circle ml-3"
                    />
                </a>
                <a href="" className="text-white text-left">
                    <small>
                        <p>henna4@gmail.com</p>
                    </small>
                </a>
                <a href="category.html">
                    <i className="fa fa-th-large text-white mr-3"/>
                    Category
                </a>
                <a href="category.html">
                    <i className="fa fa-question text-white mr-3"/>
                    Play Quiz
                </a>
                <a href="quiz.html">
                    <i className="fa fa-random text-white mr-3"/>
                    Random Quiz
                </a>
                <a href="leaderboard.html">
                    <i className="fa fa-users text-white mr-3"/>
                    Leaderboard
                </a>
                <a href="score-history.html">
                    <i className="fa fa-history text-white mr-3"/>
                    Score History
                </a>
                <a href="profile.html">
                    <i className="fa fa-user-o text-white mr-3"/>
                    My Profile
                </a>
                <a href="#">
                    <i className="fa fa-power-off text-white mr-3"/>
                    Logout
                </a>
            </div>
            {/*Nav Bar*/}
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <span className="menu" onClick={openNav}>
                        <img src="/images/menu.png"/>
                    </span>
                    <a className="zIndex-1 ml-n5 mr-5" href="#">
                        <img
                            src="/images/logo.png"
                            className="d-none d-sm-none d-md-block ml-n5 mr-5"
                        />
                    </a>
                    <ul className="nav">
                        <li className="nav-item">
                            <a
                                className="nav-link text-white cursor-pointer"
                                data-toggle="modal"
                                data-target="#loginModal"
                                data-whatever=""
                            >
                                Login
                            </a>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link color-blue" href="#">
                                |
                            </span>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link text-white cursor-pointer"
                                data-toggle="modal"
                                data-target="#signUpModal"
                                data-whatever=""
                            >
                                SignUP
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            {/*Login Modal*/}
            <div
                className="modal fade mt-5"
                id="loginModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog mt-5" role="document">
                    <div
                        className="modal-content rounded-modal shadow p-3"
                        style={{marginTop: "4rem"}}
                    >
                        <center>
                            <span className="loginSquare mt-n5">
                                <p className="text-white" id="exampleModalLabel">
                                    Login
                                </p>
                            </span>
                        </center>
                        <div className="modal-header border-0 p-0">
                            <button
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
                            }}>
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
                                                <img src="/images/right-icon.png" className="ml-n6"/>
                                                <i className="fa fa-user-o ml-n4-1 text-white"/>
                                            </span>
                                            </div>
                                        </div>
                                        <div className="form-group input-group w-75 animated wow fadeInDown delay-0-2s">
                                            <div className="input-group-prepend z-Index-2">
                                            <span>
                                                <img src="/images/left-icon.png"/>
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
                                            type="button"
                                            className="gradientBtn w-75 animated wow fadeInDown delay-0-3s"
                                        >
                                            Login
                                        </button>
                                    </center>
                                    <p className="text-center color-blue mt-3 animated wow fadeInDown delay-0-3s">
                                        OR
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
                                    Don't have an account?{" "}
                                    <a
                                        href=""
                                        data-dismiss="modal"
                                        className="color-blue"
                                        data-toggle="modal"
                                        data-target="#signUpModal"
                                        data-whatever=""
                                    >
                                        Sign UP
                                    </a>{" "}
                                </p>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
            {/*Signup modal*/}
            <div
                className="modal fade mt-5"
                id="signUpModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg mt-5" role="document">
                    <div
                        className="modal-content rounded-modal shadow p-3"
                        style={{marginTop: "4rem"}}
                    >
                        <center>
                            <span className="loginSquare mt-n5">
                                <p className="text-white" id="exampleModalLabel">
                                    SignUp
                                </p>
                            </span>
                        </center>
                        <div className="modal-header border-0 p-0">
                            <button
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
                                username:"",
                                password:"",
                                confirmPassword:"",
                                user:{
                                    email:""
                                },
                                role:{
                                    id:2
                                }
                            }}>
                                <Form>
                                    <center>
                                        <div className="row">
                                            <div
                                                className="col-lg-6 form-group input-group w-75 animated wow fadeInDown delay-0-1s">
                                                <div className="input-group-prepend z-Index-2">
                                                <span>
                                                    <img src="/images/left-icon.png"/>
                                                    <i className="fa fa-user-o zIndex-2 ml-n4-2 text-white"/>
                                                </span>
                                                </div>
                                                <Field
                                                    type="text"
                                                    className="form-control textfield-rounded shadow-sm p-3 mb-4 zIndex-1"
                                                    id="username"
                                                    placeholder="Username"
                                                    name="username"
                                                />
                                            </div>
                                            <div
                                                className="col-lg-6 form-group input-group w-75 animated wow fadeInDown delay-0-2s">
                                                <div className="input-group-prepend z-Index-2">
                                                <span>
                                                    <img src="/images/right-icon.png" className="rotate-180"/>
                                                    <i className="fa fa-envelope zIndex-2 ml-n4-2 text-white rotate-n0"/>
                                                </span>
                                                </div>
                                                <Field
                                                    type="text"
                                                    className="form-control textfield-rounded shadow-sm p-3 mb-4 zIndex-1"
                                                    id="user.email"
                                                    placeholder="Email"
                                                    name="user.email"
                                                />
                                            </div>
                                            <div
                                                className="col-lg-6 form-group input-group w-75 animated wow fadeInDown delay-0-3s">
                                                <div className="input-group-prepend z-Index-2">
                                                <span>
                                                    <img src="/images/right-icon.png" className="rotate-180"/>
                                                    <i className="fa fa-key rotate-n0 zIndex-2 ml-n4-2 text-white"/>
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
                                            <div
                                                className="col-lg-6 form-group input-group w-75 animated wow fadeInDown delay-0-4s">
                                                <div className="input-group-prepend z-Index-2">
                                                <span>
                                                    <img src="/images/left-icon.png"/>
                                                    <i className="fa fa-key zIndex-2 ml-n4-2 text-white"/>
                                                </span>
                                                </div>
                                                <Field
                                                    type="text"
                                                    className="form-control textfield-rounded shadow-sm p-3 mb-4 zIndex-1"
                                                    id="confirmPassword"
                                                    placeholder="Confirm Password"
                                                    name="confirmPassword"
                                                />
                                            </div>
                                        </div>
                                    </center>
                                    <center>
                                        <button
                                            type="submit"
                                            className="gradientBtn w-75 animated wow fadeInUp delay-0-5s"
                                        >
                                            Sign UP
                                        </button>
                                    </center>
                                    <p className="text-center color-blue mt-3 animated wow fadeInUp delay-0-5s pb-5">
                                        OR
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
                                        Already have an account?{" "}
                                        <a
                                            href=""
                                            data-dismiss="modal"
                                            className="color-purple"
                                            data-toggle="modal"
                                            data-target="#loginModal"
                                            data-whatever=""
                                        >
                                            Login
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
}

export default SideNavBar;
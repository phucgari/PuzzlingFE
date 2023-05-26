import React from 'react';
import {useNavigate} from "react-router-dom";

function HomePage(props) {
    const navigate = useNavigate();
    return (
        <div>
            <div className="container-fluid mt-5 mb-5">
                <div className="row">
                    <div className="col-lg-1"/>
                    <div className="col-lg-5">
                        <h1 className="color-blue mt-5 animated wow fadeInDown delay-0-1s">
                            Quiz
                        </h1>
                        <p className="animated wow fadeInDown delay-0-2s">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
                            voluptates rerum eveniet sapiente repellat esse, doloremque quod
                            recusandae deleniti nostrum assumenda vel beatae sed aut modi nesciunt
                            porro quisquam voluptatem.
                        </p>
                        <a onClick={() => navigate("/categories")}>
                            <button className="gradientBtn animated wow fadeInUp delay-0-3s">
                                Play Quiz
                            </button>
                        </a>
                    </div>
                    <div className="col-lg-1"/>
                    <div className="col-lg-5">
                        <img
                            src="/images/right-img.png"
                            className="img-fluid animated wow pulse slow infinite"
                        />
                    </div>
                </div>
                <div className="float-left ml-5">
                    <img
                        src="/images/bottom-img.png"
                        className="img-fluid animated wow swing slower infinite"
                    />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
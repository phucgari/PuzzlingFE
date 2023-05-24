import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

export default function Exam() {
    const [exam, setExam] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
            axios.get(`http://localhost:8080/puzzling/exam/list?username=${JSON.parse(localStorage.getItem("account")).username}`)
                .then((response) => {
                    setExam(response.data)
                })
                .catch((error) => {
                    console.log(error.message)
                })
        },[]
    )
    return (
        <div className="container">
            <div className="row">
                {
                    exam.map((item) => (
                        <a onClick={() => navigate("/exam/edit", {state:{id:item.id}})}>
                            <div
                                className="col-auto col-centered animated wow jackInTheBox slow"
                                data-toggle="modal"
                                data-target="#subCateModal"
                                key={item.id}
                            >
                                <div className="box-part text-center shadow">
                                    <div className="title mt-4">
                                        <h4>{item.name}</h4>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))
                }
                <div
                    className="col-auto col-centered animated wow jackInTheBox slow"
                    data-toggle="modal"
                    data-target="#subCateModal"
                >
                    <div className="box-part text-center shadow">
                        <Link to={"/exam/create"} style={{fontSize:70, fontWeight:"bold", textDecoration:"none"}}>+</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
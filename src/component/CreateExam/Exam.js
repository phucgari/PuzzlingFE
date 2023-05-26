import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

export default function Exam() {
    const id = JSON.parse(localStorage.getItem("id"));
    const [exam, setExam] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
            axios.get(`http://localhost:8080/puzzling/exam/list?user=${id}`)
                .then((response) => {
                    setExam(response.data)
                })
                .catch((error) => {
                    console.log(error.message)
                })
        }, []
    )
    return (
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content rounded-modal shadow p-3 border-0"
                 style={{marginTop: 6 + 'rem', backgroundColor: "#d5fdfd"}}>
                <div className="container">
                    <div style={{textAlign: "center"}}
                        // className="col-auto col-centered animated wow jackInTheBox slow"
                        // data-toggle="modal"
                        // data-target="#subCateModal"
                    >
                        <button>
                            <Link to={"/exam/create"} style={{fontSize: 20}}>Tạo bài thi mới</Link>
                        </button>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                    <div className="table-light col-12">
                        <div className="wrapper">

                            {
                                exam.map((item) => (
                                    <div
                                        key={item.id}
                                    >Bai thi {item.id}
                                        <br/>
                                        <button onClick={() => navigate("/exam/edit", {state: {id: item.id}})}>

                                            <div>
                                                <h4>{item.name}</h4>
                                                <hr/>
                                            </div>
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
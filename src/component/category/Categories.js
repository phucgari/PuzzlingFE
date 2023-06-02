import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

export default function Categories({ isQuizPage }) {
    localStorage.setItem("isQuizPage", JSON.stringify(isQuizPage));
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
            axios.get("http://localhost:8080/puzzling/categories/")
                .then((response) => {
                    setCategories(response.data)
                })
                .catch((error) => {
                    navigate(`/${error.response.status}`)
                })
        }, []
    )
    return (
        <div className="container">
            <div className="row">
                {
                    categories.map((item) => (
                        <div
                            className="col-auto col-centered animated wow jackInTheBox slow"
                            data-toggle="modal"
                            data-target="#subCateModal"
                            key={item.id}
                        >
                            <Link to={`/category/${item.id}`} >
                                <div className="box-part text-center shadow">
                                    <img
                                        src={item.picture}
                                        className="img-fluid mx-auto d-block animated wow jello slow infinite"
                                        alt="..."
                                    />
                                    <div className="title mt-4">
                                        <h4>{item.name}</h4>
                                    </div>
                                </div>
                            </Link>

                        </div>
                    ))
                }
                {!isQuizPage && (
                    <div
                        className="col-auto col-centered animated wow jackInTheBox slow"
                        data-toggle="modal"
                        data-target="#subCateModal"
                    >
                        <div className="box-part text-center shadow">
                            <Link to={"/createCategory"}
                                  style={{fontSize: 70, fontWeight: "bold", textDecoration: "none"}}>+</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
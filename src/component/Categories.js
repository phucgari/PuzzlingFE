import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
            axios.get("http://localhost:8080/puzzling/categories")
                .then((response) => {
                    setCategories(response.data)
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
                    categories.map((item) => (
                        <div
                            className="col-auto col-centered animated wow jackInTheBox slow"
                            data-toggle="modal"
                            data-target="#subCateModal"
                            key={item.id}
                        >
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
                        </div>
                    ))
                }
                <div
                    className="col-auto col-centered animated wow jackInTheBox slow"
                    data-toggle="modal"
                    data-target="#subCateModal"
                >
                    <div className="box-part text-center shadow">
                        <Link to={"/createCategory"} style={{fontSize:70, fontWeight:"bold", textDecoration:"none"}}>+</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
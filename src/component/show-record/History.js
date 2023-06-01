import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Pagination from "../searchAddQuestion/Pagination";
 function History() {
    const [record, setRecord] = useState([]);
    const id = JSON.parse(localStorage.getItem("id"));
    const navigate = useNavigate();

    useEffect(() => {
            axios.get(`http://localhost:8080/puzzling/record/findRecordByUser/${id}`)
                .then((response) => {
                    setRecord(response.data)
                })
                .catch((error) => {
                    console.log(error.message)
                })
        }, [id]
    )
    return (
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content rounded-modal shadow p-4 border-0"
                 style={{ backgroundColor: "#bef6fd"}}>
                <div
                    className={'row'}
                >
                </div>
                <div>
                </div>
                <br/>
                <div className="container table-light rounded-modal">
                    <div className=" col-12 container">
                        <div className="row gy-5">

                            {
                                record.map((item) => (
                                    <div className={"col col-4 p-3 bg-lightblue"} style={{display:"flex",justifyContent:"center"}}
                                         key={item.id}
                                    >
                                        <button className={"btn btn-outline-dark"} style={{width:"300px"}}
                                                onClick={() => navigate("/record/"+item.id)}>
                                            <h4 style={{fontWeight: "bold"}}> Bài thi số: {item.exam.id}</h4>
                                            <hr/>
                                            <div>
                                                <h5>Tên bài thi: {item.exam.name}</h5>
                                                Thời gian ghi nhận: {item.time}
                                                <br/>
                                                Điểm của bạn: {item.userPoint}%
                                                <br/>
                                                Người tạo: {item.user.name}
                                                <br/>
                                            </div>
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
            </div>
        </div>
    );
}
export default History;
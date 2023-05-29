import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Pagination from "../searchAddQuestion/Pagination";

export default function Exam() {
    const id = JSON.parse(localStorage.getItem("id"));
    const [exam, setExam] = useState([]);
    const navigate = useNavigate();
    // const [currentPage, setCurrentPage] = useState(1);
    // const [ElementPerPage] = useState(6)
    // const [selectQuestionToAdd, setSelectQuestionToAdd] = useState({elements: []})
    // const paginate = pageNumber => setCurrentPage(pageNumber);

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
            <div className="modal-content rounded-modal shadow p-4 border-0"
                 style={{ backgroundColor: "#bef6fd"}}>
                <div
                    className={'row'}
                >
                    <div className={'col-lg-11'} style={{textAlign: "center"}}>
                    <h2 style={{fontWeight: "bold"}}>
                        Danh sách bài thi
                        <br/>
                        <small className="text-muted">Chọn bài thi bạn muốn tham gia</small>
                    </h2></div>
                    <div className=" text-center col-lg-1" style={{float:"right",paddingRight:"50px"}}>
                        <Link to={"/exam/create"}>
                            <i className={"fa fa-plus-circle"} style={{fontSize:60}}></i>
                        </Link>
                    </div>
                </div>
                <div>
                </div>
                <br/>
                <div className="container table-light rounded-modal">
                    <div className=" col-12 container">
                        <div className="row gy-5">

                            {
                                exam.map((item) => (
                                    <div className={"col col-4 p-3 bg-lightblue"} style={{display:"flex",justifyContent:"center"}}
                                         key={item.id}
                                    >
                                        <button className={"btn btn-outline-dark"} style={{width:"300px"}}
                                                onClick={() => navigate("/exam/edit", {state: {id: item.id}})}>
                                            <h4 style={{fontWeight: "bold"}}> Bài thi số: {item.id}</h4>
                                            <hr/>
                                            <div>
                                                <h5>Tên bài thi: {item.name}</h5> Thời gian làm bài: {item.time} <br/> Điểm
                                                tối thiểu: {item.passScore} <br/> Người tạo: {item.user.name}
                                            </div>
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                {/*<Pagination*/}
                {/*    elementPerPage={ElementPerPage}*/}
                {/*    totalElements={selectQuestionToAdd.elements.length}*/}
                {/*    paginate={paginate}*/}
                {/*/>*/}
                <br/>
                <br/>
            </div>
        </div>
    );
}
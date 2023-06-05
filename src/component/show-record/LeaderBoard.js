import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";

function LeaderBoard() {
    const {examId} = useParams();
    const [leaderBoard, setLeaderBoard] = useState([])
    console.log(leaderBoard)
    useEffect(() => {
            axios.get("http://localhost:8080/puzzling/record/leaderboard/" + examId)
                .then((response) => {
                    setLeaderBoard(response.data)
                })
                .catch((error) => {
                    console.log(error.message)
                })
        }, []
    )
    return (
        <div className={"container"}>
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content rounded-modal shadow p-4 border-0"
                     style={{backgroundColor: "#bef6fd"}}
                >
                    <div className={"mt-4 mb-3"} style={{textAlign:"center",fontWeight: "bold"}}>
                    <h1>Bảng Xếp Hạng</h1>
                    </div>

                    {
                        leaderBoard.map((item, index) => (
                            <div  key={item.id}>
                                <div className="container">
                                    <div className="col-auto col-centered leaderboard table-responsive">
                                        <table className="table">
                                            <tbody>
                                            <tr className="shadow bg-white animated wow fadeInDown delay-0-3s">
                                                <th scope="row" className="color-blue col-3">{index + 1}</th>
                                                <td><img src={item.picture}
                                                         className="rounded-circle bg-green ranker-profile "/></td>
                                                <td className={"col-3"}>
                                                    <h6 className="text-dark">{item.username}</h6>
                                                </td>
                                                <td className={"col-3"}>
                                                    <h5 className="color-purple"><b>{item.score}</b></h5>
                                                </td>
                                                <td className={"col-3"}>
                                                    <h5><Link to={`/record/+${item.recordId}`}><img src="/images/leaderboard/trophy.png"/></Link>
                                                    </h5>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    );
}

export default LeaderBoard;
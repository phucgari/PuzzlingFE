import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

function LeaderBoard(props) {
    const {examId} = useParams();
    const {record} = props
    const [index, setIndex] = useState(0);
    const [leaderBoard, setLeaderBoard] = useState([])
    useEffect(() => {
        setIndex(prevIndex => prevIndex + 1);
        axios.get("http://localhost:8080/puzzling/record/leaderboard/"+ examId)
                .then((response) => {
                    setLeaderBoard(response.data)
                })
                .catch((error) => {
                    console.log(error.message)
                })
        }, [examId]
    )
    return (
        <div>
            {
                leaderBoard.map((item) =>(
                    <div className="light-bg home-bg"  key={item.id}>
                        <div className="container">
                            <div className="col-auto col-centered leaderboard table-responsive">
                                <table className="table">
                                    <tbody>
                                    <tr className="shadow bg-white animated wow fadeInDown delay-0-3s">
                                        <th scope="row" className="color-blue">{index}</th>
                                        <td><img src={item.picture}
                                                 className="rounded-circle bg-green ranker-profile"/></td>
                                        <td>
                                            <h6 className="text-dark">{item.username}</h6>
                                        </td>
                                        <td>
                                            <h5 className="color-purple"><b>{item.record.userPoint}</b></h5>
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
    );
}

export default LeaderBoard;
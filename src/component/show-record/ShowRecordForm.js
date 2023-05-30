import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import Render1RecordDetail from "./Render1Record";
import RecordSumary from "./RecordSumary";

function ShowRecordForm(props) {
    const { recordId } = useParams();
    const [record,setRecord]=useState({
        time:"",
        recordDetail:[
            {
                answers: [],
                question:{
                    name:""
                }
            }
        ],
        user:{},
        exam:{
            name:"",
            passScore: 0
        },
        userPoint:0,
        examPoint:0
    })
    useEffect(()=>{
        axios.get("http://localhost:8080/puzzling/record/"+recordId).then(
            (response)=>setRecord(response.data)
        )
    },[])
    return (
        <div className="container">
            <RecordSumary
                record={record}
            />
            {
                record.recordDetail.map((recordDetailElement)=>
                    <Render1RecordDetail
                        recordDetailElement={recordDetailElement}
                    />
                )
            }
        </div>
    );
}

export default ShowRecordForm;
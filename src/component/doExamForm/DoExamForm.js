import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import Render1Question from "./Render1Question";

function DoExamForm(props) {
    const { examId } = useParams();
    const[exam,setExam]= React.useState({
        id:"",
        name:"",
        time:10,
        passScore:0,

    });
    const[currentIndex,setCurrentIndex]=React.useState(0);
    useEffect(()=>{
        axios.get(`http://localhost:8080/puzzling/exam/info?examId=${examId}`)
            .then((response) => {
                setExam(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    },[examId])
    console.log(exam)
    return (
        <div>
            <Render1Question
                questions={exam.questions}
                currentIndex={currentIndex}
            />
            {currentIndex!==exam.questions.length &&<button type="button" onClick={() => setCurrentIndex((cur) => ++cur)} className="btn btn-primary">
                nextQuestion
            </button>}
            {currentIndex!==0 && <button type="button" onClick={()=>setCurrentIndex((cur)=>--cur)} className="btn btn-primary">
                prevQuestion
            </button>}
        </div>
    );
}

export default DoExamForm;
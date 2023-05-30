import React from 'react';

function RecordSumary(props) {
    const{record}=props
    let percentPoint=Math.round(record.userPoint/record.examPoint*100)
    let pass=percentPoint>=record.exam.passScore
    return (
        <div>
            <div className="row" >
                <div className="col">
                    Tên bài thi
                </div>
                <div className="col">
                    {record.exam.name}
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    Người thực hiện
                </div>
                <div className="col">
                    {record.user.name}
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    Thời điểm ghi nhận
                </div>
                <div className="col">
                    {record.time}
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    Tổng điểm bài thi
                </div>
                <div className="col">
                    {record.examPoint}
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    Điểm người dùng
                </div>
                <div className="col">
                    {record.userPoint}
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    Kết quả
                </div>
                <div className="col">
                    {percentPoint}%
                    {pass?"Đạt":"Không đạt"}
                </div>
            </div>
        </div>
    );
}

export default RecordSumary;
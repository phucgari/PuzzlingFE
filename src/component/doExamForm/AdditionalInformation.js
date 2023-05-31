import React from 'react';
import QuestionPaging from "./AdditionalInformation/QuestionPaging";

function AdditionalInformation(props) {
    const {formik, currentIndex, setCurrentIndex} = props
    return (
        <div style={{display:"flex", justifyContent:"center"}}>
            <QuestionPaging
                formik={formik}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
            />
        </div>
    );
}

export default AdditionalInformation;
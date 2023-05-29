import React from 'react';
import AuthorAndLevel from "./AdditionalInformation/AuthorAndLevel";
import QuestionPaging from "./AdditionalInformation/QuestionPaging";
import Clock from "./AdditionalInformation/Clock";

function AdditionalInformation(props) {
    const{formik,currentIndex,setCurrentIndex}=props
    return (
        <div>
            <AuthorAndLevel
                formik={formik}
                currentIndex={currentIndex}
            />
            <QuestionPaging
                formik={formik}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
            />
            <Clock
                formik={formik}
            />
        </div>
    );
}

export default AdditionalInformation;
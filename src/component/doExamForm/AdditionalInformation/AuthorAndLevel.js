import React from 'react';

function AuthorAndLevel(props) {
    const{formik,currentIndex}=props
    const author=formik.values.exam.user
    const level=formik.values.exam.questions[currentIndex].level
    return (
        <div>
            {level}
        </div>
    );
}

export default AuthorAndLevel;
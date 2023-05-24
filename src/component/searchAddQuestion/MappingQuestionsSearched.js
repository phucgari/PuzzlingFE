import React from 'react';

const MappingQuestionsSearched = ({ questions, loading }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <ul className='list-group mb-4'>
            {questions.map(question => (
                <li key={question.id} className='list-group-item'>
                    {question.title}
                </li>
            ))}
        </ul>
    );
};

export default MappingQuestionsSearched;
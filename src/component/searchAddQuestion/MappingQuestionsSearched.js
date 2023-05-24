import React from 'react';

const MappingQuestionsSearched = ({ questions }) => {

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
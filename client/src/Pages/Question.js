import React from 'react';

const Question = ({ question }) => {
    return (
        <div>
            <h2>{question.questionText}</h2>
            {question.options.map((option, index) => (
                <div key={index}>
                    {/* Display image using base64 string */}
                    <img src={`data:image/png;base64,${option.image_base64}`} alt={`Option ${index + 1}`} />
                    {/* <p>{option.text}</p> */}
                </div>
            ))}
        </div>
    );
};


export default Question;

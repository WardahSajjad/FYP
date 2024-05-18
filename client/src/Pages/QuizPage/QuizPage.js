import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDesktop, faTabletAlt, faMobileAlt, faSearch, faMapMarkerAlt, faMobile } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../../Componenets/SideBar/SideBar.js';
import './QuizPage.css'; // Ensure you have this CSS file

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOptionIndices, setSelectedOptionIndices] = useState([]);
    const [quizEnded, setQuizEnded] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_FLASK_API_URL}/get_questions`)
            .then(response => {
                setQuestions(response.data);
                // Initialize the array with null values for each question
                setSelectedOptionIndices(new Array(response.data.length).fill(null));
            })
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

    const handleRetakeQuiz = () => {
        setCurrentQuestionIndex(0); // Reset current question index to 0
        setSelectedOptionIndices([]); // Clear selected options
        setScore(0); // Reset score
        setQuizEnded(false); // Set quizEnded back to false
    };

    const handleOptionClick = (optionIndex) => {
        let newSelectedOptionIndices = [...selectedOptionIndices];
        newSelectedOptionIndices[currentQuestionIndex] = optionIndex;
        setSelectedOptionIndices(newSelectedOptionIndices);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Here, instead of calculating score in each click, calculate at the end of the quiz

            setQuizEnded(true);
            submitAnswers();
        }
    };



    const submitAnswers = () => {
        // Map your selectedOptionIndices to the format expected by the backend
        const answers = selectedOptionIndices.map((optionIndex, questionIndex) => ({
            question_id: questions[questionIndex]._id,
            selected_option_index: optionIndex, // This should match the backend expectation
        }));

        axios.post(`${process.env.REACT_APP_FLASK_API_URL}/submit_answers`, { answers })
            .then(response => {
                setScore(response.data.score);
                setQuizEnded(true); // Ensure you mark the quiz as ended here
            })
            .catch(error => console.error('Error submitting answers:', error));
    };


    const getFeedback = () => {
        const percentage = (score / questions.length) * 100;
        if (percentage >= 80) {
            return 'Excellent!';
        } else if (percentage >= 60) {
            return 'Good job!';
        } else if (percentage >= 40) {
            return 'You can do better!';
        } else {
            return 'Looks like you need some more practice.';
        }
    };

    return (
        <div className="page-container">
            <SideBar />

            <div className="main-content" >

                <div className="quiz-container">
                    {!quizEnded ? (
                        questions.length > 0 && currentQuestionIndex < questions.length ? (
                            <div className="question-container">
                                <h3>Question {currentQuestionIndex + 1}/{questions.length}: {questions[currentQuestionIndex].questionText}</h3>
                                <div className="options-container">
                                    {questions[currentQuestionIndex].options.map((option, index) => (
                                        <div
                                            key={`${currentQuestionIndex}-${index}`} // Ensure keys are unique
                                            className={`option-container ${selectedOptionIndices[currentQuestionIndex] === index ? 'selected' : ''}`}
                                            onClick={() => handleOptionClick(index)}
                                        >
                                            <img src={`data:image/png;base64,${option.image_base64}`} alt={option.text} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                        </div>
                                    ))}
                                </div>
                                <button className='next-btn' onClick={handleNext} disabled={selectedOptionIndices[currentQuestionIndex] === null}>{currentQuestionIndex === questions.length - 1 ? 'Done' : 'Next'}</button>
                            </div>
                        ) : (
                            <p>Loading questions...</p>
                        )
                    ) : (
                        <div className="quiz-summary" style={{ border: '2px solid #ccc', borderRadius: '10px', padding: '20px', margin: '20px auto', maxWidth: '600px', textAlign: 'center' }}>
                            <h2>Your Score: {score} out of {questions.length}</h2>
                            <p>{getFeedback()}</p>

                            <button className='next-btn' onClick={handleRetakeQuiz}>Retake Quiz</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizPage;



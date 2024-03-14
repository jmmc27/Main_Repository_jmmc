import React, { useState } from 'react';
import "../i_examPage.css";
import 'bootstrap/dist/js/bootstrap.js';
import "bootstrap/dist/css/bootstrap.min.css";

export default function ExamContent() {
    const [questionCount, setQuestionCount] = useState(1); // Initial question count

    const handleAddQuestion = () => {
        setQuestionCount(prevCount => prevCount + 1); // Increment question count
    };

    // Function to render the childExamContent based on the question count
    const renderQuestions = () => {
        let questions = [];
        for (let i = 0; i < questionCount; i++) {
            questions.push(
                <div key={i} className="childExamContent rounded-3">
                    {/* Your existing input fields for question and choices */}
                    {/* Add any necessary input fields for questions and choices */}
                </div>
            );
        }
        return questions;
    };

    return (
        <div id="outerContainer">
            <div id="parentExamContent">
                <div className="examDescription lh-base">QUIZ EDITOR</div>
                <hr />
                <div id="childExamContent" className="rounded-3">

                    <div className="input-group flex-nowrap justify-content-center" id="inputQuizTitle">  {/* INPUT TITLE */}
                        <span className="input-group-text" id="addon-wrapping">TITLE</span>
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
                    </div>

                    <div id="questionContainer">

                        <div className="input-group flex-nowrap justify-content-center" id="inputQuizQuestion"> {/* INPUT QUESTION */}
                            <span className="input-group-text" id="addon-wrapping">QUESTION</span>
                            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
                        </div>

                        <div className="input-group" id="inputQuizChoices1">
                            <div className="input-group-text">
                                <input className="form-check-input mt-0" type="radio" name="quizOption" value="1" aria-label="Radio button for following text input" />
                            </div>
                            <input type="text" className="form-control" aria-label="Text input with radio button" />
                        </div>
                        <div className="input-group" id="inputQuizChoices2">
                            <div className="input-group-text">
                                <input className="form-check-input mt-0" type="radio" name="quizOption" value="2" aria-label="Radio button for following text input" />
                            </div>
                            <input type="text" className="form-control" aria-label="Text input with radio button" />
                        </div>
                        <div className="input-group" id="inputQuizChoices3">
                            <div className="input-group-text">
                                <input className="form-check-input mt-0" type="radio" name="quizOption" value="3" aria-label="Radio button for following text input" />
                            </div>
                            <input type="text" className="form-control" aria-label="Text input with radio button" />
                        </div>
                        <div className="input-group" id="inputQuizChoices4">
                            <div className="input-group-text">
                                <input className="form-check-input mt-0" type="radio" name="quizOption" value="4" aria-label="Radio button for following text input" />
                            </div>
                            <input type="text" className="form-control" aria-label="Text input with radio button" />
                        </div>

                    </div>
                    <hr />
                </div>

                <div id="btnContainer">
                    <button id="btnAddQuestion" className="btn" onClick={handleAddQuestion}>
                        Add Question
                    </button>
                </div>

                {/* Render additional childExamContent based on question count */}
                {renderQuestions()}
            </div>
        </div>
    );
}

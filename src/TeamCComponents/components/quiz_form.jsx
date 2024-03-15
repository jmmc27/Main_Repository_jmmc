import { Link, useParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { data } from "../data/quiz_content_data";
import axios from "axios";

import "../css/quizform_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CourseContext } from "./../../TeamBComponents/components/context/CourseContext";

function TeamC_QuizForm_Component() {
  {
    /* FOR QUIZ QUESTIONS */
  }
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [userAnswers, setUserAnswers] = useState([]);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array = [option1, option2, option3, option4];
  {
    /* END FOR QUIZ QUESTIONS */
  }

  {
    /* VALIDATORS */
  }
  const checkAns = (e, answer) => {
    if (lock === false) {
      // Remove previous styling from all options
      option_array.map((option) => {
        option.current.classList.remove("selected");
        return null;
      });

      // Add selected styling to the clicked option
      e.target.classList.add("selected");

      // Update the user's choice in a temporary variable
      const userChoice = { question: question.question, answer };

      // Check if the user has already answered this question
      const answeredQuestionIndex = userAnswers.findIndex(
        (userAnswer) => userAnswer.question === userChoice.question
      );

      if (answeredQuestionIndex === -1) {
        // If the user hasn't answered this question, update userAnswers
        setUserAnswers((prevAnswers) => [...prevAnswers, userChoice]);
      }
    }
  };
  {
    /* FOR THE NEXT BUTTON */
  }
  const next = () => {
    if (lock === false) {
      // Check if the user's answer for the current question is correct and update the score
      if (userAnswers[index]?.answer === question.answer) {
        setScore((prev) => prev + 1);
      }

      // Check if there is a next question
      if (index + 1 < data.length) {
        // Update the question and set the lock
        setIndex((prevIndex) => prevIndex + 1);
        setQuestion(data[index + 1]);
        setLock(false);

        // Remove styling from all options
        option_array.map((option) => {
          option.current.classList.remove("selected");
          return null;
        });
      } else {
        // No more questions, set the result
        setResult(true);
      }
    }
  };

  const reset = () => {
    window.location.reload();
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    result(false);
  };
  {
    /* END OF VALIDATORS */
  }

  return (
    <>
      {/* BACK BUTTON HERE */}
      <Link
        to="/teamcdashboard"
        className="buttonReturn d-flex align-items-center c_chapter_returncontainer"
        style={{ textDecoration: "none", color: "black", width: "fit-content" }}
      >
        <div
          className="d-flex align-items-center"
          style={{ marginTop: "1rem" }}
        >
          <div>
            <img
              src="../../src/assets/TeamCassets/green_button.png"
              className="btnReturn c_chapter_return"
              alt="return-icon"
              style={{
                transition: "transform .1s",
                color: "#ffffff",
                marginLeft: "1rem",
                width: "2rem",
                height: "2rem",
              }}
            />
          </div>
          <span
            className="returnTitle c_chapter_returnText"
            style={{
              marginLeft: "0.5rem",
              color: "#126912",
              fontSize: "1.5rem",
              marginTop: "0rem",
            }}
          >
            Back
          </span>
        </div>
      </Link>

      {/* MAIN LAYOUT */}
      <main
        className="c_chapcourse_mainlayout"
        style={{
          marginTop: "1.5rem",
          marginLeft: "10rem",
          marginRight: "10rem",
        }}
      >
        {/* START OF TOPIC CONTAINER */}
        <div>
          <div className="container">
            <p style={{ fontSize: "2.5rem" }}>QUIZ TITLE</p>
            <br />
            <div className="row gy-5" style={{ backgroundColor: "#EBFFE5" }}>
              <div className="col-12">
                <div
                  className="rounded-3"
                  style={{
                    fontSize: "18px",
                    color: "#0e3b03",
                    backgroundColor: "#D9FFCF",
                    textAlign: "center",
                    overflow: "visible",
                    border: "2px solid    ",
                    borderColor: "#0e3b03",
                  }}
                >
                  <p
                    className="lh-base"
                    style={{
                      fontSize: "1.3rem",
                      marginTop: "1rem",
                      marginLeft: "1rem",
                      marginRight: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    QUIZ DESC HERE
                  </p>

                  {/* QUIZ QUESTIONS GOES HERE */}
                  <div
                    id="quizContainer"
                    style={{
                      marginTop: "2.5rem",
                      marginBottom: "2.5rem",
                      marginLeft: "2.5rem",
                      marginRight: "2.5rem",
                    }}
                  >
                    <div
                      className="quizItemList"
                      style={{ textAlign: "left", fontWeight: "bold" }}
                    >
                      {result ? (
                        <></>
                      ) : (
                        <>
                          <p>
                            {index + 1}. {question.question}
                          </p>
                          <ul>
                            <li
                              ref={option1}
                              onClick={(e) => {
                                checkAns(e, 1);
                              }}
                            >
                              {question.option1}
                            </li>
                            <li
                              ref={option2}
                              onClick={(e) => {
                                checkAns(e, 2);
                              }}
                            >
                              {question.option2}
                            </li>
                            <li
                              ref={option3}
                              onClick={(e) => {
                                checkAns(e, 3);
                              }}
                            >
                              {question.option3}
                            </li>
                            <li
                              ref={option4}
                              onClick={(e) => {
                                checkAns(e, 4);
                              }}
                            >
                              {question.option4}
                            </li>
                          </ul>
                          <button
                            onClick={next}
                            className="btn-success"
                            style={{ width: "5rem", borderRadius: "0.5rem" }}
                          >
                            Next
                          </button>
                          <div className="index">
                            {index + 1} of {data.length} questions.
                          </div>
                        </>
                      )}

                      {result ? (
                        <>
                          <p>
                            You scored {score} out of {data.length}
                          </p>
                          <div id="finalAnswersContainer">
                            <p>Answered Questions:</p>
                            <ul>
                              {userAnswers.map((userAnswer, index) => (
                                <li key={index}>
                                  {index + 1}. {userAnswer.question}
                                  <br />
                                  Your Answer:{" "}
                                  {userAnswer.answer !== undefined
                                    ? question[`option${userAnswer.answer}`]
                                    : "Not answered"}
                                  <br />
                                  Correct Answer:{" "}
                                  {question[`option${question.answer}`]}
                                  <ul>
                                    {userAnswer.choices &&
                                      userAnswer.choices.map((choice, i) => (
                                        <li key={i}>
                                          {choice}{" "}
                                          {userAnswer.answer === i + 1
                                            ? "*"
                                            : ""}
                                        </li>
                                      ))}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <button
                            onClick={reset}
                            className="btn-success"
                            style={{ width: "5rem", borderRadius: "0.5rem" }}
                          >
                            RESET
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                {/* END OF QUIZ QUESTION */}
                <div className="" style={{ margin: "10px" }}>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* End of Topic Container */}
      {/* End of Main Layout */}

      {/* Modal for taking the quiz */}
      <div
        className="modal fade modalMain"
        id="mainId"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ backgroundColor: "#D9FFCF" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Take the quiz?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <p>
                You will be redirected to Google Form's website. Please keep
                your notes and answer the Quiz honestly.
              </p>
              <p>Good luck trainee!</p>
            </div>
            <div className="modal-footer">
              {/* Button to proceed to the quiz */}
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLSf6_s-EAisyl3bXEn1QB1IrIRnYppAQjGkk_rsO4Gvfn7PGqw/viewform",
                    "_blank"
                  )
                }
                style={{
                  backgroundColor: "#0e3b03",
                  color: "#ffffff",
                  borderRadius: "20px",
                  fontSize: "15px",
                  width: "100px",
                }}
              >
                Yes
              </button>
              {/* Button to cancel */}
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{
                  backgroundColor: "#0e3b03",
                  color: "#ffffff",
                  borderRadius: "20px",
                  fontSize: "15px",
                  width: "100px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for downloading resource file */}
      <div
        className="modal fade modalSub"
        id="subId"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ backgroundColor: "#D9FFCF" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Take the quiz?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <p>You will be downloading a resource file.</p>
              <p>Do you wish to Proceed?</p>
            </div>
            <div className="modal-footer">
              {/* Button to proceed with downloading */}
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                style={{
                  backgroundColor: "#0e3b03",
                  color: "#ffffff",
                  borderRadius: "20px",
                  fontSize: "15px",
                  width: "100px",
                }}
              >
                Proceed
              </button>
              {/* Button to cancel */}
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{
                  backgroundColor: "#0e3b03",
                  color: "#ffffff",
                  borderRadius: "20px",
                  fontSize: "15px",
                  width: "100px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamC_QuizForm_Component;

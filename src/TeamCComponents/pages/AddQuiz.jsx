import React, { useEffect, useState } from "react"; // Import React and useState hook from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/addquiz.css";
import { IoIosAdd } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { IoArrowBackCircleSharp } from "react-icons/io5";

import axios from "axios";

const AddQuiz = (props) => {
  
  const navigate = useNavigate();
  const { quiz_id } = useParams();

  const goBack = () => {
    navigate(-1);
  };

  // to save
  const [isSaved, setIsSaved] = useState([]);

  const [inputData, setInputData] = useState({
    quiz: quiz_id,
    quiz_title: "",
    quiz_description: "",
    choice_1: "",
    choice_2: "",
    choice_3: "",
    correct_answer: "",
   
  });

  const {quiz, question, choice_1, choice_2, choice_3, correct_answer } = inputData;

  const handleInputChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  // const saveQuestion = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await axios.post(`http://localhost:8080/api/v1/auth/question`, inputData);
  //     // showModal(false);
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     // Handle error if the API call fails
  //   }
  // };

  const saveQuestion = async (e) => {
    e.preventDefault();
  
    try {
      const data = {
        question: inputData.question,
        choice_1: inputData.choice_1,
        choice_2: inputData.choice_2,
        choice_3: inputData.choice_3,
        correct_answer: inputData.correct_answer,
        quiz: {
          quiz_id: quiz_id
        },
        target_score:  inputData.target_score,
      };
  
      await axios.post(`http://localhost:8080/api/v1/auth/question`, data);
      // showModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error if the API call fails
    }
  };
  


  useEffect(() => {
    getAllQuiz();
  }, []);

  const getAllQuiz = async () => {
    const res = await axios.get("http://localhost:8080/api/v1/auth/quizzes");
    setIsSaved(res.data);
    console.log(res.data)
  };
  

 
  const[showQuestion, setShowQuestion] = useState(false)

   console.log(quiz_id)
  
  return (
    <>
      <div className="teamcaddquizbody container mt-5">
        <div
          className="d-flex align-items-center"
          style={{ marginTop: "1rem" }}
        >
          <button>
            {/* Attach onClick event to the back button */}
            <IoArrowBackCircleSharp
              className="btnReturn c_chapter_return"
              alt="return-icon"
              style={{
                transition: "transform .1s",
                color: "#165207",
                marginLeft: "1rem",
                width: "2rem",
                height: "2rem",
              }}
              onClick={goBack} // Attach goBack function here
            />
          </button>
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
    
    <form className="p-3" onSubmit={saveQuestion}>
          <div className="">
            <span className="">
              <button className="teamcquizbtn btn btn-lg btn-success roboto-bold mr-3 ">
                <IoIosAdd />
              </button>
            </span>

            <div className="container text-center">
              <textarea
                className="teamcaddform form-control p-4 mb-4"
                rows="5"
                name="question"
                placeholder="Add question here..."
                value={question}
                onChange={(e) => handleInputChange(e)}
              />
              <div className="row justify-content-center">
                <div className="col-lg-6 mb-3">
                  <input
                    className="teamcaddform form-control"
                    placeholder="Option 1"
                    name="choice_1"
                    value={choice_1}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <input
                    className="teamcaddform form-control"
                    placeholder="Option 2"
                    name="choice_2"
                    value={choice_2}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <input
                    className="teamcaddform form-control"
                    placeholder="Option 3"
                    name="choice_3"
                    value={choice_3}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <input
                    className="teamcaddform form-control"
                    placeholder="Option 4"
                    name="correct_answer"
                    value={correct_answer}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="d-flex justify-content-center align-items-center">
              <span>
                <button className="teamcquizbtnone btn btn-lg btn-success py- px-4 m-3 bg-op-6 roboto-bold">
                  <FaTrashAlt />
                </button>
              </span>

              <span>
                <button
                  className="teamcquizbtntwo btn btn-lg btn-success py-2 px-4 m-3 bg-op-6 roboto-bold"
                  type="save"
                  onClick={() => {
                    if (
                      !question ||
                      !choice_1 ||
                      !choice_2 ||
                      !choice_3 ||
                      !correct_answer
                    ) {
                      window.alert("Please fill in all fields before saving.");
                      return false;
                    } else {
                      window.alert("Save");
                    }
                  }}
                >
                  <IoIosSave />
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddQuiz;

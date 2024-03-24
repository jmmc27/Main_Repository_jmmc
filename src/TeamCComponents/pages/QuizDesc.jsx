import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosSave } from "react-icons/io";
import axios from 'axios';

const QuizDesc = () => {
  const { chapter_id } = useParams();

  const [inputData, setInputData] = useState({
    chapter: chapter_id,
    quiz_title: "",
    quiz_description: "",
  });
  
  const { quiz_title, quiz_description } = inputData;

  const handleInputChange = (e) => {  
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const saveQuiz = async (e) => {
    e.preventDefault();

    try {
      const data = {
        quiz_title: quiz_title,
        quiz_description: quiz_description,
        chapter: {
          chapter_id: chapter_id
        }
      };

      const response = await axios.post(`http://localhost:8080/api/v1/auth/quiz`, data);
      const quiz_id = response.data.quiz_id;
      window.alert("Quiz saved successfully!");
      window.location.href = `/addQuiz/${quiz_id}`;
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error if the API call fails
    }
  };

  return (
    <div>
      <form onSubmit={saveQuiz}>
        <div className="">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="mr-auto">
              <input
                className="teambaddtitle form-control"
                placeholder="Title"
                name="quiz_title"
                value={quiz_title}
                onChange={(e) => handleInputChange(e)}
              />
            </span>
          </div>
          <textarea
            className="teamcadddesc form-control p-4 mb-4"
            name="quiz_description"
            placeholder="Add description"
            value={quiz_description}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <button
          className="teamcquizbtntwo btn btn-lg btn-success py-2 px-4 m-3 bg-op-6 roboto-bold"
          type="submit">
          <IoIosSave />
        </button>
      </form>
    </div>
  )
}

export default QuizDesc;

import CancelModal from "../components/cancelModal";
import "../s_examPage.css";
import 'bootstrap/dist/js/bootstrap.js';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function examContent() {
  const [main, setMain] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [userSelection, setUserSelection] = useState({});
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchMain = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/api/v1/auth/questionbyquiz/${id}`);
        const coursesArray = Array.isArray(result.data) ? result.data : [result.data];
        setMain(coursesArray);
        setTotalItems(coursesArray.length);
      } catch (error) {
        console.error("Error loading chapters:", error);
      }
    };

    // Call the API request
    fetchMain();
  }, [id]);

  useEffect(() => {
    // Shuffle choices only once when the component mounts
    if (main.length > 0) {
      const choicesArray = main.map(con => [con.choice_1, con.choice_2, con.choice_3, con.correct_answer]);
      setShuffledChoices(choicesArray.map(shuffleArray));
    }
  }, [main]);

  // Function to handle radio button selection
  const handleRadioSelection = (questionId, selectedChoice) => {
    setUserSelection((prevSelection) => ({
      ...prevSelection,
      [questionId]: selectedChoice,
    }));
  };

// Function to handle scoring and show alert on submission
const scoringFunction = () => {
  let score = 0;

  main.forEach((question) => {
    const { id, correct_answer } = question;
    const userAnswer = userSelection[id];

    

    if (userAnswer === correct_answer) {
      score += 1; // Increment the score by 1 for each correct answer
    }
  });

  setTotalScore(score);
  alert(`User scored ${score} out of ${totalItems}.`); // Display total score
};


  return (
    <>
      <div id="outerContainer">
        <div> TOTAL ITEMS: {totalItems}</div>
        <div id="parentExamContent">
          {main &&
            main.map((con, ida) => {
              const { question } = con;

              return (
                <div id="childExamContent" key={ida} className="rounded-3">
                  <div id="questionContainer">
                    <p className="lh-base">
                      {ida + 1}. {question}
                    </p>

                    {shuffledChoices.length > 0 && shuffledChoices[ida].map((choice, index) => (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`flexRadioDefault${ida}`}
                          id={`flexRadioDefault${ida}_${index}`}
                          onChange={() => handleRadioSelection(con.id, choice)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`flexRadioDefault${ida}_${index}`}
                        >
                          {choice}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          <div id="btnContainer">
            <button
              id="btnCancel"
              type="button"
              className="btn"
              data-bs-toggle="modal"
              data-bs-target="#cancelModal"
            >
              Cancel
            </button>
            <button id="btnSubmit" className="btn" onClick={scoringFunction}>
              Submit
            </button>
          </div>
          <CancelModal />
        </div>
      </div>
    </>
  );
}

// Function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

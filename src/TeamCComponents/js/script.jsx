import { useState } from "react";
import { data } from "../data/quiz_content_data";
import "bootstrap/dist/css/bootstrap.min.css";

// Function to show the next topic
function showNextTopic(topicNumber) {
  // Hide all topics and the iframe
  hideAllTopics();

  // Show the selected topic
  let topicElement = document.getElementById("topic" + topicNumber);
  if (topicElement) {
    topicElement.classList.remove("c_chapcourse_hidden");
  }
}

// Function to hide all topics
function hideAllTopics() {
  for (let i = 0; i <= 2; i++) {
    let topicElement = document.getElementById("topic" + i);
    if (topicElement) {
      topicElement.classList.add("hidden");
    }
  }

  let iframeElement = document.getElementById("iframe");
  if (iframeElement) {
    iframeElement.classList.add("hidden");
  }
}

// Function to enroll and disable the button
function enroll(modalNumber) {
  let enrollButton = document.getElementById(`enrollButton${modalNumber}`);
  if (enrollButton) {
    enrollButton.disabled = true;
    enrollButton.innerText = `You are now enrolled.`;
  }
}

// Function to redirect to Google
function redirectToGoogle() {
  window.location.href = "https://www.google.com";
}

const useToggleChoices = (initialChoices) => {
  const [selectedChoice, setSelectedChoice] = useState("");

  const handleToggle = (choice) => {
    setSelectedChoice(choice === selectedChoice ? "" : choice);
  };

  return {
    selectedChoice,
    handleToggle,
    choices: initialChoices.map(
      (choice) => choice.charAt(0).toUpperCase() + choice.slice(1)
    ),
  };
};

// getOptionText function
const getOptionText = (index, question) => {
  switch (index) {
    case 1:
      return question.option1;
    case 2:
      return question.option2;
    case 3:
      return question.option3;
    case 4:
      return question.option4;
    default:
      return "";
  }
};

let buttonCounter = 1;
let modalCounter = 1;

function incrementAttributes() {
  const newButtonId = `enrollButton${buttonCounter}`;
  const newModalId = `modal_seemore${modalCounter}`;
  const newButtonTarget = `#modal${buttonCounter}`;

  // Update enroll button attributes
  const enrollButton = document.getElementById("enrollButton");
  if (enrollButton) {
    enrollButton.id = newButtonId;
    enrollButton.setAttribute("data-bs-target", newButtonTarget);
  }

  // Update modal see more attributes
  const modalSeeMore = document.getElementById("modal_seemore");
  if (modalSeeMore) {
    modalSeeMore.id = newModalId;
  }

  // Increment counters
  buttonCounter++;
  modalCounter++;
}

// Exporting all functions and hooks
export {
  showNextTopic,
  hideAllTopics,
  enroll,
  redirectToGoogle,
  useToggleChoices,
  getOptionText,
  incrementAttributes,
};

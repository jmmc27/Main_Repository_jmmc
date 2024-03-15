/* eslint-disable react/prop-types */

//2/3/2024 junite, create AddTopic UI, completed

import React, { useContext, useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import Footer from "../../Footer";
import vidUpload from "../../../../assets/TeamBassests/vidUpload.svg";
import quizLink from "../../../../assets/TeamBassests/quizLink.svg";

//import toastify react
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import LinkTopicModal from "../TopicModal/LinkTopicModal";

//close icon
import { IoMdClose } from "react-icons/io";
import { CourseContext } from "../../context/CourseContext";

//remove close button
const CloseButton = ({ closeToast }) => (
  <i className="material-icons" onClick={closeToast}></i>
);

const AddTopic = ({ courseTitle }) => {
  const [videoInputValue, setVideoInputValue] = useState("");
  const [quizInputValue, setQuizInputValue] = useState("");
  const [isVideoPopupOpen, setVideoPopupOpen] = useState(false);
  const [isQuizPopupOpen, setQuizPopupOpen] = useState(false);

  //  const { courses, setCourses, chapters, setChapters } =
  //    useContext(CourseContext);

  const toggleVideoPopup = () => {
    setVideoPopupOpen(!isVideoPopupOpen);
  };

  const toggleQuizPopup = () => {
    setQuizPopupOpen(!isQuizPopupOpen);
  };

  const handleVideoInputChange = (e) => {
    setVideoInputValue(e.target.value);
  };

  const handleQuizInputChange = (e) => {
    setQuizInputValue(e.target.value);
  };

  const handleVideoDoneClick = () => {
    console.log("Video Done button clicked. Input value:", videoInputValue);
    toggleVideoPopup();
  };

  const handleQuizDoneClick = () => {
    console.log("Quiz Done button clicked. Input value:", quizInputValue);
    toggleQuizPopup();
  };

  const handleVideoCancelClick = () => {
    setVideoInputValue("");
    console.log("Video Cancel button clicked");
    toggleVideoPopup();
  };

  const handleQuizCancelClick = () => {
    setQuizInputValue("");
    console.log("Quiz Cancel button clicked");
    toggleQuizPopup();
  };

  //toast
  const addToCartNotify = () => {
    toast.success("Topic, Successfully Created!", {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      closeButton: CloseButton,
    });
  };

  //state for topics
  const [topics, setTopics] = useState({
    topic_title: "",
    topic_description: "",
    topic_file: "",
    topic_link: "",
  });

  const { topic_title, topic_description, topic_file, topic_link } = topics;
  const handleInputChange = (e) => {
    setTopics({ ...topics, [e.target.name]: e.target.value });
  };

  let { id } = useParams();
  const handleSubmit = async (e) => {
    // Assuming your API call is successful, update the state to indicate form submission

    try {
      await axios.post(
        `http://localhost:8080/api/v1/auth/chapter/${id}/topics`,
        topics
      );
      // showModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error if the API call fails
    }
    addToCartNotify();
  };
  console.log(topics);

  useEffect(() => {
    //  loadChapters();
    loadChapter();
  }, [id]);

  const [loadByChapter, setLoadByChapter] = useState([]);
  const loadChapter = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/v1/auth/chapter/${id}`
      );

      // Ensure that result.data is always an array by converting it
      const coursesArray = Array.isArray(result.data)
        ? result.data
        : [result.data];
      setLoadByChapter(coursesArray);
    } catch (error) {
      console.error("Error loading chapters:", error);
    }
  };
  console.log(loadByChapter);

  //react state for link and show
  const [linkFileShow, setLinkFileShow] = useState(false);
  return (
    <>
      {/* add topic title */}
      {loadByChapter.map((chap, idx) => {
        const { chapter_title } = chap;
        return (
          <div key={idx}>
            <form onSubmit={handleSubmit} className="h-[100vh] w-[100%] pt-2">
              <div className="flex items-center justify-end w-full ">
                <button
                  type="submit"
                  className="flex items-center gap-2 pr-5 cursor-pointer"
                >
                  <div className="text-[#4c604c] text-[1.5rem]">
                    <FaSave />
                  </div>
                  <span className="text-[#126912] font-semibold">Save</span>
                </button>
              </div>
              <div className="w-[90%] m-auto mb-4 md:mb-5">
                <span className="flex justify-center items-center md:justify-start md:items-start text-[2rem] font-semibold ">
                  <p>{courseTitle}</p>
                </span>
                <div className="flex flex-col items-center w-full pt-3 md:pt-0 md:flex-row">
                  <span className="text-[1.5rem] pr-2 text-[#070101] text-opacity-[55%] line-clamp-1">
                    {chapter_title}:
                  </span>
                  <input
                    required
                    type="text"
                    name="topic_title"
                    value={topic_title}
                    onChange={(e) => handleInputChange(e)}
                    id=""
                    placeholder="Topic Title"
                    className="bg-[#BCE8B1] rounded-lg placeholder:text-[#626262] placeholder:pl-2 outline-none pl-2 w-[90%] md:w-[40%]"
                  />
                </div>
                <textarea
                  required
                  id=""
                  cols="30"
                  rows="10"
                  name="topic_description"
                  value={topic_description}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Topic Description"
                  className="bg-[#BCE8B1] TeamB_text-shadow resize-none min-w-[100%] md:h-[25vh] placeholder:font-medium placeholder:text-center placeholder:p-6
              outline-none rounded-lg placeholder:text-[#070101] placeholder:text-opacity-[55%] mt-4 md:mt-5 pl-5"
                />
              </div>
              <div className="flex w-[90%] flex-col gap-y-5 lg:gap-y-0 md:flex-row m-auto items-center justify-center md:gap-x-[1rem] md:mt-[3rem]">
                <div
                  className="relative w-[100%] h-[200px] md:w-[50%]
           lg:w-[20vw] lg:h-[20vh] bg-[#126912] rounded-lg flex items-center
            justify-center cursor-pointer"
                  onClick={toggleVideoPopup}
                >
                  <img src={vidUpload} alt="" className="md:w-[3rem] " />
                </div>
                <Link
                  to="/AddQuiz"
                  className=" relative w-[100%] h-[200px] md:w-[50%]
           lg:w-[20vw] lg:h-[20vh] bg-[#126912] rounded-lg flex
           items-center justify-center cursor-pointer"
                >
                  <img src={quizLink} alt="" className="md:w-[3rem] " />
                </Link>
              </div>
              {/* Video Popup */}

              {isVideoPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center">
                  {" "}
                  {/* Outer container */}
                  <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
                  {/* Background overlay */}
                  <div className="bg-[#EBFFE5] p-8 rounded-lg z-10 w-[90%] md:w-[80%]">
                    {" "}
                    {/* Modal content */}
                    <p className="mb-4 text-lg font-semibold">
                      Add Topic Link
                    </p>{" "}
                    {/* Modal title */}
                    <input // Input field for topic link
                      required
                      type="text"
                      name="topic_link"
                      value={topic_link}
                      onChange={(e) => handleInputChange(e)}
                      className="bg-[#BCE8B1] p-2 border border-gray-300 rounded-md mb-4 w-full"
                      placeholder="https://www"
                    />
                    <div className="flex justify-end">
                      {" "}
                      {/* Button container */}
                      <button // Cancel button
                        onClick={handleVideoCancelClick}
                        className="px-4 py-2 text-black rounded-md"
                      >
                        Cancel
                      </button>
                      <button // Done button
                        onClick={handleVideoDoneClick}
                        className="bg-[#126912] text-white py-2 px-4 rounded-full ml-2"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* Quiz Popup */}

              <ToastContainer className="tcenter" closeButton={CloseButton} />
            </form>
          </div>
        );
      })}
    </>
  );
};

export default AddTopic;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
//import { ArrowLeft } from "react-bootstrap-icons"; // Assuming you have this icon imported
import "../css/sidebar.css";
import "../css/base_style.css";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import axios from "axios";
import Component_MainContent from "./course_maincontent";

const SidebarC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  let { id } = useParams();

  //fetching api
  const [showTopic, SetShowTopic] = useState([]);

  useEffect(() => {
    TheTopics();
  }, []);

  const TheTopics = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/v1/auth/chapter/${id}`
    );

    const coursesArray = Array.isArray(result.data)
      ? result.data
      : [result.data];
    SetShowTopic(coursesArray);
    console.log(coursesArray);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [showCourse, setShowcourse] = useState(null);
  // const [showContent, setShowContent] = useState(false);

  return (
    <div className="sidebar-wrapper">
      <div className="logo-container">
        {/* Your logo component goes here */}
      </div>
      <div
        className={`hamburger-menu ${isOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      >
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
      </div>
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-sticky">
          {showTopic.map((showTpc, idx) => {
            const { topic } = showTpc;
            console.log(topic);
            return (
              <ul className="nav flex-column" key={idx}>
                <li className="teamcnavitem nav-item">
                  {topic.map((tpc, idx) => {
                    const { topic_title, topic_id } = tpc;  
                    return (
                      <div key={idx}>
                        <li className="nav-item">
                          <button
                            className="teamctopic nav-link"
                            onClick={() => {
                              setShowContent((prev) => !prev);
                              setShowcourse(topic_id);
                            }}
                          >
                            {topic_title}
                          </button>
                        </li>
                      </div>
                    );
                  })}
                </li>
                <div
  id="c_maincontent_buttoncontainer"
  className="mt-auto"
  style={{
    display: 'flex',        // Enable flexbox
    justifyContent: 'center', // Horizontally center the content
    alignItems: 'center',     // Vertically center (if needed)
    height: '100%'            // Ensure the container takes up the full height if you want vertical centering as well
  }}
>
  <button
    className="btn courseButton"
    data-bs-toggle="modal"
    data-bs-target="#mainId"
    type="button"
    style={{
      backgroundColor: '#0E3B03',
      color: 'white',
      boxShadow: '0 2px 5px 0 rgb(0 0 0 / 25%), 0 5px 5px 0 rgb(0 0 0 / 30%)',
    }}
  >
    Go to Quiz
  </button>
</div>

                <Link
                  onClick={goBack}
                  className="buttonReturn d-flex align-items-center c_chapter_returncontainer"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "fit-content",
                  }}
                >
                  

                  
                  <div
                    className="teamcreturnbtn d-flex align-items-center"
                    style={{ marginTop: "1rem" }}
                  >
                    <div>
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
                  {/* Return button contents */}
                </Link>
              </ul>
            );
          })}
        </div>
      </nav>
      {/* {showTopic.map((showTpc, idx) => {
        const { topic } = showTpc;
        console.log(topic);
        return (
          <ul key={idx}>
            {topic.map((tpc, idx) => {
              const { topic_title, topic_id } = tpc;
              return <div key={idx}>
                 {showContent && showCourse === topic_id && <Component_MainContent />}
              </div>;
            })}
          </ul>
        );
      })} */}

     
    </div>
  );
};

export default SidebarC;

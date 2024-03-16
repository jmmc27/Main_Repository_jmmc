
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import Team_D_HeaderV2 from "../../TeamDComponents/Team_D_HeaderV2";

import axios from "axios";

function Component_MainContent() {
  const [chapter, setChapters] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8080/api/v1/auth/chapter/${id}`
        );

        // Ensure that result.data is always an array by converting it
        const coursesArray = Array.isArray(result.data)
          ? result.data
          : [result.data];
        setChapters(coursesArray);
      } catch (error) {
        console.error("Error loading chapters:", error);
      }
    };

    fetchChapters();
  }, [id]);
  console.log(chapter);

  return (
    <>
      {/* Main layout */}
      <main id="c_maincontent_mainlayout">
        {/* Start of Topic Container */}
        {chapter &&
          chapter.map((top, idx) => {
            const { topic } = top;
            return (
              <div
                key={idx}
                id="topic0"
                className="c_maincontent_parentcontainer"
              >
                {topic.map((topic, idc) => {
                  const { topic_title, topic_description, topic_link } = topic;
                  return (
                    <div
                      className="container"
                      id="c_maincontent_maincontainer"
                      key={idc}
                    >
                      {/* Displaying dynamic content based on the current pathname */}
                      <p style={{ fontWeight: "bold" }}>{topic_title}</p>
                      <div style={{ backgroundColor: "#EBFFE5" }}>
                        <div>
                          <div id="c_maincontent_textcontainer">
                            <p
                              className="lh-base"
                              id="c_maincontent_textdesc"
                              style={{
                                marginTop: "1rem",
                                marginLeft: "1rem",
                                marginRight: "1rem",
                                marginBottom: "1rem",
                              }}
                            >
                              {topic_description}
                            </p>
                          </div>

                          <iframe
                            src={topic_link}
                            frameBorder="0"
                            scrolling="no"
                            className="blur-[.01rem] mt-3 h-[80%]  md:h-[350px] w-full lg:h-[450px] rounded-lg"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </main>
      {/* End of Topic Container */}
      {/* End of Main Layout */}

      {/* Modals for quiz and resource download */}
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
              <p>You will be redirected to the Quiz Page.</p>
              <p>Good luck trainee!</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  window.location.href = urlQuiz;
                }}
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
        {/* Modal contents for quiz */}
      </div>

      <div
        className="modal fade modalSub"
        id="subId"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {/* Modal contents for resource download */}
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

export default Component_MainContent;
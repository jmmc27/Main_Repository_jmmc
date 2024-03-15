import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../TeamCComponents/css/base_style.css";
import { incrementAttributes } from "../js/script";

function CoursePreview() {
  const [chapters, setChapters] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState(null);
  const [buttonCounter, setButtonCounter] = useState(1); // Initialize button counter

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/auth/getCourses"
        );
        console.log("Response Data:", response.data); // Log response data
        setChapters(response.data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
        setError(error.message);
      }
    };

    fetchChapters();
  }, []);

  useEffect(() => {
    const fetchEnrollmentsByUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:8080/api/v1/auth/enrollment-by-user/${userId}`
        );
        setEnrollments(response.data); // Assuming the response contains the enrollment data
      } catch (error) {
        console.error("Error fetching enrollments:", error);
        // Handle errors
      }
    };

    fetchEnrollmentsByUser();
  }, []);

  console.log(enrollments);

  const incrementCounterAndAttributes = () => {
    setButtonCounter((prevCounter) => prevCounter + 1); // Increment button counter
    incrementAttributes(); // Call incrementAttributes function from script
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div
        className="card-container"
        id="c_cardview_sql"
        data-card="course_sql"
      >
        <div className="row" id="c_cardpreview_cardouter">
          {chapters.map((chapterData, index) => {
            const buttonId = `enrollButton${index + 1}`;
            const modalId = `modal${index + 1}`;
            const isEnrolled = enrollments.some(
              (enrollments) =>
                enrollments.course.course_id === chapterData.course_id
            );
            console.log(isEnrolled);
            return (
              <div key={index} className="col-md-3 mt-3 ml-1 mb-3">
                <div
                  className="teamcwholecard card border-success h-100"
                  style={{
                    maxWidth: "20rem",
                    borderRadius: "10px",
                    marginBottom: "5px",
                  }}
                >
                  <div className="card-header bg-transparent border-success "></div>
                  <div className="teamccardcard card mb-4">
                    <div className="teamccardbody card-body ">
                      <h5 className="teamctitlecard card-title fw-bold text-center text-success">
                        {chapterData.course_title}
                      </h5>
                      <hr className="teamclinepartition" />
                      <div className="teamcparag card-body bg-transparent border-success d-flex flex-column text-left">
                        <span>
                          {chapterData.course_description
                            .split(" ")
                            .slice(0, 20)
                            .join(" ")}
                        </span>
                        <span
                          className="fw-bold text-end"
                          id="c_course_seemoretext"
                          data-bs-toggle="modal"
                          data-bs-target={`#modal_seemore${index + 1}`}
                          onClick={incrementCounterAndAttributes}
                        >
                          See more..
                        </span>
                      </div>

                      <div>
                        <br />
                      </div>
                      <button
                        className="btn btn-success d-grid gap-2 col-6 mx-auto d-flex badge text-wrap"
                        data-bs-toggle="modal"
                        data-bs-target={`#${modalId}`}
                        id={buttonId}
                        onClick={incrementCounterAndAttributes}
                        disabled={isEnrolled}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "30px",
                        }}
                      >
                        {isEnrolled ? "Enrolled" : "Enroll Now"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CoursePreview;

import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Team_D_HeaderV2 from "../../TeamDComponents/Team_D_HeaderV2";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/base_style.css";
import axios from "axios";

{
  /* This function is to see the title of the assessment and the status of it.*/
}
function TeamC_Assessments() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/auth/getCourses"
        );
        setChapters(response.data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, []);

  return (
    <Fragment>
      <Team_D_HeaderV2 />
      <div className="container mt-5 mx-auto">
        <p className="text-center mb-3" id="assessmentlabel">
          Assessments
        </p>
        <hr />
        {chapters.map((chapter, index) => (
          <Link to="/assessment_sql">
            <div
              className="card mb-3"
              id="c_assessment_courses"
              style={{ borderRadius: "15px", backgroundColor: "#bce8b1" }}
            >
              <div className="card-body d-flex justify-content-between">
                <p style={{ color: "#0e3b03" }} className="h4">
                  <b>{chapter.course_title}</b>
                </p>
                <small
                  id="subText"
                  style={{
                    fontStyle: "italic",
                    alignSelf: "center",
                    color: "#0e3b03",
                  }}
                >
                  -STATUS-
                </small>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Fragment>
  );
}

export default TeamC_Assessments;

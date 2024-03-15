import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

function CoursePreview() {
  return (
    <div id="c_cardpreview_cardouter">
      {/* SQL QUERY */}
      <div className="card-container" id="c_cardpreview_cardcontainer">
        <div
          className="card border-success mt-3 mb-3 h-100"
          style={{ maxWidth: "235px", borderRadius: "10px" }}
        >
          <div className="card-header bg-transparent border-success"></div>
          <div
            className="text-success h-100"
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Set the fixed height for the card body */}
            <h3 className="fw-bold text-center" style={{ fontSize: "1.7rem" }}>
              The SQL Query
            </h3>
          </div>
          <hr />

          <div className="card-body bg-transparent border-success d-flex flex-column">
            <p className=" mt-4" style={{ textAlign: "left" }}>
              In a SQL querying workshop, participants delve into fundamental
              concepts such as syntax, database design, and optimization,
              empowering them with practical skills to write efficient queries.
            </p>
            <br />
            <div className="d-flex justify-content-center align-items-end mt-auto">
              <button
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#modalSql"
                id="enrollButton1"
              >
                Enroll Now!
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SUBVERSION CONTROL */}
      <div className="card-container" id="c_cardpreview_cardcontainer">
        <div
          className="card border-success mt-3 mb-3 h-100"
          style={{ maxWidth: "235px", borderRadius: "10px" }}
        >
          <div className="card-header bg-transparent border-success"></div>
          <div
            className="text-success h-100"
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Set the fixed height for the card body */}
            <h3 className=" fw-bold text-center" style={{ fontSize: "1.7rem" }}>
              Version Control: Subversion
            </h3>
          </div>
          <hr />
          <div className="card-body bg-transparent border-success d-flex flex-column">
            <p className=" mt-4" style={{ textAlign: "left" }}>
              Apache Subversion (SVN) is a centralized version control system,
              facilitating collaborative software development through version
              tracking, allowing multiple developers to work on projects
              concurrently.
            </p>
            <br />
            <div className="d-flex justify-content-center align-items-end mt-auto">
              <button
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#modalSvn"
                id="enrollButton2"
              >
                Enroll Now!
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HTML PROGRAMMING */}
      <div className="card-container" id="c_cardpreview_cardcontainer">
        <div
          className="card border-success mt-3 mb-3 h-100"
          style={{ maxWidth: "235px", borderRadius: "10px" }}
        >
          <div className="card-header bg-transparent border-success"></div>
          <div
            className="text-success h-100"
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Set the fixed height for the card body */}
            <h3
              className="card-title fw-bold text-center"
              style={{ fontSize: "1.7rem" }}
            >
              HTML Programming
            </h3>
          </div>
          <hr />

          <div className="card-body bg-transparent border-success d-flex flex-column">
            <p className="mt-4" style={{ textAlign: "left" }}>
              HTML (Hypertext Markup Language) is the standard language for
              creating web pages, defining the structure and content using tags,
              ensuring compatibility and accessibility across various browsers.
            </p>
            <br />
            <div className="d-flex justify-content-center align-items-end mt-auto">
              <button
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#modalHtml"
                id="enrollButton3"
              >
                Enroll Now!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    /* End of Courses */
  );
}

export default CoursePreview;

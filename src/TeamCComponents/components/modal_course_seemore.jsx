import React, { useEffect, useState } from "react";
import "../css/base_style.css";
import axios from "axios";

function ModalSeeMore() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const loadChapters = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/auth/getCourses"
        );
        setChapters(response.data);
      } catch (error) {
        console.error("Error loading chapters:", error);
      }
    };
    loadChapters();
  }, []);

  const enroll = (modalNumber) => {
    // Your enrollment logic here
    console.log(`Enrolling in modal number ${modalNumber}`);
  };

  return (
    <>
      {chapters.map((chapterData, index) => (
        <div
          key={index}
          className="modal fade"
          id={`modal_seemore${index + 1}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby={`exampleModalLongTitle${index + 1}`}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div
              className="modal-content"
              style={{ backgroundColor: "#D9FFCF" }}
            >
              <div className="modal-header">
                <h5
                  className="modal-title fw-bold"
                  id={`exampleModalLongTitle${index + 1}`}
                >
                  {chapterData.course_title}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{ wordWrap: "break-word" }}>
                <p>{chapterData.course_description}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  style={{
                    backgroundColor: "#0e3b03",
                    color: "#ffffff",
                    borderRadius: "20px",
                    fontSize: "15px",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default ModalSeeMore;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/addquiz.css";
import { IoIosAdd } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import CertificateGenerator from "./CertificateGenerator";

const AssessmentQuiz = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="teamcaddquizbody container mt-5">
        {/* <Link onClick={() => goBack} className="buttonReturn d-flex align-items-center c_chapter_returncontainer" style={{ textDecoration: 'none', color: 'black', width: 'fit-content', }}> */}
        <div
          className="d-flex align-items-center"
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
        {/* </Link> */}
        <form className="p-3">
          <div className="">
            <div className="">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="mr-auto">
                  <p className="AddQuizTitle ml-3">Chapter: Assessment</p>
                </span>
                <span className="">
                  <button className="teamcquizbtn btn btn-lg btn-success roboto-bold mr-3 ">
                    <IoIosAdd />
                  </button>
                </span>
              </div>
            </div>

            <div className="container text-center">
              <textarea
                className="teamcaddform form-control p-4 mb-4"
                rows="5"
                placeholder="Add question here..."
              />
              <div className="row justify-content-center">
                <div className="col-lg-6 mb-3">
                  <input
                    className="teamcaddform form-control"
                    placeholder="Option 1"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <input
                    className="teamcaddform form-control"
                    placeholder="Option 2"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <input
                    className="teamcaddform form-control"
                    placeholder="Option 3"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <input
                    className="teamcaddform form-control"
                    placeholder="Option 4"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center mt-4 mb-4">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="">
        <div className="row justify-content-center">
          <div className="d-flex justify-content-center align-items-center">
            <span>
              <button className="teamcquizbtnone btn btn-lg btn-success py- px-4 m-3 bg-op-6 roboto-bold">
                <FaTrashAlt />
              </button>
            </span>

            <span>
              <button className="teamcquizbtntwo btn btn-lg btn-success py-2 px-4 m-3 bg-op-6 roboto-bold">
                <IoIosSave />
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
<CertificateGenerator />;
export default AssessmentQuiz;

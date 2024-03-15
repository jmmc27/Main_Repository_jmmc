/* eslint-disable react/prop-types */

//2/3/2024 junite/ced, create CourseDescription UI, completed

import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import Footer from "../../Footer";

//import toastify react
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

//remove close button
const CloseButton = ({ closeToast }) => (
  <i className="material-icons" onClick={closeToast}></i>
);

const CourseDescription = ({ courseId }) => {
  //toast
  const addToCartNotify = () => {
    toast.success("Course Description, Successfully Saved!", {
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
  const [courses, setCourses] = useState({
    course_description: "",
  });

  const { course_description } = courses;
  const handleInputChange = (e) => {
    setCourses({ ...courses, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleSubmit = async (e) => {
    // Assuming your API call is successful, update the state to indicate form submission

    try {
      await axios.put(
        `http://localhost:8080/api/v1/auth/course/${courseId}`,
        courses
      );
      // showModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error if the API call fails
    }
  };

  const loadCourses = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/v1/auth/course/${courseId}`
    );
    setCourses(result.data);
  };

  return (
    <>
      {/* add topic title */}
      <form onSubmit={handleSubmit} className="h-[100vh] w-[100%] pt-2">
        <div className="flex items-center justify-end w-full ">
          <button
            type="submit"
            className="flex items-center gap-2 pr-5 cursor-pointer"
            onClick={() => addToCartNotify()}
          >
            <div className="text-[#4c604c] text-[1.5rem]">
              <FaSave />
            </div>
            <span className="text-[#126912] font-semibold">Save</span>
          </button>
        </div>
        <div className="w-[100%] flex flex-col justify-center items-center lg:justify-start lg:items-start lg:w-[90%] m-auto">
          <span className="text-[2rem]  mt-3 lg:mt-0 font-semibold ">
            Course Description
          </span>

          <textarea
            required
            name="course_description"
            value={course_description}
            onChange={(e) => handleInputChange(e)}
            id=""
            cols="30"
            rows="10"
            placeholder="Course Description"
            className="bg-[#BCE8B1] TeamB_text-shadow resize-none w-[90%] lg:min-w-[100%]  lg:h-[50vh] placeholder:font-medium placeholder:text-justify placeholder:p-10
              outline-none rounded-lg placeholder:text-[#070101] placeholder:text-opacity-[55%] mt-3 lg:mt-5 p-2 "
          />
        </div>

        <ToastContainer className="tcenter" closeButton={CloseButton} />
      </form>
    </>
  );
};

export default CourseDescription;

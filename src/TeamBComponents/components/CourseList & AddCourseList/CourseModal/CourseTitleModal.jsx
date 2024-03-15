/* eslint-disable react/prop-types */
//2/1/2024 junite, created UI Modal for course title edit, completed
//2/22024 junite, centered modal
import axios from "axios";
import React, { useEffect, useState } from "react";

const CourseTitleModal = ({ courseId, editTitle }) => {
  //state for topics
  const [courses, setCourses] = useState({
    course_title: "",
  });

  const { course_title } = courses;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1); // Capitalize first letter
    setCourses({ ...courses, [name]: capitalizedValue });
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

  const handleCancel = () => {
    // Implement your cancel logic here
    editTitle((prev) => !prev);
  };

  return (
    <>
      <div className="w-[100%] h-[100vh] pt-[11.8rem]  backdrop-blur-[.1rem] fixed inset-0">
        <div className="flex m-auto w-[90%] md:w-[550px]  border-[.01rem] drop-shadow-2xl shadow-lg border-black rounded-lg bg-[#EBFFE5] lg:max-w-[550px] ">
          <form
            onSubmit={handleSubmit}
            className="w-[90%] lg:w-[80%] m-auto py-2 "
          >
            <div className="flex items-center py-1 text-black lg:font-bold lg:text-3xl lg:py-0">
              <p className=" lg:pb-5 pb-3 lg:font-bold TeamB_text-shadow text-[1.5rem] lg:text-[1.2rem]   lg:mt-5">
                Rename Course Title
              </p>
            </div>
            <input
              type="text"
              className="TeamB_input-style bg-[#BCE8B1] opacity-[50%] p-2"
              required
              name="course_title"
              value={course_title}
              onChange={(e) => handleInputChange(e)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
            <div className="flex justify-end w-full pt-8">
              <div className="flex gap-x-5">
                <span
                  className="  lg:text-[1rem] py-2 cursor-pointer "
                  onClick={handleCancel}
                >
                  Cancel
                </span>
                <button
                  className="drop-shadow-md TeamB_text-shadow px-3 py-1 rounded-full   lg:w-[90px] lg:h-[40px] lg:rounded-[80px] lg:text-[1rem]  bg-[#126912]  text-[#FFFFFF]  font-bold"
                  type="submit"
                >
                  <p>Done</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CourseTitleModal;

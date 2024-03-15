//  1/31/2024 junite, adjust mt for course list

import React, { useContext } from "react"; // Importing React and useContext hook
import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React
import axios from "axios"; // Import axios for making HTTP requests

//import mock data json file
import data from "../../mockData/MockData.json"; // Import mock data JSON file
import Footer from "../Footer"; // Import Footer component
import DashboardCardHover from "./DashBoardCardHover"; // Import DashboardCardHover component
import { DashBoardContext } from "../context/DashBoardContext"; // Import DashBoardContext

const DashboardCard = () => {
  //Define Dashboard component
  // *NOTE
  //if data is coming from db use useState hook to store the data
  //sample:
  const [courses, setCourses] = useState([]); // Declare state variable 'courses' using useState hook

  //*NOTE
  //use GET function of axios and use useEffect hook
  //sample:
  useEffect(() => {
    // Fetch data from API when component mounts
    loadCourses();
  }, []);

  const loadCourses = async () => {
    // Function to fetch courses from API
    const result = await axios.get(
      "http://localhost:8080/api/v1/auth/getCourses"
    );
    setCourses(result.data); // Set the fetched data to 'courses' state
  };

  //after getting the data display it using map
  //get your react hook where you store the data coming from db
  //sample: courses.map((course, idx) {return(your code here)});

  //*NOTE
  //for now I'll be displaying a data coming from a json format file
  //destructure the data
  const { course } = courses; // Destructure 'course' from 'courses' state

  //react hook for dashboardhover
  const { dashBoardHover, setDashBoardHover } = useContext(DashBoardContext); // Get dashboard hover state and function from context

  //state for modal by id
  const [editCourseId, setEditCourseId] = useState(null); // Declare state variable 'editCourseId' using useState hook
  return (
    //Return JSX for DashboardCard component
    <div className="w-full h-[100vh] relative ">
      {/* change bg color to provided img */}
      {/* 1/18/204 bg height 323px */}
      <div className=" lg:max-h-[40vh]  xl:max-h-[486px]  relative flex flex-col items-center justify-center w-full py-10 bg-[url('https://img.freepik.com/fotos-premium/acuarela-abstracta-verde-textura-papel-blanco_7190-1311.jpg?w=996')] bg-cover shadow-lg lg:py-5">
        {" "}
        {/* Render header section */}
        <p className="mt-16 TeamB_text-shadow  text-[1.8rem] lg:text-[2rem] font-bold text-white w-[80%] text-center ">
          月伝で自分のやり方を学びましょう。
        </p>
        <p className="TeamB_text-shadow italic lg:text-[1.7rem] font-bold text-[#67836B]  pb-10 lg:pb-15">
          Learn your way at Tsukiden.
        </p>
      </div>{" "}
      {/* End of header section */}
      <div
        className=" flex flex-col lg:flex-row lg:w-[90vw] 
      lg:m-auto lg:justify-center lg:mt-[2rem] items-center gap-[4rem] mt-[5rem] "
      >
        {" "}
        {/* Render courses section */}
        {courses.slice(0, 3).map((course, idx) => {
          return (
            // 1/11/2024

            <div
              key={idx}
              className="w-[95%] h-[300px] lg:max-w-[270px] shadow-sm rounded-[2rem]   bg-[#BCE8B1]"
            >
              {" "}
              {/* Render individual course card */}
              <div className="flex flex-col h-fit rounded-t-[2rem]  p-4  lg:p-5 2xl:px-2 lg:h-[35%] justify-center ">
                {" "}
                {/* Render course details */}
                <p className="text-[#278510] TeamB_text-shadow ">
                  Course {course.course_id}:
                </p>
                <p className="text-[#278510]  font-bold xl:text-[1.1rem]  line-clamp-1 TeamB_text-shadow">
                  {course.course_title}
                </p>
              </div>{" "}
              {/* End of course details */}
              <div className="relative pt-4 pb-10  px-4 text-justify h-[80%] lg:h-[65%] rounded-b-[2rem] rounded-t-[1rem] bg-[#87D275]">
                {" "}
                {/* Render course description */}
                <p className=" line-clamp-6 xl:line-clamp-6">
                  {course.course_description}
                </p>
                <button
                  className="text-[#1E6C0B] font-bold TeamB_text-shadow  absolute bottom-2"
                  onClick={() => {
                    setDashBoardHover((prev) => !prev);
                    setEditCourseId(course.course_id);
                  }}
                >
                  See more
                </button>
              </div>{" "}
              {/* End of course description */}
            </div> /* End of individual course card */
          );
        })}
      </div>{" "}
      {/* End of courses section */}
      {/* Render dashboard hover */}
      <div className="flex items-center justify-center ">
        {courses.map((course, idx) => {
          // Map through courses to render DashboardCardHover component
          const { course_id } = course;
          return (
            <div key={idx}>
              {dashBoardHover &&
                editCourseId === course_id && ( // Display DashboardCardHover component if dashBoardHover is true and editCourseId matches course_id
                  <DashboardCardHover
                    courseId={course_id}
                    closeDashHover={setDashBoardHover}
                  />
                )}
            </div>
          );
        })}
      </div>
    </div> // End of main container div
  );
};

export default DashboardCard; //Export DashboardCard component
// 1/23/2024
//comments by: Judes 02-19-24

/*January 10, 2024*/
//1/30/2024 junite, created modal show and hide UI and Functionalities for CourseList
//1/31/2024 junite, UI modifications
//2/1/2024 junite, UI modifications and functionalities, mockdata inserted and used for UI test
//2/2/2024 junite, UI modifications add background color for edit modal
//2/5/2024 junite, fixed UI spacing
//2/13-15/2024 junite, API Functionalities

import React, { useState, useEffect, useRef, useContext } from "react";
import { IoAdd } from "react-icons/io5";
import axios from "axios";
import { Link } from "react-router-dom";

//import mock data
import data from "../../mockData/CourselistCard.json";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CopyofCreateNewCourse from "./CopyofCreateNewCourse";

//import search icon
import { IoSearchSharp } from "react-icons/io5";

//import course context
import { CourseContext } from "../context/CourseContext";

//edit icon
import { FaEdit } from "react-icons/fa";
import CourseTitleModal from "./CourseModal/CourseTitleModal";

//close icon
import { IoMdClose } from "react-icons/io";
import Footer from "../Footer";

const CourseListCard = () => {
  // *NOTE
  //if data is coming from db use useState hook to store the data
  //sample: const [courses, setCourses] = useState([])

  const [courses, setCourses] = useState([]);

  const { showCreateCourse, setShowCreateCourse } = useContext(CourseContext);

  /* january 172024*/
  useEffect(() => {
    loadCourses();
    // loadChapter()
  }, []);

  //COURSES
  const loadCourses = async () => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/auth/getCourses"
    );
    setCourses(result.data);
  };

  console.log(courses);

  const [currentPage, setCurrentPage] = useState(1);
  const coursePerPage = 4;

  const indexOfLastCourse = currentPage * coursePerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursePerPage;
  const currentCourse = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const npage = Math.ceil(courses.length / coursePerPage);
  const pageTopRef = useRef(null);
  const handleChange = (event, value) => {
    setCurrentPage(value);
    pageTopRef.current.scrollIntoView();
  };

  ///mock data for UI Testing
  const { courselist } = data;

  //state for show and hide course edit title component
  const [showEditTitle, setShowEditTitle] = useState(false);

  //state for modal by id
  const [editCourseId, setEditCourseId] = useState(null);

  // Add a new state variable for modal visibility and position
  const [modalPosition, setModalPosition] = useState({
    visible: false,
    top: "50%",
    left: "50%",
  });

  const [searchQuery, setSearchQuery] = useState("");

  //Search
  // const filteredCourses = courses.filter((course) =>
  //   course.course_title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const filteredCourses = courses.filter(
    (course) =>
      typeof course.course_title === "string" &&
      course.course_title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [hideSearch, setHideSearch] = useState(false);

  // Ref for the search container
  const searchContainerRef = useRef(null);

  // Other state variables...

  // Hide search container when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setHideSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);
  // Initialize a count for chapters within this course
  let courseCount = 0;

  return (
    <>
      {/* 1/12/2024 UI development and Mobile responsiveness */}

      <div className="mt-[70px] h-[100vh] relative">
        {/* 1/15/2024 functions and buttons */}
        <div className="" ref={pageTopRef}>
          <div className="   w-[90%] flex mx-auto flex-col lg:center-row lg:w-[80vw] lg:m-auto lg:mt-5 items-center lg:h-full relative gap-4 lg:gap-5">
            {/*January 15 2024, API connection of frontend to backend can fetch data from the backend*/}
            <div className="text-black  w-[100%] lg:w-[60vw] lg:font-bold text-[.8rem]  lg:text-[2rem]  flex justify-between items-center mt-3">
              <p className="hidden lg:flex lg:font-bold TeamB_text-shadow">
                Course List
              </p>
              <div className="relative flex items-center h-full w-[100%]  lg:w-[300px]  bg-white outline-none rounded-md border-b-[.1rem] border-black">
                <input
                  type="text"
                  className="outline-none w-[100%] placeholder:font-thin placeholder:text-[1.2rem] font-normal pl-2 text-[1rem] lg:w-[300px]  h-[35px]  rounded-md"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={() => setHideSearch(true)}
                />
                <div className="absolute top-1 right-2">
                  <IoSearchSharp className="text-[1.5rem]" />
                </div>

                {hideSearch && (
                  <div
                    ref={searchContainerRef}
                    className="h-[20vh] w-[100%] absolute bg-[#fff] top-10 z-10 shadow-lg rounded-md pt-2"
                  >
                    <div className="flex justify-end w-full cursor-pointer">
                      <IoMdClose
                        onClick={() => setHideSearch(false)}
                        className="text-[1rem] mr-2"
                      />
                    </div>
                    <div className="h-[80%] overflow-auto TeamB_no-scrollbar mr-3">
                      {filteredCourses.length === 0 ? (
                        <div className="mt-4 text-center text-gray-600 text-[1rem]">
                          No results found
                        </div>
                      ) : (
                        filteredCourses.map((course, idx) => {
                          const { course_title } = course;
                          return (
                            <div key={idx} className="">
                              <Link
                                to={`/teambcourseoverview/${course.course_id}`}
                              >
                                <p className="text-[.9rem] pl-2 font-light TeamB_text-shadow cursor-pointer">
                                  {course_title}
                                </p>
                              </Link>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="lg:hidden TeamB_text-shadow w-[100%] text-[2rem] font-medium text-center">
              Course List
            </p>
            <div className="flex flex-col w-[100%] items-center justify-center h-full gap-y-5">
              {/* change to currentCourse for API connection */}
              {currentCourse.map((course, idx) => {
                courseCount++;
                return (
                  <div
                    key={idx}
                    className="w-[100%] lg:max-w-[60vw] rounded-md shadow-md "
                  >
                    <div className="relative flex px-0 py-0 rounded-md ">
                      <div className="bg-[#BCE8B1] flex py-3 item-center justify-center text-center text-[.8rem] lg:text-[1rem] w-[30%] lg:w-[20%] lg:p-5 rounded-l-sm lg:rounded-l-md">
                        <p className="flex items-center h-full lg:font-medium TeamB_text-shadow ">
                          {/* change to course_id for api connection */}
                          CC00{courseCount}
                        </p>
                      </div>
                      <Link
                        to={`/teambcourseoverview/${course.course_id}`}
                        className="text-white TeamB_text-shadow line-clamp-1 lg:font-bold text-[.8rem] w-full py-1 lg:py-0 lg:text-[1.2rem] flex justify-left px-3 items-center
                            rounded-r-sm lg:rounded-r-md 	bg-[#126912]  "
                      >
                        {/* change to course_title for api connection */}
                        <p className="w-[90%] line-clamp-1">
                          {course.course_title}
                        </p>
                      </Link>

                      <span
                        onClick={() => {
                          setShowEditTitle((prev) => !prev);
                          setEditCourseId(course.course_id);
                        }}
                        className="absolute cursor-pointer right-2 flex items-center h-full text-white text-[1.5rem]"
                      >
                        <FaEdit />
                      </span>
                      {showEditTitle && editCourseId === course.course_id && (
                        <div className="fixed top-0 left-0 z-10 h-full lg:w-full">
                          <div className="w-[100%]">
                            <CourseTitleModal
                              //  past courseTitle as props to set the value of input in CourseTitleModal

                              editTitle={setShowEditTitle}
                              courseId={course.course_id}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {courses.length < 4 ? (
              <></>
            ) : (
              <Stack spacing={2} className="">
                <Pagination
                  count={npage}
                  page={currentPage}
                  onChange={handleChange}
                />
              </Stack>
            )}
            {/* onClick={() => setShowCreateCourse((prev) => !prev)} */}

            <div className=" h-[8vh] flex w-[100%] m-auto lg:w-[50%]   items-center justify-center">
              <div
                className="bg-[#BCE8B1] w-[10%] cursor-pointer  flex items-center justify-center  rounded-l-sm lg:rounded-l-md h-10"
                onClick={() => setShowCreateCourse((prev) => !prev)}
              >
                <span>
                  <IoAdd className="lg:text-[2rem] text-white" />
                </span>
              </div>
              <div
                className="bg-[#126912] text-white lg:font-bold cursor-pointer h-10
                  w-[40%] md:w-[40%] lg:w-[30%]  flex items-center justify-center rounded-r-sm  lg:rounded-r-md"
                onClick={() => setShowCreateCourse((prev) => !prev)}
              >
                <span className=" TeamB_text-shadow">Add New Course</span>
              </div>
            </div>

            <div className="absolute ">
              <div className="lg:w-[1080px] ">
                {showCreateCourse && <CopyofCreateNewCourse />}
              </div>
            </div>
            {/*January 15 2024*/}
            {/*January 19 2024 -gem modify buttons add footer*/}
          </div>
        </div>
        {/*January 19 2024 -gem modify buttons add footer*/}
      </div>
    </>
  );
};

export default CourseListCard;
// /*January 23, 2024*/

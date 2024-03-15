/* eslint-disable react/prop-types */
//february 3 modification of ui and functionalities -gem
//2/5/2024 junite, fix UI spacing
//2/13-15/2024 junite, API Functionalities

import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";

import { IoAdd } from "react-icons/io5";
import ChapterModal from "../Chapter Modal/ChapterModal";
import DeleteChapterModal from "../Chapter Modal/DeleteChapterModal";
//edit icon
import { FaEdit } from "react-icons/fa";
//delete icon
import { RiDeleteBinLine } from "react-icons/ri";
import CopyofCreateChapterTitle from "./CopyofCreateChapterTitle";
import data from "../../mockData/CourseOverviewCard.json";
import Nav from "../NavBar/Nav";
import { CourseContext } from "../context/CourseContext";
//import search icon
import { IoSearchSharp } from "react-icons/io5";

//close icon
import { IoMdClose } from "react-icons/io";

const CourseOverviewById = ({ courseTitle }) => {
  const { courses, setCourses } = useContext(CourseContext);

  const [showChapModal, setShowChapModal] = useState(false);

  // const [chapters, setChapters] = useState([]);

  // const { showCreateChapter, setShowCreateChapter } = useContext(ChapterContext);

  //user params to navigate specific id
  let { id } = useParams();

  useEffect(() => {
    loadChapters();
    loadChapter();
  }, [id]);

  const loadChapters = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/v1/auth/course/${id}`
      );

      // Ensure that result.data is always an array by converting it
      const coursesArray = Array.isArray(result.data)
        ? result.data
        : [result.data];
      setCourses(coursesArray);
    } catch (error) {
      console.error("Error loading chapters:", error);
    }
  };

  const [loadByChapter, setLoadByChapter] = useState([]);
  const loadChapter = async () => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/auth/getChapter"
    );
    setLoadByChapter(result.data);
  };
  // console.log(courses);

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState(null);

  // console.log(loadByChapter);

  const [searchQuery, setSearchQuery] = useState("");

  // // Search
  // const filteredChapter = loadByChapter.filter((chap) =>
  //   chap.chapter_title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const filteredChapter = loadByChapter.filter(
    (chap) =>
      typeof chap.chapter_title === "string" &&
      chap.chapter_title.toLowerCase().includes(searchQuery.toLowerCase())
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

  const [editChapterTitle, setEditChapterTitle] = useState(null);
  const [deleteCHapterTitle, setDeleteChapterTitle] = useState(null);

  const deleteAllTopics = async () => {
    try {
      // Iterate over all chapters
      for (const chap of loadByChapter) {
        const { topic } = chap;
        // Iterate over all topics in the chapter
        for (const tops of topic) {
          const { topic_id } = tops;
          // Send delete request for each topic
          await axios.delete(
            `http://localhost:8080/api/v1/auth/topic/${topic_id}`
          );
        }
      }
      // After deleting all topics, you may want to reload the chapters
      loadChapters();
    } catch (error) {
      console.error("Error deleting topics:", error);
    }
  };

  const handleDeleteChapter = async (chapterId) => {
    const deleteChapter = await axios.delete(
      `http://localhost:8080/api/v1/auth/chapter/${chapterId}`
    );
    setLoadByChapter(deleteChapter.data);
  };

  return (
    <>
      <div className="w-full h-full">
        <div className=" m-0 lg:max-w-[1920px] lg:flex lg:flex-col lg:justify-center">
          <div className="">
            <div className="w-full  lg:w-[800px] ">
              <div className="text-black w-[100%] lg:font-bold text-[.8rem]  lg:text-[2rem]  lg:flex lg:items-center flex flex-row justify-between">
                <p className="hidden lg:flex lg:font-bold TeamB_text-shadow lg:text-[2.5rem] text-[1.3rem] w-[60%] overflow-x-auto TeamB_no-scrollbar mb-2 cursor-pointer">
                  {courseTitle}
                </p>

                <div className="relative flex items-center h-full w-[100%] lg:w-[300px] 2xl:w-[544px] 2xl:h-[53px] bg-white outline-none rounded-md border-b-[.1rem] border-black">
                  <input
                    type="text"
                    className="outline-none w-[100%]   placeholder:font-thin placeholder:text-[1.2rem] font-normal pl-2 text-[1rem] lg:w-[300px] 2xl:w-[544px] h-[35px] 2xl:h-[53px] rounded-md"
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
                        {filteredChapter.length === 0 ? (
                          <div className="mt-4 text-center text-gray-600 text-[1rem]">
                            No results found
                          </div>
                        ) : (
                          courses.map((course, idx) => {
                            const { chapter } = course;
                            return (
                              <div key={idx} className="">
                                {filteredChapter.map((chapter, idx) => {
                                  const { chapter_title, chapter_id } = chapter;
                                  return (
                                    <div key={idx}>
                                      <Link
                                        to={`/teambtopicpage/${chapter_id}`}
                                      >
                                        <p className="text-[.9rem] pl-2 font-light TeamB_text-shadow cursor-pointer line-clamp-1">
                                          {chapter_title}
                                        </p>
                                      </Link>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:text-[2rem] w-full flex justify-center">
                <p className="flex lg:hidden 2xl:text-[48px]  text-[20px] font-bold TeamB_text-shadow p-3">
                  Course Overview
                </p>
              </div>
              <p className="flex lg:hidden font-bold TeamB_text-shadow lg:text-[2.5rem] text-[1.3rem] pb-3 line-clamp-1">
                {courseTitle}
              </p>
              <div className="w-full bg-[#BCE8B1] h-[2vh] items-center rounded-lg lg:rounded-lg">
                <div className="max-w-[30%] bg-[#126912] h-[2vh] rounded-lg lg:rounded-lg"></div>
              </div>
              <div className="w-[95%] font-medium pt-1 pb-3 text-[1.4rem] lg:text-[1.4rem] 2xl:text-[36px] lg:m-auto lg:pt-2 lg:pb-4 ">
                <span className=" TeamB_text-shadow">Lessons</span>
              </div>
              <div className="h-[45vh] lg:w-full overflow-y-auto overflow-x-hidden TeamB_no-scrollbar ">
                {courses.map((course) => {
                  const { chapter, idx } = course;
                  return (
                    <div key={idx}>
                      {courses.map((course) => {
                        const { chapter, idx, course_id } = course;
                        // Initialize a count for chapters within this course
                        {
                          /* let chapterCount = 0; */
                        }
                        return (
                          <div key={idx}>
                            {chapter.map((chap, idx) => {
                              const { chapter_id, chapter_title } = chap;
                              // Increment the chapter count for each chapter
                              {
                                /* chapterCount++; */
                              }
                              return (
                                <div
                                  key={idx}
                                  className="relative m-0 lg:w-full"
                                >
                                  <div className="flex items-center justify-center w-full gap-4 pb-4 m-auto">
                                    <div className="h-[1.3rem] w-[1.3rem] bg-[#126912] rounded-[100%] hidden lg:flex"></div>

                                    <Link
                                      to={`/teambtopicpage/${chapter_id}`}
                                      className="relative 2xl:rounded-[20px] w-[60vw] rounded-lg  lg:flex lg:items-center lg:font-medium lg:text-[1rem] 2xl:text-[24px] bg-[#126912] py-1  text-[.8rem]  text-white lg:rounded-[1rem] line-clamp-1"
                                    >
                                      {/* <p className="text-shadow">
                                        CHAPTER {chapterCount}:
                                      </p> */}
                                      <p className="w-[90%] pl-2 lg:font-medium lg:text-[1.3rem] text-shadow overflow-x-auto line-clamp-1">
                                        {chapter_title}
                                      </p>

                                      <Link className="absolute hidden right-2 lg:flex">
                                        <div className="flex items-center gap-2 pl-2 cursor-pointer">
                                          <div
                                            className="text-[1.3rem] 2xl:text-[2rem]  text-white"
                                            onClick={() => {
                                              setEditModalVisible(
                                                (prev) => !prev
                                              );
                                              setEditChapterTitle(chapter_id);
                                            }}
                                          >
                                            <FaEdit />
                                          </div>

                                          <div
                                            className="text-[1.3rem] 2xl:text-[2rem]  text-white"
                                            onClick={() => {
                                              setDeleteModalVisible(
                                                (prev) => !prev
                                              );
                                              setDeleteChapterTitle(chapter_id);
                                            }}
                                          >
                                            <RiDeleteBinLine />
                                          </div>
                                        </div>
                                      </Link>
                                    </Link>
                                    <Link className="flex right-2 lg:hidden">
                                      <div className="flex items-center gap-2 cursor-pointer pl-2- ">
                                        <div
                                          className="text-[1.3rem] 2xl:text-[2rem]  text-black"
                                          onClick={() => {
                                            setEditModalVisible(
                                              (prev) => !prev
                                            );
                                            setEditChapterTitle(chapter_id);
                                          }}
                                        >
                                          <FaEdit />
                                        </div>

                                        <div
                                          className="text-[1.3rem] 2xl:text-[2rem]  text-black"
                                          onClick={() =>
                                            setDeleteModalVisible(
                                              (prev) => !prev
                                            )
                                          }
                                        >
                                          <RiDeleteBinLine />
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {editModalVisible && (
            <div className="w-full">
              {courses.map((course, idx) => {
                const { chapter, course_title } = course;
                console.log(course_title);
                return (
                  <div key={idx}>
                    {chapter.map((chap, idx) => {
                      const { topic, chapter_title, chapter_id } = chap;
                      return (
                        <div key={idx}>
                          {editModalVisible &&
                            editChapterTitle === chapter_id && (
                              <ChapterModal
                                editTitle={setEditModalVisible}
                                chapterId={chapter_id}
                              />
                            )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
          {deleteModalVisible && (
            <div className="fixed w-full h-full pl-10 top-9 left-20">
              <div className="lg:w-[1080px] ">
                {courses.map((course, idx) => {
                  const { chapter } = course;
                  return (
                    <div key={idx}>
                      {chapter.map((chap, idx) => {
                        const { chapter_id, chapter_title } = chap;
                        return (
                          <div key={idx}>
                            {deleteModalVisible &&
                              deleteCHapterTitle === chapter_id && (
                                <DeleteChapterModal
                                  chapterId={chapter_id}
                                  chapterTitle={chapter_title}
                                  deleteChap={handleDeleteChapter}
                                  showDeleteModal={setDeleteModalVisible}
                                />
                              )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="w-full lg:w-[12rem] m-auto lg:flex lg:justify-center lg:items-center  p-2">
            {/*add new chapter title */}
            <div className="lg:rounded-[.5rem] lg:h-[35px] 2xl:h-[10px] flex items-center justify-center cursor-pointer  mx-2 my-2 bg-[#BCE8B1]">
              <button
                className="flex items-center justify-center lg:w-[155px]  2xl:w-[481px ]"
                onClick={() => setShowChapModal((prev) => !prev)}
              >
                <span className="pr-1">
                  <IoAdd className="text-[2rem] lg:text-[1.5rem] text-white" />
                </span>
                <span className="text-shadow lg:text-[1rem] lg:font-bold 2xl:text-[24px]  text-[#070101] text-opacity-[55%] pr-1">
                  Chapter Title
                </span>
              </button>
            </div>

            <div className="lg:rounded-[.5rem] lg:h-[35px] 2xl:h-[10px] flex items-center justify-center cursor-pointer mx-2 my-2 bg-[#BCE8B1]">
              <button
                className="flex items-center justify-center lg:w-[155px]  2xl:w-[481px]"
                onClick={() => setShowChapModal((prev) => !prev)}
              >
                <span className="pr-1">
                  <IoAdd className="text-[2rem] lg:text-[1.5rem] text-white" />
                </span>
                <Link to="/addquiz">
                  <span className="text-shadow lg:text-[1rem] lg:font-bold 2xl:text-[24px]  text-[#070101] text-opacity-[55%] pr-1">
                    Assessment
                  </span>
                </Link>
              </button>
            </div>

            <div className="w-full ">
              {showChapModal && (
                <div>
                  {courses.map((course, idx) => {
                    const { course_id } = course;
                    return (
                      <div key={idx}>
                        <CopyofCreateChapterTitle
                          courseId={course_id}
                          showModal={setShowChapModal}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        {/*  </div> */}
      </div>
    </>
  );
};

export default CourseOverviewById;
//february 3 modification of ui and functionalities -gem

//february 2 2024 creation of this page and UI -gem
//february 3 modification of ui and functionalities -gem

//display chapter title

import React, { useState, useEffect } from "react";
import axios from "axios";

//import mockdata
import data from "../../mockData/CourseOverviewCard.json";

//back icon and back function
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CreateNewChapterTitle = () => {
  /*January 17 2023 API connection from backend to front end displaying data */

  const [chapter, setChapter] = useState({
    // chapter_id: "",
    chapter_title: "",
  });

  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    loadChapters();
  }, []);

  const loadChapters = async () => {
    const result = await axios.get(`http://localhost:8080/api/courses`);
    setChapters(result.data);
  };

  // const handleInputChange = (e) => {
  //   setChapter({ ...chapter, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted:", chapter);
  //   await axios.post(`http://localhost:8080/api/courses`, chapter);
  //   navigate(-1);
  // };
  //mockdata chapter destructure
  const { chapterlist } = data;

  //back function
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  console.log(chapters);

  return (
    <>
      {/* January 19 2024 -gem modify responsiveness */}
      <div className="relative w-full h-full mt-[70px]  ">
        <div className="relative w-full h-full mt-5 ">
          <div
            className="absolute left-2 top-0 flex items-center cursor-pointer w-[10%]"
            onClick={goBack}
          >
            <span className="text-[2.5rem]">
              <IoArrowBackCircle />
            </span>
            <span className="text-[1rem] pl-1">Back</span>
          </div>
          <div className="h-full w-[90%] mt-10 flex mx-auto flex-col lg:w-[70%] lg:m-auto lg:mt-5 items-center gap-5">
            <div className="lg:font-bold py-1 lg:py-0 lg:text-[2rem] w-full flex justify-center items-center">
              <p className="mb-2 lg:font-bold TeamB_text-shadow ">
                Create New Chapter Title
              </p>
            </div>
            <div>
              <div className="pb-2 w-[100%] mt-10 flex mx-auto flex-col lg:text-[1.5rem] lg:right-row lg:w-[98%] lg:m-auto lg:mt-5 items-right">
                <p className="lg:font-bold TeamB_text-shadow ">HTML And CSS</p>
              </div>
              <div className="w-[69vw] bg-[#BCE8B1] h-[2vh] items-center lg:rounded-lg">
                <div className="w-[20vw] bg-[#126912] h-[2vh] lg:rounded-lg"></div>
              </div>
              <div className="w-[98%] font-medium text-[1.4rem] 2xl:text-[36px] m-auto pt-2">
                <span className=" TeamB_text-shadow">Lessons</span>
              </div>
            </div>

            {chapterlist.map((chapter, idx) => {
              return (
                <div
                  key={idx}
                  className="flex 2xl:w-[1186px] 2xl:h-[65px] lg:w-[80%] justify-between items-center"
                >
                  <div className="h-[1.5rem] w-[1.5rem] bg-[#126912] rounded-[100%]"></div>
                  <div
                    className=" 2xl:rounded-[20px] lg:flex lg:items-center lg:font-medium lg:text-[1rem] 2xl:text-[24px] w-[90%] bg-[#126912]  py-1 text-center text-[.8rem]  lg:p-5 text-white
              lg:h-[50px] lg:rounded-[1rem]"
                  >
                    <p className="TeamB_text-shadow ">
                      CHAPTER {chapter.chapterId}:
                    </p>
                    <p className="pl-2 lg:font-medium TeamB_text-shadow ">
                      {chapter.chapterTitle}
                    </p>
                  </div>
                </div>
              );
            })}
            {/*footer */}
            <div>
              <footer className="flex justify-center p-10">
                <div>
                  <p className="text-[#4D9349] font-medium">
                    All Rights Reserved | Copyright 2024
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewChapterTitle;

//february 2 2024 creation of this page and UI -gem
//february 3 modification of ui and functionalities -gem

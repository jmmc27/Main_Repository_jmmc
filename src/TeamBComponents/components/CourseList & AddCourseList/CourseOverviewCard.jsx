/* eslint-disable react/prop-types */
//2/3/2024 junite, fix course title and search bar width
//2/13/2024 junite, API Functionalities

import React, { useState } from "react";

//import search icon
import { IoSearchSharp } from "react-icons/io5";

import CourseOverviewById from "./CourseOverviewById";
import Nav from "../NavBar/Nav";
import { Link, useNavigate } from "react-router-dom";

import { IoArrowBackCircle } from "react-icons/io5";
import Footer from "../Footer";

const CourseOverviewCard = ({ courseTitle }) => {
  const [chapter, setChapter] = useState({
    // chapter_id: "",
    chapter_title: "",
  });
  /*January 17 2023 API connection from backend to front end displaying data */

  //mockdata chapter

  //back function
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  //react hook for edit and save chapter title
  const [showSave, setShowSave] = useState(false);
  const [showEdit, setShowEdit] = useState(true);

  const handleEdit = () => {
    setShowSave(true);
    setShowEdit(false);
  };
  const handleSave = () => {
    setShowEdit(true);
    setShowSave(false);
  };

  return (
    <>
      {/*January 19 2024 -gem modify responsiveness*/}

      <div className="relative w-full m-auto h-[100vh] mt-[70px]  ">
        <div className="relative w-full h-full m-auto ">
          <div className="w-[100%] pb-5 mt-10 flex mx-auto flex-col lg:center-row lg:w-[100%] lg:m-auto  items-center  ">
            <div className=" w-[100%] justify-between hidden lg:flex">
              <Link
                to="/teambcourselist"
                className=" items-center cursor-pointer w-[10%] absolute left-0 top-[-.3rem]  hidden lg:flex pb-4"
              >
                <span className="text-[2.5rem] text-black px-5">
                  <IoArrowBackCircle />
                </span>
              </Link>
              <div className="lg:text-[2rem] w-full flex justify-center">
                <p className=" 2xl:text-[48px] lg:font-bold TeamB_text-shadow">
                  Course Overview
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <CourseOverviewById courseTitle={courseTitle} />
            </div>

            {/* <div>
              <EditChapterTitle/>
            </div> */}
            {/*January 19 2024 -gem modify responsiveness*/}
            {/*January 17 2023 API connection from backend to front end displaying data */}
            {/*January 19 2024 -gem modify buttons add footer*/}

            {/*January 19 2024 -gem modify buttons add footer*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseOverviewCard;
// 1/19/2024

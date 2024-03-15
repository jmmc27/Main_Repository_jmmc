//  1/30/2024 fix margin top for profile container

import React, { useContext, useState, useEffect } from "react";
import PersonalInfo from "./PersonalInfo";
import AccDetails from "./AccDetails";

//arrow back icon
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

import { ProfileContext } from "../context/ProfileContext";
import PersonalEdit from "./PersonalEdit";
import Nav from "../NavBar/Nav";
import axios from "axios";

const Profile = () => {
  //use navigate to back
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  //2-17-24
  const [instructors, setInstructors] = useState([]);

  const [instructor, setInstructor] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    const loadInstructors = async () => {
      const result = await axios.get("http://localhost:8080/api/v1/auth/users");
      setInstructors(result.data);
    };

    loadInstructors();
  }, []);
  console.log(instructors);

  // const handleInputChange = (e) => {
  //   setInstructor({ ...instructor, [e.target.name]: e.target.value });
  // };

  // const {
  //   instructor_first_name,
  //   instructor_last_name,
  //   instructor_email,
  //   instructor_contact_number,
  // } = instructor;

  //2-17-24

  //destructure profile context
  const {
    showPersonalInfo,
    showAccDetails,
    showPInfo,
    showADetails,
    accDetails,
    setAccDetails,
  } = useContext(ProfileContext);
  return (
    <>
      <Nav />
      <div className="h-[100vh] mt-[65px]">
        <div>
          {/* Use react icon instead of word back */}
          <div
            className="flex items-center mt-3 cursor-pointer pl-1 lg:px-5 w-[10%]"
            onClick={goBack}
          >
            <span className="text-[2.5rem]">
              <IoArrowBackCircle />
            </span>
          </div>
        </div>
        {/* 1/11/2024 fix nav */}
        <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-5 lg:mt-1 ">
          <div className=" lg:w-[20%] lg:h-[200px] lg:shadow-lg lg:bg-[#BCE8B1] lg:flex lg:items-center lg:flex-col lg:rounded-md">
            <p className="lg:p-5 text-[2rem] lg:text-[1.2rem]  font-bold text-[#4D4141] opacity-[80%] text-center lg:text-start">
              Profile Management
            </p>

            <div className="hidden lg:flex lg:border-b-2 lg:border-black w-[90%]"></div>
            {/* Make Personal Information & Acc Details clickable */}
            {/* When element Personal Info clicked, must navigate to Personal Info Component same as Acc Details */}
            {/* Use react icon instead of plain text for better UI in mobile and desktop */}
            {/* In desktop mode when hovered a text Personal Information must show, same as Account Details */}
            <div className="flex lg:flex-col w-[100%] lg:w-full items-center justify-center gap-x-5 py-2 lg:py-0">
              <p
                className={
                  showPersonalInfo
                    ? "cursor-pointer p-1 rounded-md lg:mt-2 lg:p-2 lg:text-[1.2rem]  text-[#000000] opacity-[53%] bg-[#126912] lg:w-[100%] lg:text-center bg-opacity-[25%] "
                    : "cursor-pointer p-1 rounded-md lg:mt-2 lg:p-2 lg:text-[1.2rem]  text-[#4D4141] hover:text-[#000000] opacity-[53%] lg:w-[100%] lg:text-center "
                }
                onClick={showPInfo}
              >
                Personal Information
              </p>
              <p
                className={
                  showAccDetails
                    ? "cursor-pointer p-1 rounded-md lg:text-[1.2rem]  lg:p-2 text-[#000] opacity-[53%] bg-[#126912] lg:w-[100%] lg:text-center bg-opacity-[25%]"
                    : "cursor-pointer p-1 rounded-md lg:text-[1.2rem]  lg:p-2 text-[#4D4141] hover:text-[#000] opacity-[53%]  lg:w-[100%] lg:text-center "
                }
                onClick={showADetails}
              >
                Account Details
              </p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-start">
            {/* Place your Component here */}
            {showPersonalInfo &&
              accDetails.map((acc, idx) => {
                const { email } = acc;
                return (
                  <div key={idx} className="w-[100%] flex justify-center">
                    <PersonalInfo userEmail={email} />
                  </div>
                );
              })}

            {showAccDetails &&
              accDetails.map((acc, idx) => {
                const { email, userName } = acc;
                return (
                  <div key={idx} className="w-[100%] flex justify-center">
                    <AccDetails email={email} userName={userName} />
                  </div>
                );
              })}

            {/* /* Place AccDetails Component here */}
            {/* <AccDetails/> */}
          </div>
        </div>
        <div className="pt-20">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Profile;

//1/17/2024

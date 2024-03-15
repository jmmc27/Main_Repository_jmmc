// 1/31/2024 from junite, to ced. TODO
//Only show

import React, { useContext } from "react"; // Importing React and useContext hook
import logo from "../../../assets/TeamBassests/companyLogo.png"; // Importing logo image
//import react icon
import { GiHamburgerMenu } from "react-icons/gi";
import NavSideBar from "./NavSideBar"; // Importing NavSideBar component
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom
import { CgProfile } from "react-icons/cg"; // Importing CgProfile icon component
import { MdOutlineLogout } from "react-icons/md"; //// Importing MdOutlineLogout icon component
//import profile logo image file
import profileLogo from "../../../assets/TeamBassests/Picture.png";
import ProfileModal from "../../../TeamAComponents/components/ProfileModal";
//importing react icon
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

//Importing NavBarContext from context
import { NavBarContext } from "../context/NavBarContext";
import { ProfileContext } from "../context/ProfileContext";

import { useAuth } from "../../../TeamAComponents/components/AuthContext";
import { useState } from "react";
//Nav functional component
const Nav = ({showModal, handleClose}) => {
  //Destructuring values from NavBarContext
  const {
    header,
    dashBoardShow,
    profileShow,
    courseListShow,
    showDropDown,
    setShowDropDown,
    showLogout,
    show,
    setShow,
    showLogo,
    showDashBoard,
    showProfile,
    showCourseList,
    showForum,
    forumShow,
    logout,
    setForumShow,
  } = useContext(NavBarContext);

  const { users, file } = useContext(ProfileContext);
  const [showProfileModal, setShowProfileModal] = useState(false); // State to control the visibility of the profile modal

  const openProfileModal = () => {
    setShowProfileModal(true); // Function to open the profile modal
  };

  const closeProfileModal = () => {
    setShowProfileModal(false); // Function to close the profile modal
  };

  // const { firstName, lastName, email } = users;
  const [showLogoutConfirmationModal, setShowLogoutConfirmationModal] =
    useState(false);
  const { handleLogout } = useAuth();

  const handleConfirmLogout = () => {
    handleLogout();
    setShowLogoutConfirmationModal(false);
    navigate("/"); // Use navigate function to redirect
  };

  const handleOpenLogoutConfirmationModal = () => {
    setShowLogoutConfirmationModal(true);
  };

  const handleCloseLogoutConfirmationModal = () => {
    setShowLogoutConfirmationModal(false);
  };

  const userName = localStorage.getItem("username");
  const firstname = localStorage.getItem("firstName");
  const lastname = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

  return (
    <>
      {/* Navigation bar */}
      <nav className="fixed w-full top-0 z-[100] ">
        <div
          className={
            header
              ? "relative flex justify-between items-center lg:justify-normal bg-[#D9FFCF] h-[69px] transition-all "
              : "relative flex justify-between items-center lg:justify-normal bg-transparent h-[69px] transition-all "
          }
        >
          {/* Link to Dashboard*/}
          <Link to="/teambdashboard" className="">
            <img
              className=""
              src={logo}
              alt="tsukidenLogo"
              width={171.67}
              height={50}
              onClick={showLogo}
            />
            {/* January 30, 2024 - Cedrick - Fixed the style of the nav bar according to the design of team D */}
          </Link>
          <div className="hidden lg:flex lg:items-end  lg:pl-10 lg:min-w-[400px] lg:justify-between gap-5">
            {/* 1/11/2024 */}
            {/* Link to dashboard */}
            <Link to="/teambdashboard" onClick={showDashBoard}>
              <ul
                className={
                  dashBoardShow
                    ? "font-semibold text-[#116211] text-center p-1 TeamB_text-shadow   transition-all"
                    : "font-bold TeamB_text-shadow   p-1  hover:text-[#116211] transition-all hover:bg-opacity-[50%] hover:font-semibold "
                }
              >
                Dashboard
              </ul>
            </Link>
            {/* Link to course list */}
            <Link to="/teambcourselist" onClick={showCourseList} className="">
              <ul
                className={
                  courseListShow
                    ? "font-semibold text-[#116211] text-center p-1 TeamB_text-shadow   transition-all"
                    : "font-bold TeamB_text-shadow   p-1  hover:text-[#116211] hover:bg-opacity-[50%] hover:font-semibold transition-all"
                }
              >
                Course List
              </ul>
            </Link>
            {/* Link to forum */}
            <Link to="/ForumFInstructor" onClick={showForum}>
              <ul
                className={
                  forumShow
                    ? "font-semibold text-[#116211] text-center p-1 TeamB_text-shadow   transition-all"
                    : "font-bold TeamB_text-shadow   p-1  hover:text-[#116211] transition-all hover:bg-opacity-[50%] hover:font-semibold "
                }
              >
                Forums
              </ul>
            </Link>
          </div>
          {/* Hamburger menu for mobile view */}
          <div className="relative flex items-center justify-end lg:hidden">
            {show ? (
              <div className="flex w-[250px]">
                <div
                  onClick={() => setShow((prev) => !prev)}
                  className="w-[250px] TeamB_text-shadow gap-x-4 py-2 px-4 bg-[#bce8b1] rounded-[.5rem] shadow-lg flex justify-center items-center lg:hidden"
                >
                  <img
                    className="h-[40px] w-[40px] rounded-[50%] border-2 border-green-800"
                    src={file}
                    alt="profileLogo"
                  />
                  <div className="text-[.8rem] leading-3">
                    <p>
                      {firstname} {lastname}
                    </p>
                    <p>{email}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pr-2">
                <img
                  className="h-[40px] w-[40px] rounded-[50%] border-2 border-green-800"
                  src={file}
                  height={40}
                  width={40}
                  alt="profileLogo"
                  onClick={() => setShow((prev) => !prev)}
                />
              </div>
            )}
          </div>

          {/* Profile dropdown */}
          <div className="drop-shadow-lg shadow-lg w-[150px] bg-[#ffffff] mr-2 cursor-pointer lg:text-[1rem] rounded-md ml-auto hidden border-lime-900 border-[.1rem] lg:flex justify-between items-center p-1 text-[#126912]">
            <div className="flex items-center justify-center gap-x-1">
              <img
                src={file}
                alt=""
                className="h-[30px] w-[30px] rounded-[50%]"
                onClick={() => setShowDropDown((prev) => !prev)}
              />
              <p
                onClick={() => setShowDropDown((prev) => !prev)}
                className="text-[15px] ml-2"
              >
                Hi,
              </p>
              <span
                className="w-[50px] line-clamp-1"
                onClick={() => setShowDropDown((prev) => !prev)}
              >
                {userName}
              </span>

              <span
                onClick={() => setShowDropDown((prev) => !prev)}
                className="cursor-pointer"
              >
                {showDropDown ? <FaChevronUp /> : <FaChevronDown />}
              </span>
              {/* Dropdown content */}
              {showDropDown && (
                <div className="bg-[#D9FFCF] absolute right-0 top-12 lg:top-10 w-full flex flex-col justify-between rounded-md items-center border-solid border-[1px] border-[#116211]">
                  {/* Link to profile */}
                  <Link
                    to="#"
                    onClick={openProfileModal}
                    className="w-full text-center "
                  >
                    <p
                      className={
                        profileShow
                          ? showDropDown
                            ? " text-[#116211] rounded-md text-start p-1 transition-all bg-[#D9FFCF]   p-1-shadow  "
                            : ""
                          : showDropDown
                          ? " text-[#000000] rounded-md text-start p-1  hover:text-[#116211]"
                          : ""
                      }
                    >
                      <CgProfile className="text-[20px] inline-block align-start mr-3 " />
                      Profile
                      
                    </p>
                    <ProfileModal
                      showModal={showProfileModal}
                      handleClose={closeProfileModal}
                    />
                    
                  </Link>
                  {/* Link to logout */}
                  <Link
                    src="CgProfile"
                    onClick={handleOpenLogoutConfirmationModal}
                    className="w-full text-center "
                  >
                    <p
                      className={
                        logout
                          ? showDropDown
                            ? " text-red-600 hover:text-red-500 text-start transition-all rounded-md  p-1  hover:bg-opacity-[50%] "
                            : ""
                          : showDropDown
                          ? " text-red-600 rounded-md text-start p-1 bg-[#D9FFCF]  hover:text-red-500"
                          : " "
                      }
                    >
                      <MdOutlineLogout className=" text-[20px] inline-block align-middle mr-3 " />
                      Log out
                    </p>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        {show && (
          <div className="absolute flex justify-end w-full top-[4.3rem] lg:hidden backdrop-blur-[.1rem]">
            <NavSideBar />
          </div>
        )}
      </nav>
      {showLogoutConfirmationModal && (
        <div
          className="logoutmodal-overlay"
          onClick={handleCloseLogoutConfirmationModal}
        >
          <div className="label-container">
            <div className="container-under">
              <div className="auth-label">
                <h1>Logout Confirmation</h1>
              </div>
              <div className="logoutmodal">
                <h2>Are you sure you want to log out?</h2>
                <div>
                  <button onClick={handleConfirmLogout}>Yes</button>
                  <button onClick={handleCloseLogoutConfirmationModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ProfileModal showModal={showModal} />
    </>
  );
};

export default Nav; // Exporting the Nav component as default
//comments by: Judes 02-19-24

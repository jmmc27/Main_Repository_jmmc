import React, { useContext } from "react"; // Importing React and useContext hook from React library

//import react icon
import { RxCross2 } from "react-icons/rx"; // Importing RxCross2 icon from the react-icons/rx package
import { NavBarContext } from "../context/NavBarContext"; // Importing NavBarContext from "../context/NavBarContext"
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom

const NavSideBar = () => {
  //create a react hook for showing and hiding element
  //hide an element when cross icon is clicked

  const {
    header,
    dashBoardShow,
    profileShow,
    courseListShow,
    showDropDown,
    setShowDropDown,
    logout,
    showLogout,
    show,
    setShow,
    showLogo,
    showDashBoard,
    showProfile,
    showCourseList,
    showForum,
    forumShow,
    setForumShow,
  } = useContext(NavBarContext);

  return (
    <div className="w-[250px] h-[100vh] bg-[#bce8b1] bg-opacity-[80%] ">
      <div className="flex flex-col items-center justify-center lg:hidden gap-x-2">
        <div className="w-full pl-5 mt-3 text-[1.3rem]">
          <Link to="/teambprofile" onClick={showProfile}>
            <ul
              className={
                profileShow
                  ? "font-semibold text-[#116211]  p-1 TeamB_text-shadow   transition-all"
                  : "font-bold TeamB_text-shadow   p-1   hover:text-[#116211] transition-all hover:bg-opacity-[50%] hover:font-semibold "
              }
            >
              Profile
            </ul>
          </Link>
          {/* 1/11/2024 */}
          <Link to="/teambdashboard" onClick={showDashBoard}>
            <ul
              className={
                dashBoardShow
                  ? "font-semibold text-[#116211]  p-1 TeamB_text-shadow   transition-all"
                  : "font-bold TeamB_text-shadow   p-1   hover:text-[#116211] transition-all hover:bg-opacity-[50%] hover:font-semibold "
              }
            >
              Dashboard
            </ul>
          </Link>
          <Link to="/teambcourselist" onClick={showCourseList}>
            <ul
              className={
                courseListShow
                  ? "font-semibold text-[#116211]   p-1 TeamB_text-shadow   transition-all"
                  : "font-bold TeamB_text-shadow   p-1  hover:text-[#116211] hover:bg-opacity-[50%] hover:font-semibold transition-all"
              }
            >
              Course List
            </ul>
          </Link>
          <Link to="/ForumFInstructor" onClick={showForum}>
            <ul
              className={
                forumShow
                  ? "font-semibold text-[#116211]  p-1 TeamB_text-shadow   transition-all"
                  : "font-bold TeamB_text-shadow   p-1  hover:text-[#116211] transition-all hover:bg-opacity-[50%] hover:font-semibold "
              }
            >
              Forums
            </ul>
          </Link>
          <Link to="/" onClick={showLogout}>
            <ul
              className={
                logout
                  ? "font-semibold text-[#116211]  p-1 TeamB_text-shadow   transition-all"
                  : "font-bold TeamB_text-shadow   p-1  hover:text-[#116211] transition-all hover:bg-opacity-[50%] hover:font-semibold "
              }
            >
              Log Out
            </ul>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavSideBar;

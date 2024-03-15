import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { NavBarContext } from "../context/NavBarContext";
import ProfileModal from "../../../TeamAComponents/components/ProfileModal";
const NavSideBar = ({showModal, handleClose}) => {
  const {
 // Destructure showProfileModal from NavBarContext
    showDashBoard,
    showCourseList,
    showForum,
    showLogout,
    dashBoardShow,
    courseListShow,
    forumShow,
    logout,
  } = useContext(NavBarContext);

  const [showProfileModal, setShowProfileModal] = useState(false); // State to control the visibility of the profile modal

  const openProfileModal = () => {
    setShowProfileModal(true); // Function to open the profile modal
  };

  const closeProfileModal = () => {
    setShowProfileModal(false); // Function to close the profile modal
  };


  return (
    <div className="w-[250px] h-[100vh] bg-[#bce8b1] bg-opacity-[80%] ">
      <div className="flex flex-col items-center justify-center lg:hidden gap-x-2">
        <div className="w-full pl-5 mt-3 text-[1.3rem]">
          {/* Link to trigger ProfileModal */}
          <Link to="#" onClick={openProfileModal}>
            Profile
          </Link>
          <ProfileModal
             showModal={showProfileModal}
             handleClose={closeProfileModal}
             />
          <Link to="/teambdashboard" onClick={showDashBoard}>
            <ul
              className={
                dashBoardShow
                  ? "font-semibold text-[#116211] p-1 TeamB_text-shadow transition-all"
                  : "font-bold TeamB_text-shadow p-1 hover:text-[#116211] transition-all hover:bg-opacity-[50%] hover:font-semibold "
              }
            >
              Dashboard
            </ul>
          </Link>
          <Link to="/teambcourselist" onClick={showCourseList}>
            <ul
              className={
                courseListShow
                  ? "font-semibold text-[#116211] p-1 TeamB_text-shadow transition-all"
                  : "font-bold TeamB_text-shadow p-1 hover:text-[#116211] hover:bg-opacity-[50%] hover:font-semibold transition-all"
              }
            >
              Course List
            </ul>
          </Link>
          <Link to="/ForumFInstructor" onClick={showForum}>
            <ul
              className={
                forumShow
                  ? "font-semibold text-[#116211] p-1 TeamB_text-shadow transition-all"
                  : "font-bold TeamB_text-shadow p-1 hover:text-[#116211] transition-all hover:bg-opacity-[50%] hover:font-semibold "
              }
            >
              Forums
            </ul>
          </Link>
          <Link to="/" onClick={showLogout}>
            <ul
              className={
                logout
                  ? "font-semibold text-[#116211] p-1 TeamB_text-shadow transition-all"
                  : "font-bold TeamB_text-shadow p-1 hover:text-[#116211] transition-all hover:bg-opacity-[50%] hover:font-semibold "
              }
            >
              Log Out
            </ul>
          </Link>
        </div>
      </div>
      {/* Include ProfileModal component */}
      <ProfileModal showModal={showModal} />
    </div>
  );
};

export default NavSideBar;

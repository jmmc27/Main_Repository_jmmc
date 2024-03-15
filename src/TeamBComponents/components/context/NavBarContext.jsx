/* eslint-disable react/prop-types */

import React, { createContext, useEffect, useState } from "react";

export const NavBarContext = createContext();

const NavBarProvider = ({ children }) => {
  //react hook for showing and hiding element
  const [show, setShow] = useState(false);
  const [logoShow, setLogoShow] = useState(false);
  const [dashBoardShow, setDashBoardShow] = useState(false);
  const [profileShow, setProfileShow] = useState(false);
  const [courseListShow, setCourseListShow] = useState(false);
  const [logout, setLogout] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [forumShow, setForumShow] = useState(false);

  //function for specific showing & closing elements
  const showLogout = () => {
    setLogout(true);
    setLogoShow(false);
    setDashBoardShow(false);
    setProfileShow(false);
    setCourseListShow(false);
    setShowDropDown(false);
    setForumShow(false);
    setShow(false);
  };
  const showLogo = () => {
    setLogoShow(true);
    setDashBoardShow(false);
    setProfileShow(false);
    setCourseListShow(false);
    setShowDropDown(false);
    setLogout(false);
    setShow(false);
    setForumShow(false);
  };

  const showDashBoard = () => {
    setDashBoardShow(true);
    setProfileShow(false);
    setCourseListShow(false);
    setLogoShow(false);
    setShowDropDown(false);
    setLogout(false);
    setShow(false);
    setForumShow(false);
  };
  const showProfile = () => {
    setProfileShow(true);
    setDashBoardShow(false);
    setCourseListShow(false);
    setLogoShow(false);
    setShowDropDown(false);
    setLogout(false);
    setShow(false);
    setForumShow(false);
  };
  const showCourseList = () => {
    setCourseListShow(true);
    setProfileShow(false);
    setDashBoardShow(false);
    setLogoShow(false);
    setShowDropDown(false);
    setLogout(false);
    setShow(false);
    setForumShow(false);
  };
  const showForum = () => {
    setForumShow(true);
    setLogout(false);
    setLogoShow(false);
    setDashBoardShow(false);
    setProfileShow(false);
    setCourseListShow(false);
    setShow(false);
    setShowDropDown(false);
  };

  //hook for header
  const [header, setHeader] = useState(false);
  //scroll event function, using useEffect hook for handling side effects
  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        window.scrollY > 20 ? setHeader(true) : setHeader(false);
      },
      []
    );
  });

  return (
    <NavBarContext.Provider
      value={{
        showForum,
        forumShow,
        setForumShow,
        header,
        dashBoardShow,
        profileShow,
        courseListShow,
        logout,
        showDropDown,
        setShowDropDown,
        showLogout,
        show,
        setShow,
        showLogo,
        showDashBoard,
        showProfile,
        showCourseList,
      }}
    >
      {children}
    </NavBarContext.Provider>
  );
};

export default NavBarProvider;

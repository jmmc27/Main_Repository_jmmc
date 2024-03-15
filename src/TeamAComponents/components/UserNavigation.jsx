/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "../styles/Auth.css";
import TsukidenLogo from "/src/assets/TeamAassets/companyLogo.png";
import Dropdown from "react-bootstrap/Dropdown";
import { FaRegUserCircle } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "./AuthContext"; // Import useAuth from your AuthContext
import ProfileModal from "./ProfileModal";

// Function to get user image type
function getUserImageType(profilePicture) {
  // Check if profilePicture is defined and not null
  if (profilePicture && profilePicture.startsWith) {
    // Check the image type based on the data
    const isPNG = profilePicture.startsWith("data:image/png;base64,");
    const isJPEG = profilePicture.startsWith("data:image/jpeg;base64,");

    if (isPNG) {
      return "png";
    } else if (isJPEG) {
      return "jpeg";
    } else {
      // Return a default type or handle accordingly
      return "unknown"; // You can change this to 'jpeg' or handle as needed
    }
  } else {
    // Return a default type or handle accordingly
    return "unknown"; // You can change this to 'jpeg' or handle as needed
  }
}

const UserNavigation = ({ onUserDataFetched }) => {
  const { isLoggedIn, handleLogout } = useAuth();
  const [clicked, setClicked] = useState(false);
  const [userData, setUserData] = useState({});
  const [showProfileModal, setShowProfileModal] = useState(false); // State to control the visibility of the profile modal

  const openProfileModal = () => {
    setShowProfileModal(true); // Function to open the profile modal
  };

  const closeProfileModal = () => {
    setShowProfileModal(false); // Function to close the profile modal
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  const closeMobileNavbar = () => {
    setClicked(false);
    // Assuming setMyCourseActive is a state setter function, replace it with the appropriate state management logic
    // setMyCourseActive(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve user ID from local storage
        const userId = localStorage.getItem("userId");
        // Check if user ID is available
        if (!userId) {
          console.error("User ID not found in local storage");
          return;
        }

        // Fetch user data using the user ID
        const response = await fetch(
          `http://localhost:8080/api/v1/auth/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Check if response is successful
        if (response.ok) {
          // Parse response data as JSON
          const userData = await response.json();
          setUserData(userData);

          if (
            userData.profilePicture !== undefined &&
            userData.profilePicture !== null
          ) {
            // Convert binary data to base64 string
            const base64 = btoa(
              String.fromCharCode(...new Uint8Array(userData.profilePicture))
            );
            // Determine the image type
            const imageType = getUserImageType(userData.profilePicture);
            // Create data URL using base64 string
            const dataUrl = `data:image/${imageType};base64,${base64}`;

            onUserDataFetched({
              ...userData,
              profilePicture: dataUrl,
            });
          }
          // Log an error message if the profile picture is undefined or null in the user data
          else {
            console.error("Profile picture is undefined or null in user data");
          }
        }
        // Log an error message if there is a failure fetching user data from the server
        else {
          console.error(
            "Failed to fetch user data",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Unexpected error during user data fetch", error);
      }
    };

    fetchUserData();
  }, [onUserDataFetched]);

  // Add event listener to handle overflow state of the body based on the value of 'clicked' variable
  useEffect(() => {
    if (clicked) {
      // Disable scrolling when 'clicked' is true
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling when 'clicked' is false
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [clicked]);

  return (
    <>
      <nav className="navbar_TeamD">
        {/* NavLink to navigate to the home page, with an onClick event handler to close the mobile navbar */}
        <NavLink to="/" onClick={closeMobileNavbar}>
          {/* Image element for the logo, with a class name "teamDimg" and alt text */}
          <img className="teamDimg" src={TsukidenLogo} alt="Logo" />
        </NavLink>
        <div>
          <ul id="navbar" className={clicked ? "active" : ""}>
            <li className="profile_info">
              <span className="profile_info_con">
                <img
                  src={`data:image/${getUserImageType(
                    userData.profilePicture
                  )};base64,${userData.profilePicture}`}
                  alt="Logo"
                />
                <span className="profile_info_name">
                  <p className="profile_fName">{userData.firstName}</p>
                </span>
              </span>
            </li>
            <li className="profile_link">
              {/* NavLink to navigate to the profile page, with an onClick event handler to close the mobile navbar */}
              <NavLink
                to="/profile"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                Profile
              </NavLink>
            </li>
            <li className="profile_link">
              {/* NavLink to navigate to the certificate page, with an onClick event handler to close the mobile navbar */}
              <NavLink
                to="/certificate"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                Certificate
              </NavLink>
            </li>
            <li className="divider"></li>
            <li>
              {/* NavLink to navigate to the dashboard page, with an onClick event handler to close the mobile navbar */}
              <NavLink
                to="/dashboard"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              {/* NavDropdown component to display a dropdown menu for "My Course" */}
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="My Course"
                menuVariant="dark"
                className="mycourse_dd"
              >
                <NavDropdown.Item href="/course" activeClassName="active">
                  Problem Overview
                </NavDropdown.Item>
                {/* NavLink for Assessment route */}
                <NavDropdown.Item href="/assessment" activeClassName="active">
                  Assessment
                </NavDropdown.Item>
              </NavDropdown>
            </li>
            <li>
              {/* this is the forum */}
              <NavLink
                to="/ForumF"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                Forums
              </NavLink>
            </li>
            <li>
              {/* NavLink for Verification route */}
              <NavLink
                to="/verification"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                Verification
              </NavLink>
            </li>
          </ul>
        </div>
        <div id="mobile" onClick={handleClick}>
          {/* Conditionally render different icons based on 'clicked' state */}
          {clicked ? (
            <i className="fas fa-times"></i>
          ) : (
            <img
              src={`data:image/${getUserImageType(
                userData.profilePicture
              )};base64,${userData.profilePicture}`}
              alt="Logo"
              className="mobile_profile"
            />
          )}
        </div>
        <div className="profile_side">
          {isLoggedIn ? (
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="button_profile"
              >
                <img
                  src={`data:image/${getUserImageType(
                    userData.profilePicture
                  )};base64,${userData.profilePicture}`}
                  alt=""
                  className="profile_img"
                />
                Hi, {userData.firstName}!
              </Dropdown.Toggle>

              {/* Dropdown menu */}
              <Dropdown.Menu>
                {/* Profile dropdown item */}
                <Dropdown.Item href="#" onClick={openProfileModal}>
                  <FaRegUserCircle /> Profile
                </Dropdown.Item>
                <ProfileModal
                  showModal={showProfileModal}
                  handleClose={closeProfileModal}
                />{" "}
                {/* Render the ProfileModal component */}
                {/* Certificate dropdown item */}
                <Dropdown.Item
                  as={NavLink} /* Render as NavLink for routing */
                  to="/certificate" /* Link to certificate page */
                  onClick={closeMobileNavbar} /* Close mobile navbar onClick */
                >
                  <TbCertificate /> My Certificate
                </Dropdown.Item>
                {/* Log out dropdown item */}
                <Dropdown.Item as={NavLink} to="/" onClick={handleLogout}>
                  <FiLogOut /> Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              {/* Register button */}
              <Link to="/register">
                {" "}
                {/* Link to register page */}
                <button id="register">Register</button>
              </Link>

              {/* Log in button */}
              <Link to="/login">
                {" "}
                {/* Link to login page */}
                <button id="login">Log In</button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default UserNavigation;

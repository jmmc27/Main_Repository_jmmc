import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./TeamD_Css/navbar.css";
import TsukidenLogo from "./TeamD_Assets/TsukidenLogo.png";
import Profile from "./TeamD_Assets/profilepic.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import { FaRegUserCircle } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import NavDropdown from "react-bootstrap/NavDropdown";
import ForumF from "./../TeamCComponents/pages/ForumF";
import { useAuth } from "../TeamAComponents/components/AuthContext";
import ProfileModal from "../TeamAComponents/components/ProfileModal";
import { color } from "style-value-types";

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

const Team_D_HeaderV2 = ({ onUserDataFetched, openModal, showModal }) => {
  // Pass openModal as a prop
  const [clicked, setClicked] = useState(false);
  const [showLogoutConfirmationModal, setShowLogoutConfirmationModal] =
    useState(false);
  const { isLoggedIn, handleLogout } = useAuth();
  const [userData, setUserData] = useState({});
  const value = localStorage.getItem("username");
  const firstname = localStorage.getItem("firstName");
  const lastname = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
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

  const handleToggleEditModal = () => {
    setIsEditModal((prevIsEditModal) => !prevIsEditModal);
    // Call showModal with true to open the modal
    showModal(true);
  };

  const closeMobileNavbar = () => {
    setClicked(false);
  };

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
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in local storage");
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/v1/auth/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);

          if (
            userData.profilePicture !== undefined &&
            userData.profilePicture !== null
          ) {
            const base64 = btoa(
              String.fromCharCode(...new Uint8Array(userData.profilePicture))
            );
            const imageType = getUserImageType(userData.profilePicture);
            const dataUrl = `data:image/${imageType};base64,${base64}`;

            onUserDataFetched({
              ...userData,
              profilePicture: dataUrl,
            });
          } else {
            console.error("Profile picture is undefined or null in user data");
          }
        } else {
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

  // Add or remove the 'no-scroll' class based on the 'clicked' state
  useEffect(() => {
    if (clicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on component unmount
    };
  }, [clicked]);

  return (
    <>
      <nav className="navbar_TeamD">
        <NavLink to="/teamcdashboard" onClick={closeMobileNavbar}>
          <img className="teamDimg" src={TsukidenLogo} alt="Logo" />
        </NavLink>
        <div>
          <ul id="navbar" className={clicked ? "active" : ""}>
            {/* Profile Info */}
            <li className="profile_info">
              <span className="profile_info_con">
                <img
                  src={
                    userData.profilePicture
                      ? `data:image/${getUserImageType(
                          userData.profilePicture
                        )};base64,${userData.profilePicture}`
                      : Profile
                  }
                  alt="Logo"
                />
                <span className="profile_info_name">
                  <p className="profile_fName">{firstname + " " + lastname}</p>
                  <p className="profile_email">{email}</p>
                </span>
              </span>
            </li>
            {/* Profile Links */}
            <li className="profile_link">
              <NavLink
                to="#"
                activeClassName="active"
                onClick={openProfileModal}
              >
                Profile
              </NavLink>
              <ProfileModal
                showModal={showProfileModal}
                handleClose={closeProfileModal}
              />
            </li>
            <li className="profile_link">
              <NavLink
                to="/certificate"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                My Certificate
              </NavLink>
            </li>
            <li className="divider"></li>
            {/* Navigation Links */}
            <li>
              <NavLink
                to="/TeamCDashboard"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="My Course"
                menuVariant="dark"
                className="mycourse_dd"
              >
                <NavDropdown.Item href="course" activeClassName="active">
                  Enrolled Courses
                </NavDropdown.Item>
                <NavDropdown.Item href="assessment" activeClassName="active">
                  Assessments
                </NavDropdown.Item>
                <NavDropdown.Item href="/CertGen" activeClassName="active">
                  Get Certification
                </NavDropdown.Item>
              </NavDropdown>
            </li>
            <li>
              <NavLink
                to="/ForumF"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                Forums
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/verification"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                Verification
              </NavLink>
            </li>
            <li className="profile_link">
              <NavLink
                activeClassName="active"
                onClick={() => {
                  handleOpenLogoutConfirmationModal();
                  closeMobileNavbar();
                }}
              >
                <span className="teamD_LogOut_Btn">Log Out</span>
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Mobile Menu */}
        <div id="mobile" onClick={handleClick}>
          {clicked ? (
            <i className="fas fa-times"></i>
          ) : (
            <img
              src={
                userData.profilePicture
                  ? `data:image/${getUserImageType(
                      userData.profilePicture
                    )};base64,${userData.profilePicture}`
                  : Profile
              }
              alt="Logo"
              className="mobile_profile"
            />
          )}
        </div>
        {/* Profile Dropdown */}
        <div className="profile_side">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="button_profile"
            >
              <img src={Profile} alt="" className="profile_img" />
              Hi, {value}!
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={openProfileModal}>
                <FaRegUserCircle /> Profile
              </Dropdown.Item>
              <ProfileModal
                showModal={showProfileModal}
                handleClose={closeProfileModal}
              />
              <Dropdown.Item
                as={NavLink}
                to="/certificate"
                onClick={closeMobileNavbar}
              >
                <TbCertificate /> My Certificate
              </Dropdown.Item>
              <Dropdown.Item onClick={handleOpenLogoutConfirmationModal}>
                <FiLogOut /> Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
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
      {/* Render the ProfileModal component */}
      <ProfileModal showModal={showModal} />
    </>
  );
};

export default Team_D_HeaderV2;

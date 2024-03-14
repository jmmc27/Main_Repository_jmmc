import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Login from "./Login";
import Register from "./Register";
import "../styles/Auth.css";
import Verification from "./Verification";
import Forgot from "./Forgot";
import NewPass from "./NewPass";

// CustomModal component for displaying modals
const CustomModal = ({ show, handleClose, children }) => {
  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.2)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backdropFilter: show ? 'blur(5px)' : 'none',
      zIndex: 1000, 
    },
    modalContent: {
      position: 'relative',
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto',
      background: 'none',  // Set the background to none or transparent
    },
    innerContent: {
      background: 'none',
      padding: '20px',
      borderRadius: '8px',
    },
  };

  return (
    <>
      {/* Render the modal only if show is true */}
      {show && (
        <div style={modalStyles.overlay} onClick={handleClose}>
          <div style={modalStyles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={modalStyles.innerContent}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Navigation component
const Navigation = () => {
  // Extracting isLoggedIn and handleLogout from the useAuth hook
  const { isLoggedIn, handleLogout } = useAuth(); 
  // State variables for controlling the visibility of login and register modals
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const [verificationModalIsOpen, setVerificationModalIsOpen] = useState(false); // State for Verification modal
  const [forgotModalIsOpen, setForgotModalIsOpen]= useState(false);
  const [newpassModalIsOpen, setNewPassModalIsOpen]= useState(false);

  // Functions to open and close the login modal
  const openLoginModal = () => setLoginModalIsOpen(true);
  const closeLoginModal = () => setLoginModalIsOpen(false);

  // Functions to open and close the register modal
  const openRegisterModal = () => setRegisterModalIsOpen(true);
  const closeRegisterModal = () => setRegisterModalIsOpen(false);

  const openVerificationModal = () => setVerificationModalIsOpen(true); // Function to open Verification modal
  const closeVerificationModal = () => {
    localStorage.setItem('isVerified', 'true'); // Set verification status to true in localStorage
  };

  const openForgotModal = () => setForgotModalIsOpen(true);
  const closeForgotModal = () => setForgotModalIsOpen(false);

  const openNewPassModal = () => setNewPassModalIsOpen(true);
  const closeNewPassModal = () => setNewPassModalIsOpen(false);

  // Check if the verification status is true in localStorage on component mount
  useEffect(() => {
    const isVerified = localStorage.getItem('isVerified');
    if (isVerified === 'true') {
      setVerificationModalIsOpen(true);
    }
  }, []);

  return (
    // Main navigation container
    <div className="home-header">
      {/* Left container with logo and navigation links */}
      <div className="left-container">
         {/* Logo container */}
        <div className="logo-container">
          {/* Logo image */}
          <Link to="/">
          <img
            src="..\src\assets\TeamAassets\companyLogo.png"
            alt="Logo"
            className="logo"
          />
          </Link>
        </div>
         {/* Navigation links for logged-in users */}
        {isLoggedIn && (
          <nav>
            <ul>
              <li>
                <Link to="/">
                  <h3>Catalog</h3>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <h3>Activities</h3>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>

     
      {!isLoggedIn && (
        
        <nav>
       <ul className="flex font-bold text-[1.2rem] gap-5">
          <li>
            <a href="/verif_nonuser">Verification</a>
          </li>
          <li>
            <a href="About">About us</a>
          </li>
          <li>
            <a href="https://www.tsukiden.com.ph">Contact us</a>
          </li>
        </ul>
        </nav>
          )}
        
      

      {/* Right container with buttons for login, register, and logout */}
      <div className="right-container">
        {/* Render these elements if the user is not logged in */}
        {!isLoggedIn && (
          <>
            <button className="TeamA-button" onClick={openRegisterModal}>
              Register
            </button>
            <CustomModal show={registerModalIsOpen} handleClose={closeRegisterModal} childType="register">
              <Register openLoginModal={openLoginModal} openVerificationModal={openVerificationModal} closeRegisterModal={closeRegisterModal}/> {/* Pass openLoginModal function */}
            </CustomModal>
          </>
        )}
        {!isLoggedIn && (
          <>
            <button className="TeamA-button" onClick={openLoginModal}>
              Login
            </button>
            <CustomModal show={loginModalIsOpen} handleClose={closeLoginModal} childType="login">
              <Login openForgotModal={openForgotModal} closeLoginModal={closeLoginModal}/>
            </CustomModal>
          </>
        )}
        {/* Verification modal */}
        <CustomModal show={verificationModalIsOpen} handleClose={() => {}} childType="verification">
          <Verification closeVerificationModal={closeVerificationModal} openLoginModal={openLoginModal}/>
        </CustomModal>
        <CustomModal show={forgotModalIsOpen} handleClose={closeForgotModal} childType="forgot">
          <Forgot openNewPassModal={openNewPassModal} closeForgotModal={closeForgotModal} openLoginModal={openLoginModal}/>
        </CustomModal>
        <CustomModal show={newpassModalIsOpen} handleClose={closeNewPassModal} childType="newpass">
          <NewPass openLoginModal={openLoginModal} closeNewPassModal={closeNewPassModal}/>
        </CustomModal>
      </div>
    </div>
  );
};

// Exporting the Navigation component as the default export
export default Navigation;

import React from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css";
import ForgotForm from "./ForgotForm";
function Forgot({
  onNavigateHome,
  onForgotPassword,
  openNewPassModal,
  closeForgotModal,
  openLoginModal,
}) {
  // Function implementation goes here

  return (
    <div className="forgot-container">
      <div className="container-under">
        <div className="forgot-auth-label">
          <h1 style={{ color: "white", fontSize: "25px" }}>RETRIEVE ACCOUNT</h1>
        </div>
        {/* Main content section with the 'Forgot Password' form */}
        <div className="forgot-content">
          <div className="forgot-sign">
            <ForgotForm
              openNewPassModal={openNewPassModal}
              closeForgotModal={closeForgotModal}
              openLoginModal={openLoginModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgot;

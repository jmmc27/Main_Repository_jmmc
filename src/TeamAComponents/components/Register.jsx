import React from "react";
import RegisterForm from "./RegisterForm";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

function Register({
  openLoginModal,
  closeRegisterModal,
  openVerificationModal,
}) {
  return (
    <div>
      <div className="label-container">
        <div className="container-under">
          <div className="auth-label">
            <h1>SIGN UP</h1>
          </div>
          <div className="auth-content">
            <div className="auth-sign">
              <RegisterForm
                openLoginModal={openLoginModal}
                closeRegisterModal={closeRegisterModal}
                openVerificationModal={openVerificationModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

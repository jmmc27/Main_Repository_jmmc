import React from "react";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

//Importing styles for the component
function Login({ openForgotModal, closeLoginModal }) {
  return (
    <div>
      <div className="label-container">
        <div className="container-under">
          <div className="auth-label">
            <h1>LOG IN</h1>
          </div>

          <div className="auth-content">
            <div className="auth-sign">
              <LoginForm
                openForgotModal={openForgotModal}
                closeLoginModal={closeLoginModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

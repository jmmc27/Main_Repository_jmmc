/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React from "react";
import ChangePasswordForm from "./ChangePasswordForm"; // Correct import statement
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../styles/Auth.css";

const ChangePassword = ({ handleClose }) => {
  // Corrected function name
  const { isLoggedIn, handleLogout } = useAuth();
  const navigate = useNavigate(); //
  return (
    <div>
      <div className="Change-content">
        <div className="Change-sign">
          <ChangePasswordForm handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

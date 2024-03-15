/* eslint-disable no-unused-vars */
import React from "react";
import EmailForm from "./EmailForm";
import { Link } from "react-router-dom";
import "../styles/Auth.css";
// Assuming you want to include Auth.css

function Email() {
  return (
    <div className="email-container">
      <div className="home-header">
        <img
          src="..\src\assets\TeamAassets\companyLogo.png"
          alt="Logo"
          className="logo"
        />
      </div>
      <div className="email-navi">
        <div className="home-button">
          <Link to="/dashboard">
            <button>Home</button>
          </Link>
        </div>
      </div>

      <div className="content">
        <div className="email-sign">
          <EmailForm />
        </div>
      </div>
    </div>
  );
}

export default Email;

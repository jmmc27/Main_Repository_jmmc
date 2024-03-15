/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css";
import Footer from "./Footer";

const Landing = () => {
  return (
    <div>
      {/* Navigation bar section */}
      <nav className="my-navigation">
        {/* Company logo in the navigation bar */}
        <img src="..\src\assets\TeamAassets\companyLogo.png" alt="Logo" />
        {/* Navigation menu */}
        <ul className="menu hide">
          <li>
            {/* About Us link */}
            <a href="About">About Us</a>
          </li>
          <li>
            {/* Contact Us link */}
            <a href="https://www.tsukiden.com.ph"> Contact Us</a>
          </li>
          <li>
            {/* Terms and Conditions link */}
            <a href="">Terms and Conditions</a>
          </li>
        </ul>
        {/* Buttons for Register and Log In */}
        <div className="testing">
          <Link to="/register">
            <button id="register">Register</button>
          </Link>
          <Link to="/login">
            <button id="login">Log In</button>
          </Link>
        </div>
      </nav>

      {/* Main content container */}
      <div className="content-container">
        {/* Text container with headings */}
        <div className="text-container">
          <div>
            <h1
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "2rem",
                fontWeight: 800,
                marginBottom: "1rem",
              }}
            >
              ONLINE LEARNING
            </h1>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              Gain knowledge. Learn your way. Be the best
            </h2>
          </div>
          {/* Card container for courses */}
          <div className="TeamA-card-container">
            {/* Individual course card */}
            <div className="TeamA-card">
              <div className="TeamA-card-title">
                <h3>SQL QUERY</h3>
              </div>

              <div className="TeamA-card-body">
                {/* Button to view details of the course */}
                <Link to="/">
                  <button className="teamA_button">View </button>
                </Link>
              </div>

              <div className="TeamA-card-button">
                {/* Button to enroll in the course */}
                <Link to="/register">
                  <button className="teamA_button">Enroll </button>
                </Link>
              </div>
            </div>
            {/* Repeat similar structure for other courses */}
            <div className="TeamA-card">
              <div className="TeamA-card-title">
                <h3>Version Control: SVN</h3>
              </div>

              <div className="TeamA-card-body">
                <Link to="/">
                  <button className="teamA_button">View </button>
                </Link>
              </div>

              <div className="TeamA-card-button">
                <Link to="/register">
                  <button className="teamA_button">Enroll </button>
                </Link>
              </div>
            </div>
            <div className="TeamA-card">
              <div className="TeamA-card-title">
                <h3>HTML Programming</h3>
              </div>

              <div className="TeamA-card-body">
                <Link to="/">
                  <button className="teamA_button">View </button>
                </Link>
              </div>

              <div className="TeamA-card-button">
                <Link to="/register">
                  <button className="teamA_button">Enroll </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Image container */}
        <div className="image-container">
          <img
            src="..\src\assets\TeamAassets\logo.png"
            alt="Description of the photo"
          />
        </div>
      </div>

      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default Landing;

import React from "react";
import VerificationForm from "./VerificationForm"; // Correct import statement
import { Link } from "react-router-dom";
import "../styles/Auth.css";

function Verification({
  openVerificationModal,
  openLoginModal,
  closeVerificationModal,
}) {
  // Corrected function name
  return (
    <div className="verification-container">
      <div className="content">
        <div className="verification-sign">
          <VerificationForm
            openVerificationModal={openVerificationModal}
            openLoginModal={openLoginModal}
            closeVerificationModal={closeVerificationModal}
          />
        </div>
      </div>
    </div>
  );
}

export default Verification;

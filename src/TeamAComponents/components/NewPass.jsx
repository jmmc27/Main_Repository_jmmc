import React from "react";
import NewPassForm from "./NewPassForm";
import { Link } from "react-router-dom";
import "../styles/Auth.css";
// Assuming you want to include Auth.css

// TeamA_NewPass component
function NewPass({ closeNewPassModal, openLoginModal }) {
  return (
    <div className="email-container">
      <div className="content">
        <div className="email-sign">
          <NewPassForm
            closeNewPassModal={closeNewPassModal}
            openLoginModal={openLoginModal}
          />
        </div>
      </div>
    </div>
  );
}

export default NewPass;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

import ProfileEditForm from "./ProfileEditForm";
import Navigation from "./Navigation";
import { useAuth } from "./AuthContext";

const ProfileEdit = ({ handleClose }) => {
  const { isLoggedIn, handleLogout } = useAuth();
  const navigate = useNavigate(); //

  return (
    <div>
      {/* Container for profile content */}
      <div className="Prof2-content">
        {/* Container for profile sign */}
        <div className="Prof2-sign">
          {/* Render the ProfileEditForm component */}
          <ProfileEditForm handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;

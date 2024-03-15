import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Profile from "./Profile";
import ProfileEdit from "./ProfileEdit";
import ChangePassword from "./ChangePassword";

const ProfileModal = ({ showModal, handleClose }) => {
  const [isEditModal, setIsEditModal] = useState(false);
  const [isChangePasswordModal, setIsChangePasswordModal] = useState(false); // New state for ChangePassword modal

  const handleToggleEditModal = () => {
    setIsEditModal((prevIsEditModal) => !prevIsEditModal);
  };

  const handleToggleChangePasswordModal = () => {
    setIsChangePasswordModal(
      (prevIsChangePasswordModal) => !prevIsChangePasswordModal
    );
  };

  const handleModalHide = () => {
    setIsEditModal(false);
    setIsChangePasswordModal(false); // Hide ChangePassword modal when closing
  };

  const customModalStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backdropFilter: showModal ? "blur(5px)" : "none",
    },
    modalContent: {
      position: "relative",
      width: "100%",
      maxWidth: "600px",
      margin: "0 auto",
      background: "none", // Set the background to none or transparent
      padding: "20px",
      borderRadius: "8px",
    },
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        handleClose();
        handleModalHide();
      }}
    >
      {/* Overlay */}
      <div style={customModalStyles.overlay} onClick={handleClose}>
        {/* Modal content */}
        <div
          style={customModalStyles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Conditional rendering based on the state of isEditModal and isChangePasswordModal */}
          {isEditModal ? (
            <ProfileEdit handleClose={handleModalHide} />
          ) : isChangePasswordModal ? (
            <ChangePassword handleClose={handleModalHide} />
          ) : (
            <Profile
              handleClose={handleClose}
              handleEditClick={handleToggleEditModal}
              handlePasswordChangeClick={handleToggleChangePasswordModal} // New handler for ChangePassword
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;

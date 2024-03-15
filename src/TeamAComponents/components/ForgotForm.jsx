import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

function ForgotForm({ openNewPassModal, closeForgotModal, openLoginModal }) {
  const [email, setEmail] = useState("");
  const [resetStatus, setResetStatus] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationAttempted, setVerificationAttempted] = useState(false);
  const [error, setError] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [continueButtonDisabled, setContinueButtonDisabled] = useState(false); // State to track button disabled status
  const [resendStatus, setResendStatus] = useState("");
  const [resending, setResending] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sendForgotCode = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/auth/forgot-password?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        console.log("Email is registered. Please check your email.");
        setEmailSubmitted(true);
      } else {
        const responseData = await response.json();
        setError(responseData.message || "Failed to send verification code");
        console.log("Email is invalid. Please Sign-up.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Error sending OTP. Please try again.");
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const resendForgotCode = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/auth/resendCode`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        console.log("Resent verification code. Please check your email.");
        setError(""); // Clear previous errors when successfully resending code
      } else {
        const responseData = await response.json();
        setError(responseData.message || "Failed to resend verification code");
      }
    } catch (error) {
      console.error("Error resending verification code:", error);
      setError("Error resending verification code. Please try again.");
    }
  };

  const verifyOtp = async (otp) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/auth/verify-forgot-code?email=${email}&code=${otp}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        console.log("Verification successful");
        // Store ForgotCode and ForgotEmail in local storage
        localStorage.setItem("forgotCode", otp);
        localStorage.setItem("forgotEmail", email);
        closeForgotModal();
        openNewPassModal();
        setError("");
      } else {
        const responseData = await response.json();
        console.log("Verification not successful");
        setError(responseData.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Error verifying OTP. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFormSubmit(e);
    }
  };

  return (
    <div className="forgot-container">
      <div className="template-form-container">
        <form className="forgot-template-form" onSubmit={handleFormSubmit}>
          <h2 className="title">Forgot Password</h2>
          {emailSubmitted ? (
            <>
              <p>Please enter the OTP code sent to your email.</p>
              <div className="otp-input-field">
                <i className="fas fa-key"></i>
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter OTP code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <button className="TeamA-button" onClick={() => verifyOtp(otp)}>
                Verify
              </button>
              {resendStatus && <p className="error-message">{resendStatus}</p>}
            </>
          ) : (
            <>
              <p>Please enter your email address to reset your password.</p>
              <div className="email-input-field">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                {error && <p className="error-message">{error}</p>}
              </div>
              <div className="lower">
                <Link
                  className="Remember-pass"
                  onClick={() => {
                    openLoginModal();
                    closeForgotModal();
                  }}
                >
                  <p>Remember Password?</p>
                </Link>
                <button
                  className="TeamA-button"
                  onClick={sendForgotCode}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Continue"}
                </button>
              </div>
              {resendStatus && <p className="error-message">{resendStatus}</p>}
            </>
          )}
        </form>
      </div>

      <div className="forgot left-panel">
        <div className="forgot-content"></div>
      </div>
    </div>
  );
}

export default ForgotForm;

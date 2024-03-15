import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../styles/Auth.css";

function VerificationForm({
  openVerificationModal,
  openLoginModal,
  closeVerificationModal,
}) {
  const [verification, setVerification] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [resendStatus, setResendStatus] = useState(null);
  const [showResendButton, setShowResendButton] = useState(true);
  const [emailFromRegistration, setEmailFromRegistration] = useState("");
  const [resending, setResending] = useState(false);
  const [codeExpired, setCodeExpired] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeDifference, setTimeDifference] = useState(null);
  const { handleLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmailFromRegistration(storedEmail);
      checkVerificationCodeExpiration(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (verificationStatus === "Verification successful") {
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");
      const storedRole = localStorage.getItem("Mapped role:");
      handleLogin({ email: storedEmail, password: storedPassword })
        .then((result) => {
          if (result.success) {
            setShowResendButton(false);
            setIsVerified(true);
            {
              storedRole === "INSTRUCTOR"
                ? navigate("/teambdashboard")
                : navigate("/teamcdashboard");
            }
          } else {
            console.error("Login failed:", result.error);
          }
        })
        .catch((error) =>
          console.error("Unexpected error during login:", error)
        );
    }
  }, [verificationStatus, navigate, handleLogin]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Prevent the modal from closing when the page is reloaded
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const checkVerificationCodeExpiration = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/auth/checkCodeExpiration?email=${email}`
      );
      if (response.ok) {
        const { codeExpired, expirationTime } = await response.json();
        setCodeExpired(codeExpired);
        if (expirationTime) {
          const now = new Date().getTime();
          const newTimeDifference = Math.floor(
            (expirationTime - now) / (60 * 1000)
          ); // Convert milliseconds to minutes
          setTimeDifference(newTimeDifference);
          if (newTimeDifference > 0) {
            setTimeout(checkVerificationCodeExpiration, 60000, email); // Update every minute
          } else {
            setShowResendButton(true);
          }
        } else {
          setShowResendButton(true);
          setTimeDifference(0);
        }
      } else {
        console.error(
          "Failed to fetch verification code expiration status. Response:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error during code expiration check:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/verifyCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            verificationCode: verification,
            recipient: emailFromRegistration,
          }),
        }
      );
      if (response.ok) {
        setVerificationStatus("Verification successful");
        setShowResendButton(false);
      } else {
        setVerificationStatus("Verification failed");
        setShowResendButton(codeExpired);
      }
    } catch (error) {
      console.error("Error during verification:", error);
    }
  };

  const handleResendCode = async () => {
    try {
      setResending(true);
      const resendResponse = await fetch(
        "http://localhost:8080/api/v1/auth/resendCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipient: emailFromRegistration }),
        }
      );
      if (resendResponse.ok) {
        setVerificationStatus("Verification code resent successfully");
        setShowResendButton(false);
        openVerificationModal();
        window.location.reload(); // Reload the page
      } else {
        setVerificationStatus("Failed to resend verification code");
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error("Error during code resend:", error);
    } finally {
      setResending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFormSubmit(e);
    }
  };

  return (
    <div className="verification-forms-container">
      {!isVerified && (
        <form className="template-form" onSubmit={handleFormSubmit}>
          <h1 className="verification-title">Email Verification</h1>
          {codeExpired && (
            <>
              <div className="verification-input-field">
                <input
                  type="text"
                  placeholder="Verification Code"
                  id="verification"
                  name="verification"
                  value={verification}
                  onChange={(e) => setVerification(e.target.value)}
                  onKeyPress={handleKeyPress}
                  required
                />
                {resending ? (
                  <p>Resending verification code...</p>
                ) : (
                  <button className="TeamA-button">Send</button>
                )}
                {showResendButton && (
                  <div>
                    <a
                      href="#"
                      className="resend-link"
                      onClick={handleResendCode}
                      disabled={resending}
                    >
                      {resending ? "Resending..." : "Resend Code"}
                    </a>
                  </div>
                )}
                {timeDifference !== null && (
                  <p>{`Verification code expires in: ${timeDifference} ${
                    timeDifference === 1 ? "minute" : "minutes"
                  }`}</p>
                )}
                {!resending && timeDifference === null && (
                  <p>{`Verification code expires in: 0 minutes`}</p>
                )}
              </div>
              {verificationStatus && <p>{verificationStatus}</p>}{" "}
              {/* Move verification status inside the form */}
            </>
          )}
        </form>
      )}

      <div className="verification-panels-container">
        {showResendButton && resendStatus && <p>{resendStatus}</p>}
      </div>
    </div>
  );
}

export default VerificationForm;

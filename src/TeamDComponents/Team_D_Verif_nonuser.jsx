import React, { useState } from "react";
import "../TeamDComponents/TeamD_Css/verification.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AiFillSafetyCertificate } from "react-icons/ai";
import warningErr from "../TeamDComponents/TeamD_Assets/icons8-warning-96.png";
import Team_D_HeaderLanding from "./Team_D_HeaderLanding";
import Navigation from "../TeamAComponents/components/Navigation";

const Team_D_Verification = () => {
  const [code, setCode] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidSerial, setIsValidSerial] = useState(false);
  const [showPlaceholderText, setShowPlaceholderText] = useState(false);
  const [verifyClicked, setVerifyClicked] = useState(false);
  const defaultCodePrefix = "B55-";

  //updated code as of 2/28/24 -jake

  const handleVerify = async () => {
    setLoading(true);
    setVerifyClicked(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/auth/verifyCertificate/${code}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          setVerificationResult(null);
          if (code.trim() === "B55-") {
            setErrorMessage(
              "An error occurred while verifying the certificate. Please try again."
            );
          } else {
            setErrorMessage(
              "Sorry, the serial number you entered does not exist in our system. Please check the serial number and try again."
            );
          }
          setIsValidSerial(false);
        } else {
          setVerificationResult(data);
          setErrorMessage("");
          setIsValidSerial(true);
        }
      } else {
        if (response.status === 404) {
          setVerificationResult(null);
          if (code.trim() === "B55-") {
            setErrorMessage(
              "An error occurred while verifying the certificate. Please try again."
            );
          } else {
            setErrorMessage(
              "Sorry, the serial number you entered does not exist in our system. Please check the serial number and try again."
            );
          }
          setIsValidSerial(false);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Error verifying certificate:", error);
      setVerificationResult(null);
      if (code.trim() === "B55-") {
        setErrorMessage(
          "An error occurred while verifying the certificate. Please try again."
        );
      }
      setIsValidSerial(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navigation />
      <section className="verification_container">
        <div className="verification_title">
          <span></span>
        </div>
        <div className="verification_search">
          <div className="left">
            <div className="font-bold text-[2rem]">
              <h2>Verify Course Certificate</h2>
            </div>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter Serial Number"
              value={code}
              onClick={() => {
                if (!code || !code.startsWith(defaultCodePrefix)) {
                  setCode(defaultCodePrefix);
                  setIsValidSerial(false);
                }
              }}
              onChange={(e) => {
                let inputValue = e.target.value.toUpperCase();
                if (!inputValue.startsWith(defaultCodePrefix)) {
                  inputValue = defaultCodePrefix;
                }
                inputValue = inputValue.substring(
                  0,
                  defaultCodePrefix.length + 14
                );
                setCode(inputValue);
                setIsValidSerial(false);
                setShowPlaceholderText(false);
              }}
              onFocus={() => {
                if (!code) {
                  setShowPlaceholderText(true);
                }
              }}
              onBlur={() => {
                setShowPlaceholderText(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && code === defaultCodePrefix) {
                  e.preventDefault();
                }
                if (e.key === "Delete" && code === defaultCodePrefix) {
                  e.preventDefault();
                }
                if ((e.ctrlKey || e.metaKey) && e.key === "a") {
                  e.preventDefault();
                }
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleVerify();
                }
              }}
              style={{
                borderColor:
                  (verifyClicked && !code) ||
                  (errorMessage && code.trim() === "B55-")
                    ? "#ff0000"
                    : isValidSerial
                    ? "#28a745"
                    : "#ced4da",
                borderWidth: "1.5px",
                color: isValidSerial
                  ? "#28a745"
                  : errorMessage
                  ? "#ff0000"
                  : "inherit",
              }}
            />
            <div
              style={{
                height: "15px",
                marginTop: "-20px",
                marginBottom: "-5px",
              }}
            >
              <span
                style={{
                  color: "#FF0000",
                  fontSize: "13px",
                  display:
                    (verifyClicked && !code) ||
                    (errorMessage && code.trim() === "B55-")
                      ? "block"
                      : "none",
                }}
              >
                Please Enter Serial Number
              </span>
            </div>
            <Button
              variant="primary"
              className="verify"
              onClick={handleVerify}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </div>
          <div className="right">
            {!loading && (
              <>
                {!verificationResult && !errorMessage && (
                  <>
                    <div className="nameVerification">
                      <Form.Label>Name</Form.Label>
                      <Form.Control size="sm" type="text" readOnly />
                    </div>
                    <div className="serialVerification">
                      <Form.Label>
                        <div className="flex gap-x-2">
                          Certificate Serial No.
                          <AiFillSafetyCertificate className="icon" />
                        </div>
                      </Form.Label>
                      <Form.Control size="sm" type="text" readOnly />
                    </div>
                    <div className="serialVerification">
                      <Form.Label>Course Certified</Form.Label>
                      <Form.Control size="sm" type="text" readOnly />
                    </div>
                  </>
                )}
                {verificationResult && verificationResult.length > 0 && (
                  <>
                    <div className="nameVerification">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder={
                          verificationResult[0].firstName +
                          " " +
                          verificationResult[0].lastName
                        }
                        readOnly
                      />
                    </div>
                    <div className="serialVerification">
                      <Form.Label>
                        <div className="flex gap-x-2">
                          Certificate Serial No.
                          <AiFillSafetyCertificate className="icon" />
                        </div>
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder={verificationResult[0].serial_no}
                        readOnly
                      />
                    </div>
                    <div className="serialVerification">
                      <Form.Label>Course Certified</Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder={verificationResult[0].course_title}
                        readOnly
                      />
                    </div>
                  </>
                )}
                {errorMessage && (
                  <div className="error-message">
                    <img src={warningErr} alt="warningErr" />
                    {errorMessage}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Team_D_Verification;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Footer from "./Footer";

function LoginForm({ openForgotModal, closeLoginModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [rememberMe, setRememberMe] = useState(false); // State to store remember me option

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true); // Only set to true if stored email and password exist
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submitted");
      const result = await handleLogin({ email, password });

      if (result.success) {
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberedPassword", password);
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
        }

        const storedRole = localStorage.getItem("Mapped role:");
        console.log("Login successful");
        {
          storedRole === "INSTRUCTOR"
            ? navigate("/teambdashboard")
            : navigate("/teamcdashboard");
        }
      } else {
        setFailedAttempts((prevAttempts) => prevAttempts + 1);
        if (failedAttempts === 2) {
          setError("Warning: 2 more failed attempt will lock your account"); // make this red color
        } else if (failedAttempts === 4) {
          setError("Account locked due to multiple failed attempts"); // make this red color
          // You may want to add logic here to lock the account in your AuthContext
        } else {
          setError("Invalid email or password. Please try again.");
        }
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
      console.error("Login failed:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="template-form">
        <h2 style={{ margin: "30px" }}>
          Sign In to Your Account and Be Part of the Success
        </h2>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Password"
          required
        />
        <div className="remember-me">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <div>
          <h3 style={{ marginTop: "15px" }}>
            By clicking "Sign in," you agree to our Terms of Use and our Privacy
            Policy.
          </h3>
        </div>
        <div
          className="forgot-password"
          onClick={() => {
            closeLoginModal();
            openForgotModal();
          }}
        >
          Forgot your password?
        </div>
        <button
          className="TeamA-button"
          disabled={error === "Account locked due to multiple failed attempts"}
        >
          Sign in
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </>
  );
}

export default LoginForm;

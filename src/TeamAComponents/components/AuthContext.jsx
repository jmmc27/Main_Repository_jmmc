import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isLoggingOut, setLoggingOut] = useState(false);
  const timeoutRef = useRef(null); // Ref to store the timeout ID
  const navigate = useNavigate();

  const IDLE_TIMEOUT = 1800000; // 30 minutes in milliseconds

  const resetIdleTimeout = useCallback(() => {
    clearTimeout(timeoutRef.current);

    // Check if the user is logged in before setting the timeout
    if (isLoggedIn && !isLoggingOut) {
      timeoutRef.current = setTimeout(() => {
        handleLogout();
        toast.info("You have been inactive. Logging out.");
        setTimeout(() => {
          toast.dismiss();
        }, 3000);
      }, IDLE_TIMEOUT);
    }
  }, [isLoggedIn, isLoggingOut]);

  const handleUserActivity = useCallback(() => {
    resetIdleTimeout();
  }, [resetIdleTimeout]);

  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      setLoggingOut(true);

      const response = await fetch("http://localhost:8080/api/v1/auth/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("lastName");
        localStorage.removeItem("userId");
        localStorage.removeItem("firstName");
        localStorage.removeItem("password");
        localStorage.removeItem("Mapped role:");

        setLoggedIn(false);

        navigate("/");
      } else {
        console.error("Logout failed", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Unexpected error during logout", error);
    } finally {
      setLoggingOut(false);
      // Check if the user is still logged in and has not manually logged out
      if (isLoggedIn) {
        console.log("User is inactive"); // Log when the user becomes inactive

        // Show a Toastify message

        // Optionally, you may want to use setTimeout to dismiss the message after a few seconds
        // Dismiss the message after 3 seconds
      }
    }
  };
  const handleLogin = async (credentials) => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Server Response:", data);

        if (data.accessToken) {
          localStorage.setItem("authToken", data.accessToken);

          updateLocalStorage("userId", data.userId);
          updateLocalStorage("username", data.username);
          updateLocalStorage("firstName", data.firstName);
          updateLocalStorage("lastName", data.lastName);
          updateLocalStorage("email", data.email);
          updateLocalStorage("username", data.userName);
          updateLocalStorage("Mapped role:", data.role);

          setLoggedIn(true);
          setError(null);

          clearTimeout(timeoutRef.current);
          const newTimeoutId = setTimeout(() => {
            handleLogout();
          }, IDLE_TIMEOUT);
          timeoutRef.current = newTimeoutId;

          return { success: true, user: data }; // Return the success status and user data
        } else {
          console.error("Token missing in response:", data);
          setError("Invalid response from the server: Token missing");
        }
      } else {
        console.error("Login failed. Server response:", data);

        if (response.status === 401) {
          setError("Invalid email or password. Please try again.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      }
    } catch (error) {
      console.error("Unexpected error during login", error);

      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }

    return { success: false, user: null }; // Return the failure status
  };

  const updateLocalStorage = useCallback(
    (key, value) => {
      if (value !== undefined) {
        localStorage.setItem(key, value);

        resetIdleTimeout(); // Reset the timeout on user activity
      }
    },
    [resetIdleTimeout]
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setLoggedIn(true);
      setIsAuthReady(true);
      resetIdleTimeout(); // Start the countdown only if the user is logged in
    } else {
      setIsAuthReady(true);
    }
  }, [resetIdleTimeout]);

  useEffect(() => {
    if (isLoggedIn) {
      const handleMouseMove = () => {
        handleUserActivity();
      };

      document.addEventListener("mousemove", handleMouseMove);

      resetIdleTimeout(); // Initial setup

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [resetIdleTimeout, isLoggedIn, handleUserActivity]);

  // Clear the timeout when the component unmounts
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          handleLogin,
          handleLogout,
          setLoggedIn,
          error,
          loading,
          isAuthReady,
        }}
      >
        {children}
      </AuthContext.Provider>
      <ToastContainer />
    </div>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

import React from "react";
import Navigation from "./Navigation";
import { useAuth } from "./AuthContext";
import "../styles/Auth.css";

const Home = () => {
  // Using the useAuth hook to get authentication-related functions and state
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();

  return (
    <div className="home-container">
      {/* Main container for the Home component */}
      <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      {/* Navigation component with isLoggedIn state and handleLogout function */}
      <div className="home-content">
        {/* Content section for the Home component */}
        <div className="japanese-message">
          {/* Japanese message encouraging knowledge acquisition and self-learning */}
          <h1>知識を得る。自分のやり方で学ぼう。ベストを尽くす。</h1>
        </div>
        <div className="english-message">
          {/* English message conveying the same encouragement for knowledge and learning */}
          <h1>Gain knowledge. Learn your way. Be the best.</h1>
        </div>
        <div className="TeamA-courses">
          {/* Section for displaying different course categories */}
          <div className="TeamA-square">
            {/* Square for the Programming course category */}
            <h3>Programming</h3>
          </div>
          <div className="TeamA-square">
            {/* Square for the Bayani Intelligence course category */}
            <h3>Bayani Intelligence</h3>
          </div>
          <div className="TeamA-square">
            {/* Square for the Business course category */}
            <h3>Business</h3>
          </div>
          <div className="TeamA-square">
            {/* Square for the Security course category */}
            <h3>Security</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

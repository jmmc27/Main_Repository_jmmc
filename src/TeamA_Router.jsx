/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Landing from "../src/TeamAComponents/components/Landing";
import Login from "../src/TeamAComponents/components/Login";
import Register from "../src/TeamAComponents/components/Register";
import Forgot from "../src/TeamAComponents/components/Forgot";
import Profile from "../src/TeamAComponents/components/Profile";
import { Route, Routes } from "react-router-dom";
import Navigation from "../src/TeamAComponents/components/Navigation";
import ProfileEdit from "../src/TeamAComponents/components/ProfileEdit";
import Verification from "../src/TeamAComponents/components/Verification";
import ChangePassword from "../src/TeamAComponents/components/ChangePassword";
import About from "../src/TeamAComponents/components/About";
import Footer from "./TeamAComponents/components/Footer";
import Email from "./TeamAComponents/components/Email";
import About from "../src/TeamAComponents/components/About";
import Home from "./TeamAComponents/components/Home";
import Dashboard from "./TeamAComponents/components/Dashboard";

function TeamA_Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update" element={<ProfileEdit />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/change" element={<ChangePassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/email" element={<Email />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default TeamA_Router;

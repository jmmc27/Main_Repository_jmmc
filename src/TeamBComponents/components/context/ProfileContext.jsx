/* eslint-disable react/prop-types */

import React, { createContext, useState } from "react";

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [showPersonalInfo, setPersonalInfo] = useState(true);
  const [showAccDetails, setShowAccDetails] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const showPInfo = () => {
    setPersonalInfo(() => (prev) => !prev);
    setShowAccDetails(false);
    setShowDropDown(false);
  };
  const showADetails = () => {
    setShowAccDetails(() => (prev) => !prev);
    setPersonalInfo(false);
    setShowDropDown(false);
  };

  const [accDetails, setAccDetails] = useState([
    {
      email: "jmacabales@tspi.com.ph",
      userName: "JMacabales",
    },
  ]);

  // const [personalDetails, setPersonalDetails] = useState([
  //   {
  //     firstName:"Judes",
  //     lastName: "Macabales",
  //     contactNo:"09214042497"
  //   }
  // ])

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });
  const [users, setUsers] = useState([]);

  const [file, setFile] = useState();
  const [sigfile, setSigFile] = useState();

  return (
    <ProfileContext.Provider
      value={{
        showPersonalInfo,
        setPersonalInfo,
        showAccDetails,
        setShowAccDetails,
        showPInfo,
        showADetails,
        setAccDetails,
        accDetails,
        user,
        setUser,
        users,
        setUsers,
        file,
        setFile,
        sigfile,
        setSigFile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;

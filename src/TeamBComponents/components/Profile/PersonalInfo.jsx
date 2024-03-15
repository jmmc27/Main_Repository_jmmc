/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
//january 12 2024
import axios from "axios";
import { useContext, useEffect, useState } from "react";

//import logo for profile pic
import profilePic from "../../../assets/TeamBassests/Registration.png";

import Footer from "../Footer";
import PersonalEdit from "./PersonalEdit";
import { ProfileContext } from "../context/ProfileContext";

const PersonalInfo = ({ intructorName, userEmail }) => {
  const { user, setUser, users, setUsers, file, setFile, accDetails } =
    useContext(ProfileContext);
  console.log(user);

  useEffect(() => {
    const loadUsers = async () => {
      const result = await axios.get("http://localhost:8080/api/v1/auth/users");
      setUsers(result.data);
    };

    loadUsers();
  }, []);

  const handleInputChange = (e) => {
    loadUser({ ...user, [e.target.name]: e.target.value });
  };

  const { firstName, lastName, email, phoneNumber } = users;

  //edit update personal info
  const [editPersonalInfo, setEditPersonalInfo] = useState(true);
  const [updatePersonalInfo, setUpdatePersonalInfo] = useState(false);

  const showEdit = () => {
    setEditPersonalInfo(true);
    setUpdatePersonalInfo(false);
  };

  const showUpdate = () => {
    setEditPersonalInfo(false);
    setUpdatePersonalInfo(true);
  };
  console.log(userEmail);
  return (
    <>
      {editPersonalInfo && (
        <div className=" flex flex-col h-full gap-y-5 w-[90%] lg:h-[380px]  lg:w-[680px] bg-[#BCE8B1] rounded shadow-md">
          <div className="lg:w-[95%] lg:m-auto h-[500px] lg:h-[350px]">
            <div className="lg:flex lg:w-[100%] relative lg:gap-x-5 h-[500px] lg:h-[350px]">
              <div className="lg:w-[30%] flex justify-center lg:justify-start">
                <img
                  src={file ? file : profilePic}
                  alt=""
                  className=" h-[150px] w-[250px] lg:p-2 lg:flex lg:w-[200px]  xl:w-[292px] xl:h-[239px]"
                />
              </div>
              <div className="mt-3 w-[90%] flex m-auto relative flex-col lg:w-[70%]">
                <div className="relative">
                  <label
                    htmlFor="firstName"
                    className=" text-[#4D4141] text-opacity-[53%] absolute z-10 top-0 left-2 text-[.8rem] xl:text-[16px]  "
                  >
                    First Name
                  </label>

                  {/* FIRSTNAME INPUT */}

                  <input
                    className="px-2 mb-4 TeamB_input-style"
                    id="firstName"
                    type="text"
                    name="firstName" //should be edited
                    value={firstName}
                    disabled
                  />
                </div>
                <div className="relative ">
                  <label
                    htmlFor="lastName"
                    className=" text-[#4D4141] text-opacity-[53%] absolute z-10 top-0 left-2 text-[.8rem] xl:text-[16px] "
                  >
                    Last Name
                  </label>

                  {/* LASTNAME INPUT */}

                  <input
                    className="px-2 mb-4 TeamB_input-style"
                    id="lastName"
                    type="text"
                    name="lastName" //edit
                    value={lastName}
                    disabled
                  />
                  <div className="lg:flex lg:flex-col ">
                    <div className="relative">
                      <label
                        htmlFor="Email"
                        className=" text-[#4D4141] text-opacity-[53%] absolute   z-10 top-0 left-2 text-[.8rem] xl:text-[16px]"
                      >
                        Email Address
                      </label>

                      {/* EMAIL INPUT */}

                      <input
                        className="px-2 mb-4 TeamB_input-style"
                        id="Email"
                        type="text"
                        name="email" //edit
                        value={userEmail}
                        disabled
                      />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="phonenumber"
                        className=" text-[#4D4141] text-opacity-[53%] absolute   z-10 top-0 left-2 text-[.8rem] xl:text-[16px]"
                      >
                        Contact Number
                      </label>
                      {/* CONTACT NUMBER INPUT */}

                      <input
                        className="px-2 mb-4 TeamB_input-style"
                        placeholder="+63"
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber" //edit
                        value={phoneNumber}
                        disabled
                      />
                      <div />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[100%] flex justify-center lg:justify-end absolute bottom-2 lg:bottom-0">
                <button
                  onClick={showUpdate}
                  className=" TeamB_btn-style  lg:w-[120px] lg:flex lg:justify-center w-[90%] xl:w-[170px] rounded-full"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {updatePersonalInfo && (
        <PersonalEdit
          hideUpdatePersonalInfo={showEdit}
          showEdit={showEdit}
          userEmail={userEmail}
        />
      )}
    </>
  );
};

export default PersonalInfo;

//1/19/2024

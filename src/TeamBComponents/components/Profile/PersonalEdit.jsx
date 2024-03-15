/* eslint-disable react/prop-types */

/* eslint-disable react/no-unknown-property */
// January 12, 2024
import axios from "axios";
import { useContext, useEffect, useState } from "react";

// Import logo for profile pic
import profilePic from "../../../assets/TeamBassests/Registration.png";
import signature from "../../../assets/TeamBassests/signature.png";
import { ProfileContext } from "../context/ProfileContext";
const PersonalEdit = ({ hideUpdatePersonalInfo, showEdit, userEmail }) => {
  const { users, setUsers, file, setFile, sigfile, setSigFile } =
    useContext(ProfileContext);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  function handleChangeSig(e) {
    console.log(e.target.files);
    setSigFile(URL.createObjectURL(e.target.files[0]));
  }
  useEffect(() => {
    const loadUsers = async () => {
      const result = await axios.get("http://localhost:8080/api/v1/auth/users");
      setUsers(result.data);
    };

    loadUsers();
  }, []);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate contact number
    // if (user.phoneNumber.length !== 10) {
    //   // Show an error message or handle the invalid input as per your requirement
    //   alert("Contact number must be exactly 10 digits.");
    //   return; // Stop the submission process
    // }

    // await axios.post("http://localhost:8080/api/v1/auth/users", user);
    setUsers(user);
    showEdit();
  };

  const { firstName, lastName, phoneNumber, email } = users;
  console.log(firstName);

  // React hook for tooltip
  const [showTooltipFirstName, setShowTooltipFirstName] = useState(false);
  const [showTooltipLastName, setShowTooltipLastName] = useState(false);
  const [showTooltipContactNo, setShowTooltipContactNo] = useState(false);
  const [showTooltipUploadSignature, setShowTooltipUploadSignature] =
    useState(false);

  // Set React hook for all text fields
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorContactNo, setErrorContactNo] = useState(false);

  return (
    <>
      <form
        autoComplete="off"
        required
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col h-full gap-y-5 w-[90%] lg:h-[380px] lg:w-[680px]  bg-[#BCE8B1] rounded shadow-md"
      >
        <div className="relative lg:w-[95%] lg:m-auto h-[500px] lg:h-[350px]  ">
          <div className="lg:flex lg:w-[100%] lg:gap-x-5 ">
            {/* IMAGE */}
            <div className="lg:w-[30%] flex lg:flex-col relative justify-between lg:justify-start md:w-[70%] m-auto">
              <label htmlFor="uploadProfile">
                <img
                  src={file ? file : profilePic}
                  alt="Profile_Picture"
                  className="cursor-pointer p-2 lg:flex w-[200px] h-[150px]"
                />
              </label>
              <input
                id="uploadProfile"
                type="file"
                onChange={handleChange}
                className="hidden"
                accept=".svg,.webp,.png"
              />

              {/* UPLOAD PROFILE PIC */}
              <input
                id="uploadProfile"
                type="file"
                className="hidden"
                accept=".svg,.webp,.png"
              />
              <label
                htmlFor="uploadProfile"
                className="cursor-pointer  bottom-2 text-[.8rem] left-2 justify-center items-center absolute text-center font-medium px-2 rounded-sm   bg-[#D1DFCD]  text-[#4D4141] text-opacity-[53%] shadow-lg lg:hidden"
              >
                Choose File
              </label>
              <label>
                <img
                  src={sigfile ? sigfile : signature}
                  alt=""
                  className="cursor-pointer lg:cursor-default p-4 lg:flex w-[200px] h-[150px] "
                />
              </label>
              <input
                id="uploadSignature"
                onChange={handleChangeSig}
                type="file"
                className="hidden"
                accept=".svg,.webp"
              />
              {/* UPLOAD SIGNATURE */}
              <input
                id="uploadSignature"
                type="file"
                className="hidden"
                accept=".svg,.webp"
              />
              <label
                htmlFor="uploadSignature"
                className="cursor-pointer bottom-2 text-[.8rem] right-2 justify-center items-center absolute text-center font-medium px-2 rounded-sm   bg-[#D1DFCD]  text-[#4D4141] text-opacity-[53%] shadow-lg lg:hidden"
              >
                Choose File
              </label>
            </div>
            {/* FORM */}
            <div className="mt-3 w-[90%] flex m-auto relative flex-col lg:w-[70%] ">
              <div className="relative">
                <label
                  htmlFor="firstName"
                  className={`${
                    showTooltipLastName
                      ? "text-[#4D4141] text-opacity-[53%] absolute z-10 top-0 left-2 text-[.8rem] blur-lg"
                      : "text-[#4D4141] text-opacity-[53%] absolute z-10 top-0 left-2 text-[.8rem] "
                  }`}
                >
                  First Name <span className="text-[#FF2626]">*</span>
                </label>
                {/* FIRSTNAME INPUT */}
                <input
                  className={`${
                    showTooltipLastName
                      ? "relative  mb-4 TeamB_input-style px-2 lg:w-full bg-[#EBFFE5] blur-[.1rem]"
                      : "relative  mb-4 TeamB_input-style px-2 lg:w-full bg-[#EBFFE5]"
                  }`}
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => handleInputChange(e)}
                  maxLength={50}
                  required={true}
                  onError={errorFirstName}
                  onKeyPress={(e) => {
                    // Allow only alphabets and some special characters like space
                    const regex = /^[a-zA-Z\s]*$/;
                    if (!regex.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onMouseOver={() => setShowTooltipFirstName(true)}
                  onMouseLeave={() => setShowTooltipFirstName(false)}
                />
                {showTooltipFirstName && (
                  <div className="absolute top-[-3.5rem] left-10 bg-[#fff] w-[60%] p-1 rounded-lg border-[1px] border-[#EBFFE5]">
                    <p className="text-[.8rem] text-[#4D4141] text-opacity-[53%]">
                      Maximum of 50 letters, only alphabets and spaces are
                      allowed.
                    </p>
                  </div>
                )}
              </div>
              <div className="relative">
                <label
                  htmlFor="lastName"
                  className="text-[#4D4141] text-opacity-[53%] absolute z-10 top-0 left-2 text-[.8rem]"
                >
                  Last Name <span className="text-[#FF2626]">*</span>
                </label>
                {/* LASTNAME INPUT */}
                <input
                  className="  mb-4 relative TeamB_input-style px-2 lg:w-full bg-[#EBFFE5]"
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => handleInputChange(e)}
                  maxLength={50}
                  required={true}
                  onError={errorLastName}
                  onKeyPress={(e) => {
                    // Allow only alphabets and some special characters like space
                    const regex = /^[a-zA-Z\s]*$/;
                    if (!regex.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onMouseOver={() => setShowTooltipLastName(true)}
                  onMouseLeave={() => setShowTooltipLastName(false)}
                />
                {showTooltipLastName && (
                  <div className="absolute top-[-3.5rem] left-10 bg-[#fff] w-[60%] p-1 rounded-lg border-[1px] border-[#EBFFE5]">
                    <p className="text-[.8rem] text-[#4D4141] text-opacity-[53%]">
                      Maximum of 50 letters, only alphabets and spaces are
                      allowed.
                    </p>
                  </div>
                )}
              </div>
              <div className="relative">
                <label
                  htmlFor="Email"
                  className={`${
                    showTooltipContactNo
                      ? "text-[#4D4141] text-opacity-[53%] absolute z-10 top-0 left-2 text-[.8rem] blur-lg"
                      : "text-[#4D4141] text-opacity-[53%] absolute z-10 top-0 left-2 text-[.8rem]"
                  }`}
                >
                  Email Address
                </label>
                {/* EMAIL INPUT */}
                <input
                  className="px-2 mb-4 TeamB_input-style"
                  disabled
                  id="Email"
                  type="email"
                  name="email"
                  value={userEmail}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="ContactNumber"
                  className={`${
                    showTooltipUploadSignature
                      ? "text-[#4D4141] text-opacity-[53%] absolute z-10 top-0 left-2 text-[.8rem] blur-lg"
                      : "text-[#4D4141] text-opacity-[53%] absolute z-10 top-0 left-2 text-[.8rem]"
                  }`}
                >
                  Contact Number <span className="text-[#FF2626]">*</span>
                </label>
                {/* CONTACT NUMBER INPUT */}
                <input
                  className={`${
                    showTooltipUploadSignature
                      ? "relative TeamB_input-style px-2 lg:w-full bg-[#EBFFE5] blur-[.1rem]"
                      : "relative TeamB_input-style px-2 lg:w-full bg-[#EBFFE5]"
                  }`}
                  placeholder="+63"
                  type="text" // Change type to text
                  id="PhoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => handleInputChange(e)}
                  pattern="[0-9]*" // Allow only numeric input
                  maxLength={10}
                  required={true}
                  onError={errorContactNo}
                  onKeyPress={(e) => {
                    // Allow only numeric input
                    const isNumeric = /^[0-9\b]+$/;
                    if (!isNumeric.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onMouseOver={() => setShowTooltipContactNo(true)}
                  onMouseLeave={() => setShowTooltipContactNo(false)}
                />

                {showTooltipContactNo && (
                  <div className="absolute top-[-2.5rem] left-10 bg-[#fff] w-[45%] p-1 rounded-lg border-[1px] border-[#EBFFE5]">
                    <p className="text-[.8rem] text-[#4D4141] text-opacity-[53%]">
                      Must not exceed 10 digits.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="relative lg:w-[100%] lg:flex lg:justify-end items-center">
            {showTooltipUploadSignature && (
              <div className="absolute w-[40%] left-10 bg-[#fff] top-[-3rem] p-1 rounded-lg border-[1px] border-[#EBFFE5]">
                <p className="text-[.8rem] text-[#4D4141] text-opacity-[53%]">
                  Upload Signature, no background and must be in svg or webp
                  file format.
                </p>
              </div>
            )}
            {/* UPDATE BUTTON */}
          </div>

          <div className="w-[100%] flex  justify-center items-center lg:justify-end absolute bottom-2 lg:bottom-0 gap-x-5">
            {/* UPLOAD SIGNATURE */}
            <input
              id="uploadSignature"
              type="file"
              className="hidden"
              accept=".svg,.webp"
            />
            <label
              htmlFor="uploadSignature"
              className="cursor-pointer hidden mr-auto lg:w-[130px]  text-center font-bold lg:h-[30px]  bg-[#D1DFCD] lg:text-[.8rem] lg:rounded-lg  text-[#4D4141] text-opacity-[53%] shadow-lg lg:flex justify-center items-center"
              onMouseOver={() => setShowTooltipUploadSignature(true)}
              onMouseLeave={() => setShowTooltipUploadSignature(false)}
            >
              Choose File
            </label>
            <span
              className=" TeamB_btn-style text-black bg-[#fff] lg:bg-transparent rounded-full  w-[42.5%] lg:w-[120px] lg:text-[1rem] font-medium flex justify-center items-center cursor-pointer"
              onClick={hideUpdatePersonalInfo}
            >
              Cancel
            </span>
            <button
              type="submit"
              className="TeamB_btn-style w-[42.5%] lg:w-[120px] lg:flex rounded-full lg:justify-center  "
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PersonalEdit;

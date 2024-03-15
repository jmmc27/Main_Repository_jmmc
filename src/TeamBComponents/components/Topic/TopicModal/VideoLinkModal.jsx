/* eslint-disable react/prop-types */
//2/1/2024 junite, created UI Modal for add topic link, completed
import React from "react"; // Importing React library

const VideoLinkModal = () => {
  // Defining VideoLinkModal functional component
  return (
    <>
      {" "}
      {/* Fragment shorthand */}
      <div className="w-[100%] h-[100vh] pt-[150px] pb-32 backdrop-blur-[.1rem] ">
        {" "}
        {/* Main container with styles */}
        <div className=" flex border-[.01rem] drop-shadow-2xl shadow-lg border-black rounded-lg m-auto bg-white lg:max-w-[550px] ">
          {/* Modal container */}
          <form action="" className="w-[80%] m-auto py-2 ">
            {" "}
            {/* Form container */}
            <div className="flex items-center py-1 text-black lg:font-bold lg:text-3xl lg:py-0">
              {" "}
              {/* Title container */}
              <p className=" pb-5 lg:font-bold TeamB_text-shadow lg:text-[1.2rem]  mt-5">
                {" "}
                {/* Title */}
                Add Topic Link
              </p>
            </div>
            <input
              type="text"
              className="TeamB_input-style bg-[#BCE8B1] opacity-[50%] uppercase p-2" // Input field for topic link
              placeholder="Place your Topic Link"
            />
            <div className="pt-8 lg:w-full lg:flex lg:justify-end">
              {" "}
              {/* Button container */}
              <div className="flex gap-x-5">
                <button className=" lg:text-[1rem]" onClick="">
                  {" "}
                  {/* Cancel button */}
                  Cancel
                </button>

                <button
                  className="drop-shadow-md TeamB_text-shadow   lg:w-[90px] lg:h-[40px] lg:rounded-[80px] lg:text-[1rem]  bg-[#126912]  text-[#FFFFFF]  font-bold"
                  type="submit"
                >
                  {" "}
                  {/* Done button */}
                  <p>Done</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VideoLinkModal; // Exporting VideoLinkModal component
// comments by: Judes 02-22-24

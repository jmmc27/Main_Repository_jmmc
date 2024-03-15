/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
//2/2/2024 junite, created UI Modal for Topic Delete Icon, completed
import React from "react"; // Importing React library

const DeleteAllTopics = ({ deleteAllByTopics, showDeleteAllTopics }) => {
  // Define DeleteTopicModal component

  const handleSubmit = () => {
    deleteAllByTopics();
  };
  return (
    <>
      <div className=" h-[100vh] pt-[150px] backdrop-blur-[.1rem] ">
        {/* Main container */}
        <div className=" flex border-[.01rem] drop-shadow-2xl shadow-lg border-black rounded-lg m-auto bg-[#EBFFE5] lg:max-w-[550px]  ">
          {" "}
          {/* Modal container */}
          <form onSubmit={handleSubmit} className="w-[80%] m-auto ">
            {" "}
            {/* Form */}
            <div className="flex items-center py-1 text-black lg:font-bold lg:text-3lg:py-0">
              {" "}
              {/* Title container */}
              <p className="  lg:font-bold TeamB_text-shadow lg:text-[1.2rem]   pt-2">
                {/* Title */}
                Topic Title
              </p>
            </div>
            <p className=" pb-2 lg:font-bold TeamB_text-shadow lg:text-[1.2rem]   pt-2">
              {" "}
              {/* Confirmation message */}
              Are you sure you want to delete all Topics?
            </p>
            <div className="pt-8 pb-2 lg:w-full lg:flex lg:justify-end">
              {" "}
              {/* Button container */}
              <div className="flex gap-x-5">
                <span
                  className="  lg:text-[1rem]"
                  onClick={() => showDeleteAllTopics((prev) => !prev)}
                >
                  {" "}
                  {/* Cancel button */}
                  Cancel
                </span>

                <button
                  className="drop-shadow-md TeamB_text-shadow   lg:w-[90px] lg:h-[40px] lg:rounded-[80px] lg:text-[1rem]  bg-[#126912] text-[#FFFFFF]  font-bold"
                  type="submit"
                >
                  {" "}
                  {/*button type */}
                  <p>Delete</p> {/* Delete button */}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeleteAllTopics; // Exporting DeleteTopicModal component
// comments by: Judes 02-22-24

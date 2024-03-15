/* eslint-disable no-unused-vars */ // Disabling eslint rule for unused variables
/* eslint-disable react/prop-types */ // Disabling eslint rule for prop types validation
//2/2/2024 junite, created UI Modal for Topic Delete Icon, completed
import React from "react"; // Importing React library

const DeleteChapterModal = ({
  chapterTitle,
  showDeleteModal,
  deleteChap,
  chapterId,
}) => {
  const handleSubmit = () => {
    deleteChap(chapterId);
  };
  return (
    // Returning JSX for component
    <>
      <div className=" h-[100vh] pt-[150px] backdrop-blur-[.1rem] ">
        <div className=" flex border-[.01rem] drop-shadow-2xl shadow-lg border-black rounded-lg m-auto bg-[#EBFFE5] lg:max-w-[550px] 2xl:max-h-[672px] 2xl:max-w-[724px] ">
          <form onSubmit={handleSubmit} className="w-[80%] m-auto ">
            <div className="flex items-center py-1 text-black lg:font-bold lg:text-3xl lg:py-0">
              <p className="  lg:font-bold TeamB_text-shadow lg:text-[1.2rem]  xl:text-[24px] pt-2">
                {chapterTitle}
              </p>
            </div>
            <p className=" pb-2 lg:font-bold TeamB_text-shadow lg:text-[1.2rem]  xl:text-[24px] pt-2">
              Are you sure you want to delete this Chapter?
            </p>
            <div className="pt-8 pb-2 lg:w-full lg:flex lg:justify-end">
              {" "}
              {/* Div container with custom CSS classes */}
              <div className="flex gap-x-5">
                {" "}
                {/* Flex container with custom CSS classes */}
                <button //Cancel button
                  className="xl:text-[24px]  lg:text-[1rem]" //Button with custom CSS classes
                  onClick={() => showDeleteModal((prev) => !prev)}
                >
                  Cancel
                </button>
                <button // Delete button
                  className="drop-shadow-md TeamB_text-shadow lg:w-[90px] lg:h-[40px] lg:rounded-[80px] lg:text-[1rem] xl:w-[114px] xl:h-[58px] xl:rounded-[100px] bg-[#126912] xl:text-[24px] text-[#FFFFFF]  font-bold" // Button with custom CSS classes
                  type="submit"
                >
                  <p>Delete</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeleteChapterModal; // Exporting DeleteChapterModal component
//comments by: Judes 02-29-24

/* eslint-disable react/prop-types */
//february 2 2024 creation of this page and UI -gem
//february 3 modification of ui and functionalities -gem

import { useContext, useState } from "react";
import axios from "axios";

const CopyofCreateChapterTitle = ({ courseId, showModal }) => {
  //state for handling course data
  const [chapter, setChapter] = useState({
    chapter_title: "",
  });

  //destructu course
  const { chapter_title } = chapter;

  const handleInputChange = (e) => {
    setChapter({ ...chapter, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // Assuming your API call is successful, update the state to indicate form submission
    try {
      await axios.post(
        `//localhost:8080/api/v1/auth/course/${courseId}/chapters`,
        chapter
      );
      showModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error if the API call fails
    }
  };
  console.log(chapter);
  //react hook for tooltip
  const [showTooltipChapterTitle, setShowTooltipChapterTitle] = useState(false);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[.1rem] ">
        <div className="w-[90%]  lg:max-w-[550px] 2xl:max-h-[672px] 2xl:max-w-[724px]">
          <div className="flex \ border-[.01rem] drop-shadow-2xl shadow-lg border-black rounded-lg m-auto bg-[#EBFFE5] lg:max-w-[550px] 2xl:max-h-[672px] 2xl:max-w-[724px] ">
            <form onSubmit={handleSubmit} className="w-[80%] m-auto py-2 ">
              <div className="flex items-center py-1 text-black lg:font-bold lg:text-3xl lg:py-0">
                <p className=" lg:font-bold TeamB_text-shadow   text-[24px] pb-2">
                  Add New Chapter
                </p>
              </div>
              <div className="relative w-full ">
                {/* CHAPTER TITLE INPUT */}

                <input
                  maxLength={70}
                  required
                  type="text"
                  className="bg-[#BCE8B1] placeholder-[#070101] shadow-lg placeholder:TeamB_text-shadow   placeholder:xl:text-[24px] rounded-lg opacity-50 w-full py-3 pl-2 box-border"
                  placeholder="Chapter Title"
                  name="chapter_title"
                  value={chapter_title}
                  onChange={(e) => handleInputChange(e)}
                  onMouseOver={() => setShowTooltipChapterTitle(true)}
                  onMouseLeave={() => setShowTooltipChapterTitle(false)}
                />
                {showTooltipChapterTitle && (
                  <div className="absolute top-[-3.5rem] right-0 bg-[#fff]  w-[50%] p-1 rounded-lg border-[1px] border-[#126912]">
                    <p className="text-[.8rem] text-[#4D4141] text-opacity-[53%]">
                      Maximum of 70 alphanumeric and special characters.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end w-full pt-8">
                <div className="flex gap-x-5">
                  <span
                    className="xl:text-[24px]  lg:text-[1rem] cursor-pointer flex items-center justify-center"
                    onClick={() => showModal((prev) => !prev)}
                  >
                    <p>Cancel</p>
                  </span>

                  <button
                    className="drop-shadow-md TeamB_text-shadow  w-[90px] h-[40px] rounded-[80px] lg:text-[1rem] xl:w-[114px] xl:h-[58px] xl:rounded-[100px] bg-[#126912] xl:text-[24px] text-[#FFFFFF]  font-bold"
                    type="submit"
                  >
                    <p>Create</p>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CopyofCreateChapterTitle;
//february 2 2024 creation of this page and UI -gem
//february 3 modification of ui and functionalities -gem

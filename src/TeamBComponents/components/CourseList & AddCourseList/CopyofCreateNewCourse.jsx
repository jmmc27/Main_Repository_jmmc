//1/30/2024 junite, UI modal and functionalities for create course page
// 1/31/2024 junite, UI modifications
//2/1/2024 junite, UI modifications and added success pop when submit form
//2/2/2024 junite, UI modifications add background color for modal

import { useContext, useState } from "react";
import axios from "axios";

//import course context
import { CourseContext } from "../context/CourseContext";
import { useNavigate } from "react-router-dom";

const CopyofCreateNewCourse = () => {
  const navigate = useNavigate();
  //state for handling course data
  const [course, setCourse] = useState({
    // course_id: "",
    course_title: "",
    course_description: "",
  });

  // Add a state variable to track whether the form is submitted
  const [formSubmitted, setFormSubmitted] = useState(false);

  //get showcreatecourse hook in coursecontext
  const { showCreateCourse, setShowCreateCourse } = useContext(CourseContext);

  //destructu course
  const { course_title, course_description, chapters } = course;

  const handleInputChange = (e, chapterIndex) => {
    const { name, value } = e.target;

    let capitalizedValue = value;

    if (name.startsWith("chapter_title")) {
      const updatedChapters = [...chapters];
      updatedChapters[chapterIndex] = {
        ...updatedChapters[chapterIndex],
        chapter_title: value.charAt(0).toUpperCase() + value.slice(1),
      };
      setCourse((prevCourse) => ({
        ...prevCourse,
        chapters: updatedChapters,
      }));
    } else {
      capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setCourse((prevCourse) => ({
        ...prevCourse,
        [name]: capitalizedValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    try {
      const currentDate = new Date().toISOString(); // Get current date/time
      const updatedCourse = { ...course, course_date_created: currentDate };
      await axios.post(
        "http://localhost:8080/api/v1/auth/postCourses",
        updatedCourse
      );
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  console.log(course);
  //react hook for tooltip
  const [showTooltipCourseTitle, setShowTooltipCourseTitle] = useState(false);
  const [showTooltipCourseDescription, setShowTooltipCourseDescription] =
    useState(false);

  return (
    <>
      {!formSubmitted && (
        <div className="fixed inset-0 backdrop-blur-sm ">
          <div className="w-[100%] h-[100vh] flex justify-center items-center ">
            <div className=" flex border-[.01rem] drop-shadow-2xl shadow-lg border-black w-[90%] rounded-lg m-auto bg-[#EBFFE5] md:w-[500px] lg:w-[550px] 2xl:w-h-[672px] 2xl:w-[724px] ">
              <form
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                className="w-[90%] lg:w-[80%] m-auto py-2 "
              >
                <div className="flex items-center py-1 text-black lg:font-bold lg:text-3xl lg:py-0">
                  <p className=" lg:font-bold TeamB_text-shadow   text-[24px] pb-2">
                    Create Course
                  </p>
                </div>
                <div className="relative w-full ">
                  {/* COURSE TITLE INPUT */}

                  <input
                    maxLength={70}
                    required
                    type="text"
                    className="bg-[#BCE8B1] placeholder-[#070101] shadow-lg placeholder:TeamB_text-shadow   placeholder:xl:text-[24px] rounded-lg opacity-50 w-full py-3 pl-2 box-border"
                    placeholder="Course Title"
                    name="course_title"
                    value={course_title}
                    onChange={(e) => handleInputChange(e)}
                    onMouseOver={() => setShowTooltipCourseTitle(true)}
                    onMouseLeave={() => setShowTooltipCourseTitle(false)}
                  />
                  {showTooltipCourseTitle && (
                    <div className="hidden lg:flex absolute top-[-3.5rem] right-0 bg-[#fff]  w-[50%] p-1 rounded-lg border-[1px] border-[#126912]">
                      <p className="text-[.8rem] text-[#4D4141] text-opacity-[53%]">
                        Maximum of 70 alphanumeric and special characters.
                      </p>
                    </div>
                  )}
                </div>

                {/* COURSE BRIEF DESCRIPTION TEXTAREA */}

                <div className="relative w-full pt-3 ">
                  <textarea
                    maxLength={250}
                    required
                    rows="5"
                    name="course_description"
                    value={course_description}
                    className="resize-none bg-[#BCE8B1] placeholder-[#070101] shadow-lg placeholder:TeamB_text-shadow   placeholder:xl:text-[24px] rounded-lg opacity-50 w-full h-[156px] p-4 box-border "
                    placeholder="Course Description"
                    onChange={(e) => handleInputChange(e)}
                    onMouseOver={() => setShowTooltipCourseDescription(true)}
                    onMouseLeave={() => setShowTooltipCourseDescription(false)}
                  />
                  {showTooltipCourseDescription && (
                    <div className=" hidden lg:flex absolute top-[-2.5rem] right-0 bg-[#fff]  w-[50%] p-1 rounded-lg border-[1px] border-[#126912]">
                      <p className="text-[.8rem] text-[#4D4141] text-opacity-[53%]">
                        Maximum of 500 alphanumeric and special characters.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end w-full pt-8">
                  <div className="flex gap-x-5">
                    <button
                      className="xl:text-[24px]  lg:text-[1rem]"
                      onClick={() => setShowCreateCourse((prev) => !prev)}
                    >
                      Cancel
                    </button>

                    <button
                      className="drop-shadow-md TeamB_text-shadow px-3 py-1 rounded-full lg:w-[90px] lg:h-[40px] lg:rounded-[80px] lg:text-[1rem] xl:w-[114px] xl:h-[58px] xl:rounded-[100px] bg-[#126912] xl:text-[24px] text-[#FFFFFF]  font-bold"
                      type="submit"
                    >
                      <p>Save</p>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CopyofCreateNewCourse;

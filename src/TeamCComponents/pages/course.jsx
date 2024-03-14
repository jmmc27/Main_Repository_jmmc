import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../TeamCComponents/css/base_style.css';
import Team_D_HeaderV2 from "../../TeamDComponents/Team_D_HeaderV2";
import axios from "axios";

function TeamC_ChapterSvn() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/auth/getCourses");
        setChapters(response.data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, []);

  console.log(chapters)
  return (
    <>
      {/*Navbar Component*/}
      <Team_D_HeaderV2 />
      <div className="container mt-4 mx-auto" id="c_course_maincontainer">
        {/* Program Overview Title */}
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '2rem'}}>My Courses</h2>

       {chapters.map((chapter, idx) => {
        const {course_title, course_id} = chapter
        console.log(course_title)
        return (
        <div key={idx} id="c_course_courses">
          {/* Chapter Card */}
          <div className="c_course_cardmain">
            {/* Chapter Link */}
            <Link to={`/api/v1/auth/chapters/${course_id}`} className="c_chapter_cardtext">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-award" viewBox="0 0 16 16">
                  <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z"/>
                  <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z"/>
                </svg>
              </div>
              {/* Chapter Tag */}
              <div id="c_course_tag">
                <span id="c_course_tagtext">CC_001</span>
              </div>
              {/* Chapter Card Body */}
              <div id="c_course_cardbody">
                {course_title}
              </div>
            </Link>
            
          </div>
          <hr className="ln"/>
        </div>
        )
       })}
       
      </div>
    </>
  );
}

export default TeamC_ChapterSvn;

import React, { useContext, useEffect } from "react";
import CourseOverviewCard from "./CourseOverviewCard";
import Nav from "../NavBar/Nav";
import { CourseContext } from "../context/CourseContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer";

const CourseOverview = () => {
  const { courses, setCourses } = useContext(CourseContext);

  // const [chapters, setChapters] = useState([]);

  // const { showCreateChapter, setShowCreateChapter } = useContext(ChapterContext);

  //user params to navigate specific id
  let { id } = useParams();

  useEffect(() => {
    loadChapters();
  }, [id]);

  const loadChapters = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/v1/auth/course/${id}`
      );

      // Ensure that result.data is always an array by converting it
      const coursesArray = Array.isArray(result.data)
        ? result.data
        : [result.data];
      setCourses(coursesArray);
    } catch (error) {
      console.error("Error loading chapters:", error);
    }
  };

  return (
    <div className="h-full">
      <Nav />
      <div className="mt-[70px]">
        {/* Use react icon instead of word back */}
        {courses.map((course, idx) => {
          const { course_title } = course;
          return (
            <div key={idx}>
              <CourseOverviewCard courseTitle={course_title} />
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default CourseOverview;

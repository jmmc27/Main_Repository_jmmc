/* eslint-disable react/prop-types */ // Disable eslint warnings for prop-types in this file
import axios from "axios"; // Import axios for HTTP requests
import React, { createContext, useState } from "react"; // Import React, createContext, and useState from 'react'

export const CourseContext = createContext(); // Create a context named CourseContext

const CourseProvider = ({ children }) => {
  // Define a functional component named CourseProvider receiving children as props
  //react state for course api
  const [courses, setCourses] = useState([]); // Define state variable courses and setCourses function using useState hook with an initial value of an empty array

  //chapter state
  const [chapters, setChapters] = useState([]); // Define state variable chapters and setChapters function using useState hook with an initial value of an empty array

  //topic state
  // const [topics, setTopics] = useState([])

  //hide and show create new course
  const [showCreateCourse, setShowCreateCourse] = useState(false); // Define state variable showCreateCourse and setShowCreateCourse function using useState hook with an initial value of false

  return (
    <CourseContext.Provider // Provide the context values to the components below
      value={{
        courses, // Provide courses state variable
        setCourses, // Provide setCourses function
        showCreateCourse, // Provide showCreateCourse state variable
        setShowCreateCourse, // Provide setShowCreateCourse function
        chapters, // Provide chapters state variable
        setChapters, // Provide setChapters function
      }}
    >
      {children} {/* Render the child components */}
    </CourseContext.Provider> // End of CourseContext.Provider
  );
};

export default CourseProvider; //Exporting CourseProvider Component
//comments by: Judes 02-29-24

import axios from "axios"; // Importing Axios library for making HTTP requests
import React, { createContext, useEffect, useState } from "react"; // Importing necessary components from React and react-router-dom
import { useParams } from "react-router-dom";

export const ChapterContext = createContext(); // Creating a new context for chapters

const ChapterProvider = ({ children }) => {
  // Defining the ChapterProvider component
  //react state for course api
  const [chapters, setChapters] = useState([]); // React state for storing chapters

  const [showChapter, setShowCreateChapter] = useState(false); // State for controlling the visibility of create chapter component

  return (
    // Returning the ChapterProvider component with its context
    <ChapterContext.Provider
      value={{
        chapters,
        setChapters,
        showCreateChapter,
        setShowCreateChapter,
      }}
    >
      {children}
    </ChapterContext.Provider>
  );
};

export default ChapterProvider; //Exporting ChapterProvider Component
//comments by: Judes 02-29-24

import React from "react"; // Importing React library

// Importing Spinner component from Material Tailwind
import { Spinner } from "@material-tailwind/react";

// Defining a functional component named Fallbackloading
const Fallbackloading = () => {
  // Defining a functional component named Fallbackloading
  return (
    <div className="h-[100vh] w-[100%] flex justify-center items-center">
      {" "}
      {/*Container div with classes for styling (using Tailwind CSS utility classes) */}
      <div>
        {" "}
        {/* Nested div */}
        <Spinner /> {/* Rendering Spinner component */}
      </div>
    </div>
  );
};

export default Fallbackloading; // Exporting Fallbackloading component
//comments by: Judes 02-22-24

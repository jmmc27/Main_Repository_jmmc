/* eslint-disable react/prop-types */ // Disables prop-types linting for this file
import { createContext } from "react"; // Imports createContext from React

export const AllPageContext = createContext(); // Creates a context named AllPageContext

const AllPageProvider = ({ children }) => {
  // Defines a component named AllPageProvider with children as props
  return (
    <AllPageContext.Provider // Provides the context values to its children
      value={{
        showPerInfo, // Value for showPerInfo context
        setPerInfo, // Value for setPerInfo context
        showAccInfo, // Value for showAccInfo context
        setShowAccInfo, // Value for setShowAccInfo context
      }}
    >
      {children} {/* Renders its children */}
    </AllPageContext.Provider>
  );
};

export default AllPageProvider; // Exporting AllPageProvider Component
//comments by: Judes 02-29-24

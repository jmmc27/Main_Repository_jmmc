/* eslint-disable react/prop-types */ // Disables prop-types linting for this file
import { createContext, useState } from "react"; // Imports React's createContext and useState functions

export const DashBoardContext = createContext(); // Creates a context named DashBoardContext

const DashBoardProvider = ({ children }) => {
  // Defines a component named DashBoardProvider with children as a prop
  //react hook for dashboardhover
  const [dashBoardHover, setDashBoardHover] = useState(false); // Initializes state for dashboard hover

  //onMouseHover hook
  const [hoverClose, setHoverClose] = useState(false); // Initializes state for close hover

  //react hook for show dropdown
  const [showDropDown, setShowDropDown] = useState(false); // Initializes state for dropdown visibility
  return (
    <DashBoardContext.Provider // Provides the context values
      value={{
        dashBoardHover, // Provide dashBoardHover state variable
        setDashBoardHover, // Provide setdashBoardHover function
        setHoverClose, // Provide setHoverClose function
        hoverClose, // Provide HoverClose state variable
        showDropDown, // Provde showDropDown state variable
        setShowDropDown, // Provide setShowDropDown function
      }}
    >
      {children} {/* Renders the children components */}
    </DashBoardContext.Provider>
  );
};

export default DashBoardProvider; //Exporting DashBoardProvider Component
//comments by: Judes 02-29-24

import React from "react"; // Importing React library

const DeleteConfirmationDialog = ({ onCancel, onConfirm }) => {
  // Define DeleteConfirmationDialog functional component with onCancel and onConfirm props
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      {" "}
      {/* Fixed position overlay covering the entire screen */}
      <div className="bg-white p-8 rounded-lg">
        {" "}
        {/* Dialog box with white background, padding, and rounded corners */}
        <p className="text-lg font-semibold mb-4">
          Are you sure you want to delete this?
        </p>{" "}
        {/* Text prompting confirmation */}
        <div className="flex justify-end">
          {" "}
          {/* Flex container for buttons */}
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
            onClick={onCancel}
          >
            {" "}
            {/* "No" button with red background */}
            No
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={onConfirm}
          >
            {" "}
            {/* "Yes" button with green background */}
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog; // Exporting DeleteConfirmationDialog component
//comments by: Judes 02-22-24

import React from "react";

const BtnPrimary = ({ text, onClick }) => {
  return (
    <button
      type="button"
      className="px-5 py-3 mb-2 mr-2 text-lg font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BtnPrimary;

import React from "react";

const BtnRed = ({ text, onClick }) => {
  return (
    <button
      type="button"
      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-3 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BtnRed;

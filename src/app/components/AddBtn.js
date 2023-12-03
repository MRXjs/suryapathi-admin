import React from "react";
import { IconContext } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";

const AddBtn = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-4 py-2 ml-10 text-lg font-bold text-white duration-300 bg-blue-500 rounded-md hover:bg-blue-700"
    >
      <IconContext.Provider
        value={{ color: "white", size: "25", className: "mr-2" }}
      >
        <div>
          <AiOutlinePlus />
        </div>
      </IconContext.Provider>
      {text}
    </button>
  );
};

export default AddBtn;

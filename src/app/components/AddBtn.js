import React from "react";
import { IconContext } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";

const AddBtn = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      class="bg-blue-500 ml-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center text-lg duration-300"
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

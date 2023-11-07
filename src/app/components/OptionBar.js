import React from "react";
import { IconContext } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

const OptionBar = ({ addBtn, setSearchTerm }) => {
  return (
    <div className="fixed top-0 flex items-center w-full p-5 bg-white border-b-2 left-72">
      {addBtn ? (
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center text-lg">
          <IconContext.Provider
            value={{ color: "white", size: "25", className: "mr-2" }}
          >
            <div>
              <AiOutlinePlus />
            </div>
          </IconContext.Provider>
          Add Member
        </button>
      ) : null}
      <div className="flex items-center w-64 ml-10 border-2 border-solid rounded-md">
        <IconContext.Provider
          value={{ color: "#c4c4c4", size: "30", className: "ml-2" }}
        >
          <CiSearch />
        </IconContext.Provider>
        <input
          type="text"
          className="px-4 py-2 outline-none"
          placeholder="Any Columns"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default OptionBar;
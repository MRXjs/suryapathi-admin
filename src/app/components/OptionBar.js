import { approvalStatus } from "@/DB/selecterOptions";
import React from "react";
import { IconContext } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

const OptionBar = ({ setSearchTerm, member, fullWidth, Approval }) => {
  const memberApprovalHandler = (e) => {
    Approval(e.target.value);
  };

  return (
    <div
      className={`fixed top-0 flex items-center w-full p-5 bg-white border-b-2 ${
        fullWidth ? "left-72" : "left-20  duration-300"
      } `}
    >
      {member ? (
        <>
          <button class="bg-blue-500 ml-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center text-lg duration-300">
            <IconContext.Provider
              value={{ color: "white", size: "25", className: "mr-2" }}
            >
              <div>
                <AiOutlinePlus />
              </div>
            </IconContext.Provider>
            Add Member
          </button>
          <div className="flex items-center ml-10">
            <select
              onChange={memberApprovalHandler}
              value={2}
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value={0}>Unapproved</option>
              <option value={1}>Approved</option>
              <option value={2}>Unapproved & Approved </option>
            </select>
          </div>
        </>
      ) : null}

      {!member ? (
        <>
          <div className="flex items-center ml-10">
            <select
              value={"all"}
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value={false}>Unpaid</option>
              <option value={true}>Paid</option>
              <option value={"all"}>Unpaid & Paid </option>
            </select>
          </div>
          <div className="flex items-center ml-10">
            <select
              value={"all"}
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value={false}>Online</option>
              <option value={true}>Bank Transfer</option>
              <option value={"all"}>Online & Bank Transfer </option>
            </select>
          </div>
        </>
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

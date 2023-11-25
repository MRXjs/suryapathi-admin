"use client";
import React, { useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";
import Search from "./Search";
import BtnPrimary from "./BtnPrimary";
import { IoIosRefresh } from "react-icons/io";

const OptionBar = ({
  setIsLoading,
  isLoading,
  member,
  proposal,
  fullWidth,
  setColumnFilters,
  columnFilters,
  setData,
  openAddMember,
}) => {
  const filterOnChangeHandler = (e) => {
    setColumnFilters((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const resetFormAndFilters = () => {
    setColumnFilters({
      memberApproval: "all",
      payment_status: "all",
      payment_method: "all",
      complete_status: "all",
    });
    if (member) {
      const form = document.querySelector("#searchForm");
      form.reset();
    }
  };

  return (
    <div
      className={`fixed top-0 flex items-center w-full p-5 bg-white border-b-2 ${
        fullWidth ? "left-72" : "left-20  duration-300"
      } `}
    >
      {member ? (
        <>
          <button
            onClick={openAddMember}
            class="bg-blue-500 ml-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center text-lg duration-300"
          >
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
              name="memberApproval"
              value={columnFilters.memberApproval}
              onChange={filterOnChangeHandler}
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value={0}>Unapproved</option>
              <option value={1}>Approved</option>
              <option value={"all"}>Unapproved & Approved </option>
            </select>
          </div>
        </>
      ) : null}

      {!member ? (
        <>
          <div className="flex items-center ml-10">
            <select
              name="payment_status"
              value={columnFilters.payment_status}
              onChange={filterOnChangeHandler}
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value={0}>Unpaid</option>
              <option value={1}>Paid</option>
              <option value={"all"}>Unpaid & Paid </option>
            </select>
          </div>
          <div className="flex items-center ml-10">
            <select
              name="payment_method"
              value={columnFilters.payment_method}
              onChange={filterOnChangeHandler}
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value={0}>Bank Transfer</option>
              <option value={1}>Online</option>
              <option value={"all"}>Online & Bank Transfer </option>
            </select>
          </div>
          <div className="flex items-center ml-10">
            <select
              name="complete_status"
              value={columnFilters.complete_status}
              onChange={filterOnChangeHandler}
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value={0}>Pending</option>
              <option value={1}>Complete</option>
              <option value={"all"}>Pending & Complete </option>
            </select>
          </div>
        </>
      ) : null}

      {member ? (
        <div className="flex items-center ml-10 ">
          <Search
            setData={setData}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            member={member}
            proposal={proposal}
          />
        </div>
      ) : null}
      <div className="mt-2 ml-10">
        <BtnPrimary text={<IoIosRefresh />} onClick={resetFormAndFilters} />
      </div>
    </div>
  );
};

export default OptionBar;

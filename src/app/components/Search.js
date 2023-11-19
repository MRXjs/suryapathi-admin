"use client";
import { searchOption } from "@/DB/selecterOptions";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { memberSearch } from "../api/member";

const Search = ({ setData, refresh, setIsLoading, isLoading }) => {
  const searchFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const searchResp = await memberSearch(e);
    setData(searchResp.rows);
    setIsLoading(false);
  };

  return (
    <>
      <form id="searchForm" onSubmit={searchFormSubmit}>
        <div className="flex">
          <select
            name="searchColumn"
            className="block p-2.5 z-20 text-sm text-gray-900 bg-gray-50  border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 border-l-2"
          >
            {searchOption.map((item, index) => (
              <option key={index} value={item.value}>
                {item.text}
              </option>
            ))}
          </select>
          <div className="relative w-full">
            <input
              name="searchTeam"
              type="search"
              className="block p-2.5 z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-72"
              placeholder="Search..."
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   "
            >
              <CiSearch size={25} />
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Search;

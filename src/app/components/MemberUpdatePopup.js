"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { calculateAge } from "../functions/functions";
import {
  castes,
  districts,
  maritalStatus,
  nations,
  professions,
  religions,
} from "@/DB/selecterOptions";
import BtnPrimary from "./BtnPrimary";
import BtnRed from "./BtnRed";
import Avatar from "./Avatar";

const MemberUpdatePopup = ({ open, rowData, onClose }) => {
  const [row, setRow] = useState(rowData);
  useEffect(() => {
    setRow(rowData);
  }, []);

  const handleChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  if (!open) return null;
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center !h-full bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* model container */}
      <div
        className="w-auto h-screen p-4 overflow-y-auto bg-white"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* close btn */}
        <p
          onClick={onClose}
          className="fixed text-3xl cursor-pointer top-5   text-[#b83737] hover:text-[#ff6060] "
        >
          X
        </p>
        <div className="flex justify-center">
          <Avatar img={row.img} />
        </div>
        {/* content */}
        <div className="flex flex-col items-start justify-center m-10 ">
          <div className="w-full mt-5 ">
            <span className="text-lg font-semibold">Name</span>
            <input
              type="text"
              name="name"
              value={row.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
            />
          </div>

          <div className="grid w-full grid-cols-2 gap-5 mt-8">
            <div className="">
              <span className="text-lg font-semibold">Birth Day</span>
              <input
                type="date"
                name="birthDay"
                value={row.birthDay}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              />
            </div>
            <div className="">
              <span className="text-lg font-semibold">Age</span>
              <div className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300">
                {calculateAge(row.birthDay)}
              </div>
            </div>
          </div>

          <span className="mt-8 text-lg font-semibold ">Height</span>
          <div className="grid w-full grid-cols-2 gap-5 ">
            <div>
              <span>Feet</span>
              <input
                type="number"
                name="feet"
                value={row.feet}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              />
            </div>
            <div>
              <span>Inch</span>
              <input
                type="number"
                name="inch"
                value={row.inch}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              />
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-5 mt-8 ">
            <div className="">
              <span className="text-lg font-semibold">NIC</span>
              <input
                type="text"
                name="nicNo"
                value={row.nicNo}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              />
            </div>
            <div className="m-1">
              <span className="text-lg font-semibold">Mobile Number</span>
              <input
                name="mobileNumber"
                type="text"
                value={row.mobileNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              />
            </div>
          </div>
          <div className="grid w-full grid-cols-3 gap-5 mt-8 ">
            <div className="m-1">
              <span className="text-lg font-semibold">Nation</span>
              <select
                value={row.nation}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              >
                {nations.map((nation, index) => (
                  <option key={index} value={index}>
                    {nation.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="m-1">
              <span className="text-lg font-semibold">Religion</span>
              <select
                value={row.religion}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              >
                {religions.map((religion, index) => (
                  <option key={index} value={index}>
                    {religion.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="m-1">
              <span className="text-lg font-semibold">Caste</span>
              <select
                value={row.caste}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              >
                {castes.map((caste, index) => (
                  <option key={index} value={index}>
                    {caste.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-5 mt-8">
            <div className="m-1">
              <span className="text-lg font-semibold">Job</span>
              <select
                value={row.job}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              >
                {professions.map((profession, index) => (
                  <option key={index} value={index}>
                    {profession.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="m-1">
              <span className="text-lg font-semibold">Monthly Income</span>
              <input
                name="monthlyIncome"
                type="number"
                value={row.monthlyIncome}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              />
            </div>
          </div>
          <div className="grid w-full grid-cols-1 mt-8">
            <span className="text-lg font-semibold">Address</span>
            <input
              type="text"
              name="address"
              value={row.address}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
            />
          </div>
          <div className="grid w-full grid-cols-2 gap-5 mt-8 ">
            <div className="m-1">
              <span className="text-lg font-semibold">District</span>
              <select
                value={row.district}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              >
                {districts.map((district, index) => (
                  <option key={index} value={index}>
                    {district.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="m-1">
              <span className="text-lg font-semibold">Marital Status</span>
              <select
                value={row.maritalStatus}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              >
                {maritalStatus.map((state, index) => (
                  <option key={index} value={index}>
                    {state.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* btn container */}
        <div className="flex items-center justify-center gap-5 mb-10 ">
          <BtnPrimary
            text={"Update"}
            onClick={() => {
              console.log("primaryBtnClicked!");
            }}
          />
          <BtnRed
            text={"Reset"}
            onClick={() => {
              console.log("redBtnClicked!");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MemberUpdatePopup;

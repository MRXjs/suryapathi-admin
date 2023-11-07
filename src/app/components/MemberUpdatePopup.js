"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { calculateAge } from "../functions/functions";
import { castes, nation, nations, religions } from "@/DB/selecterOptions";

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
      className="z-50  bg-[rgba(0,0,0,0.5)] fixed w-screen h-screen top-0 left-0"
      onClick={onClose}
    >
      {/* model container */}
      <div
        className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white  shadow-xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* close btn */}
        <p
          onClick={onClose}
          className="fixed text-3xl cursor-pointer top-5 right-5 text-[#797777] hover:text-[#353535]"
        >
          X
        </p>
        <Image alt="" src={row.img} className="m-16 rounded-md" />
        {/* content */}
        <div className="flex flex-col items-start justify-center mb-10 ml-16">
          <div className="m-1">
            <span>Name :</span>{" "}
            <input name="name" value={row.name} onChange={handleChange} />
          </div>
          <div className="m-1">
            <span>Birth Day :</span>
            <input
              type="date"
              name="birthDay"
              value={row.birthDay}
              onChange={handleChange}
            />
          </div>
          <div className="m-1">
            <span>Age :</span> {calculateAge(row.birthDay)}
          </div>
          <div className="flex items-center justify-center gap-4 m-1">
            <span>Height : </span>
            <div>
              <span>Feet :</span>
              <input
                type="number"
                name="feet"
                value={row.feet}
                onChange={handleChange}
              />
              <span>inch :</span>
              <input
                type="number"
                name="inch"
                value={row.inch}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="m-1">
            <span>NIC :</span>
            <input
              type="text"
              name="nicNo"
              value={row.nicNo}
              onChange={handleChange}
            />
          </div>
          <div className="m-1">
            <span>Phone Number :</span>
            <input
              type="text"
              name="mobileNumber"
              value={row.nicNo}
              onChange={handleChange}
            />
          </div>
          <div className="m-1">
            <span>Nation :</span>
            <select value={row.nation}>
              {nations.map((nation, index) => (
                <option key={index} value={index}>
                  {nation.value}
                </option>
              ))}
            </select>
          </div>
          <div className="m-1">
            <span>Religion :</span>
            <select value={row.religion}>
              {religions.map((religion, index) => (
                <option key={index} value={index}>
                  {religion.value}
                </option>
              ))}
            </select>
          </div>
          <div className="m-1">
            <span>Caste :</span>
            <select value={row.caste}>
              {castes.map((caste, index) => (
                <option key={index} value={index}>
                  {caste.value}
                </option>
              ))}
            </select>
          </div>
          <div className="m-1">
            <span>Job :</span> {row.job}
          </div>
          <div className="m-1">
            <span>District :</span> {row.district}
          </div>
          <div className="m-1">
            <span>Mobile Number :</span> {row.mobileNumber}
          </div>
          <div className="m-1">
            <span>Marital Status :</span> {row.maritalStatus}
          </div>
        </div>
        {/* btn container */}
        <div></div>
      </div>
    </div>
  );
};

export default MemberUpdatePopup;

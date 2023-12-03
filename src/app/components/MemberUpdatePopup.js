"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  calculateAge,
  imageUrlToFile,
  isOlderThan16,
} from "../functions/functions";
import {
  castes,
  districts,
  maritalStatus,
  monthlyIncomes,
  nations,
  professions,
  religions,
} from "@/DB/selecterOptions";
import BtnPrimary from "./BtnPrimary";
import BtnRed from "./BtnRed";
import Avatar from "./Avatar";
import { memberUpdate } from "../api/member";
import { useRouter } from "next/navigation";

const MemberUpdatePopup = ({ setIsLoading, open, currentRow, onClose }) => {
  const router = useRouter();
  const avatarEditorRef = useRef();
  const [AvatarImg, setAvatarImg] = useState(null);

  const [row, setRow] = useState({});
  useEffect(() => {
    setRow(currentRow);
  }, [currentRow]);

  useEffect(() => {
    setAvatarImg(null);
  }, [onClose]);

  const handleChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  const avatarOnChangeHandler = (e) => {
    // setRow({
    //   ...row,
    //   profile_image_url: URL.createObjectURL(e.target.files[0]),
    // });
    setAvatarImg(e.target.files[0]);
  };

  const resetAllFiled = () => {
    setRow(currentRow);
  };

  const formSubmitHandler = async () => {
    setIsLoading(true);
    await memberUpdate(avatarEditorRef, row, router);
    setIsLoading(false);
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
          className="fixed text-3xl cursor-pointer top-5   text-[#b83737] hover:text-[#ff6060]"
        >
          X
        </p>
        <div className="flex flex-col items-center justify-center mt-10">
          <h2 className="mb-4 text-3xl text-center">යාවත්කාලින කිරීමේ පෝරමය</h2>
          <Avatar
            editorRef={avatarEditorRef}
            img={
              AvatarImg
                ? URL.createObjectURL(AvatarImg)
                : currentRow.profile_image_url
            }
          />
          <input
            id="profile_image_url"
            name="profile_image_url"
            type="file"
            onChange={avatarOnChangeHandler}
            className="w-1/2 px-4 py-2 mt-5 rounded-md outline-none cursor-pointer ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
          />
        </div>
        {/* content */}
        <div className="flex flex-col items-start justify-center m-10 ">
          <div className="w-full mt-5 ">
            <span className="text-lg font-semibold">Name</span>
            <input
              type="text"
              name="full_name"
              value={row.full_name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
            />
          </div>

          <div className="grid w-full grid-cols-2 gap-5 mt-8">
            <div className="">
              <span className="text-lg font-semibold">Birth Day</span>
              <input
                type="date"
                name="birthday"
                value={row.birthday}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              />
            </div>
            <div className="">
              <span className="text-lg font-semibold">Age</span>
              <div className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300">
                {calculateAge(row.birthday)}
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
                name="inches"
                value={row.inches}
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
                name="nic"
                value={row.nic}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              />
            </div>
            <div className="m-1">
              <span className="text-lg font-semibold">Mobile Number</span>
              <input
                name="phone"
                type="text"
                value={row.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              />
            </div>
          </div>
          <div className="grid w-full grid-cols-3 gap-5 mt-8 ">
            <div className="m-1">
              <span className="text-lg font-semibold">Nation</span>
              <select
                name="nation"
                value={row.nation}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              >
                {nations.map((nation, index) => (
                  <option
                    className={index == 0 ? "hidden" : ""}
                    key={index}
                    value={index}
                  >
                    {nation.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="m-1">
              <span className="text-lg font-semibold">Religion</span>
              <select
                name="religion"
                value={row.religion}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              >
                {religions.map((religion, index) => (
                  <option
                    className={index == 0 ? "hidden" : ""}
                    key={index}
                    value={index}
                  >
                    {religion.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="m-1">
              <span className="text-lg font-semibold">Caste</span>
              <select
                name="caste"
                value={row.caste}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              >
                {castes.map((caste, index) => (
                  <option
                    className={index == 0 ? "hidden" : ""}
                    key={index}
                    value={index}
                  >
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
                name="job"
                value={row.job}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              >
                {professions.map((profession, index) => (
                  <option
                    className={index == 0 ? "hidden" : ""}
                    key={index}
                    value={index}
                  >
                    {profession.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="m-1">
              <span className="text-lg font-semibold">Monthly Income</span>
              <select
                name="salary"
                value={row.salary}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              >
                {monthlyIncomes.map((monthlyIncome, index) => (
                  <option
                    className={index == 0 ? "hidden" : ""}
                    key={index}
                    value={index}
                  >
                    {monthlyIncome.value}
                  </option>
                ))}
              </select>
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
                name="district"
                value={row.district}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              >
                {districts.map((district, index) => (
                  <option
                    className={index == 0 ? "hidden" : ""}
                    key={index}
                    value={index}
                  >
                    {district.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="m-1">
              <span className="text-lg font-semibold">Marital Status</span>
              <select
                name="married_status"
                value={row.married_status}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
              >
                {maritalStatus.map((state, index) => (
                  <option
                    className={index == 0 ? "hidden" : ""}
                    key={index}
                    value={index}
                  >
                    {state.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* btn container */}
        <div className="flex items-center justify-center gap-5 mb-10 ">
          <BtnPrimary text={"Update"} onClick={formSubmitHandler} />
          <BtnRed text={"Reset All Filed"} onClick={resetAllFiled} />
        </div>
      </div>
    </div>
  );
};

export default MemberUpdatePopup;

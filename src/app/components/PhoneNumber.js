"use client";
import React from "react";
import { IconContext } from "react-icons";
import { BsWhatsapp } from "react-icons/Bs";
import { removeCountryCode } from "../functions/functions";

const PhoneNumber = ({ isGreen, info }) => {
  return (
    <a
      target="_blank"
      href={`https://api.whatsapp.com/send/?phone=94${removeCountryCode(
        info.getValue()
      )}&text&type=phone_number&app_absent=0`}
      className={`font-[2em] ${
        isGreen ? "text-green-400" : "text-[#fff]"
      } my-0 mx-[10px] inline-block transition duration-300 hover:-translate-y-1`}
    >
      <div className="flex items-center gap-2">
        <IconContext.Provider value={{ size: "20px" }}>
          <BsWhatsapp />
        </IconContext.Provider>
        <span>{info.getValue()}</span>
      </div>
    </a>
  );
};

export default PhoneNumber;

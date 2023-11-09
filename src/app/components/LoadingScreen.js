import React from "react";
import logImg from "../../../public/logo.png";
import Image from "next/image";

const LoadingScreen = ({ text }) => {
  return (
    <div className="flex items-center  justify-center w-screen h-screen bg-[rgba(0,0,0,0.5)] flex-col fixed z-50 top-0 ">
      <Image src={logImg} alt={"logo"} className="animate-ping" />
      <h1 className="text-5xl text-center text-white animate-pulse">{text}</h1>
    </div>
  );
};

export default LoadingScreen;

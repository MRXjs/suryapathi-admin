"use client";
import React from "react";
import SideBar from "../components/SideBar";
import OptionBar from "../components/OptionBar";

const page = () => {
  return (
    <main>
      <SideBar
        tableWFull={(value) => {
          console.log(value);
        }}
      />
      <OptionBar />
    </main>
  );
};

export default page;

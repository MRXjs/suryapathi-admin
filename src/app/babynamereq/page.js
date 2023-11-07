"use client";
import React from "react";
import SideBar from "../components/SideBar";

const page = () => {
  return (
    <main>
      <SideBar
        tableWFull={(value) => {
          console.log(value);
        }}
      />
    </main>
  );
};

export default page;

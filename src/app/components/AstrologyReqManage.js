"use client";
import SideBar from "../components/SideBar";
import OptionBar from "../components/OptionBar";
import React, { useState } from "react";

const AstrologyReqManage = () => {
  const [tableWFull, setTableWFull] = useState(true);
  return (
    <div>
      <SideBar
        tableWFull={(value) => {
          setTableWFull(value);
        }}
      />
      <OptionBar astrology={true} fullWidth={tableWFull} />
    </div>
  );
};

export default AstrologyReqManage;

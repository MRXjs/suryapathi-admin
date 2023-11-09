"use client";
import SideBar from "../components/SideBar";
import OptionBar from "../components/OptionBar";
import React, { useState } from "react";
import AstrologyReqTable from "./AstrologyReqTable";

const AstrologyReqManage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tableWFull, setTableWFull] = useState(true);
  return (
    <div>
      <SideBar
        tableWFull={(value) => {
          setTableWFull(value);
        }}
      />
      <OptionBar
        setSearchTerm={(value) => setSearchTerm(value)}
        fullWidth={tableWFull}
      />
      <div className="mt-20">
        <AstrologyReqTable searchTerm={searchTerm} tableWFull={tableWFull} />
      </div>
    </div>
  );
};

export default AstrologyReqManage;

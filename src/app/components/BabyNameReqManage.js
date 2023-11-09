"use client";
import React, { useState } from "react";
import SideBar from "./SideBar";
import OptionBar from "./OptionBar";
import BabyNameReqTable from "./BabyNameReqTable";

const BabyNameReqManage = () => {
  const [tableWFull, setTableWFull] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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
        <BabyNameReqTable searchTerm={searchTerm} tableWFull={tableWFull} />
      </div>
    </div>
  );
};

export default BabyNameReqManage;

"use client";
import React, { useState } from "react";
import SideBar from "./SideBar";
import OptionBar from "./OptionBar";
import ProposalReqTable from "./ProposalReqTable";

const ProposalReqManage = () => {
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
        <ProposalReqTable searchTerm={searchTerm} tableWFull={tableWFull} />
      </div>
    </div>
  );
};

export default ProposalReqManage;

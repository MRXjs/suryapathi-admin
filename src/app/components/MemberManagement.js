"use client";
import React, { useEffect, useState } from "react";
import MemberTable from "../components/MemberTable";
import memberData from "@/DB/memberData";
import SideBar from "./SideBar";
import OptionBar from "./OptionBar";

const MemberManagement = () => {
  const [tableWFull, setTableWFull] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [memberApprovalfilter, setMemberApprovalfilter] = useState(2);

  return (
    <div className="w-screen h-screen">
      <SideBar
        tableWFull={(value) => {
          setTableWFull(value);
        }}
      />

      <OptionBar
        member={true}
        setSearchTerm={(value) => setSearchTerm(value)}
        fullWidth={tableWFull}
        Approval={(value) => {
          setMemberApprovalfilter(value);
        }}
      />
      <div className="mt-20">
        <MemberTable
          memberData={memberData}
          searchTerm={searchTerm}
          tableWFull={tableWFull}
          memberApprovalfilterValue={memberApprovalfilter}
        />
      </div>
    </div>
  );
};

export default MemberManagement;

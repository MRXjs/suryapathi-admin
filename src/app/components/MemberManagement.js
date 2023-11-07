"use client";
import React, { useEffect, useState } from "react";
import MemberTable from "../components/MemberTable";
import memberData from "@/DB/memberData";
import SideBar from "./SideBar";
import OptionBar from "./OptionBar";

const MemberManagement = () => {
  const [tableWFull, setTableWFull] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-screen h-screen">
      <SideBar
        tableWFull={(value) => {
          setTableWFull(value);
        }}
      />
      <OptionBar
        addBtn={true}
        isApprovalFilter={true}
        setSearchTerm={(value) => setSearchTerm(value)}
      />
      <div className="mt-20">
        <MemberTable
          memberData={memberData}
          searchTerm={searchTerm}
          tableWFull={tableWFull}
        />
      </div>
    </div>
  );
};

export default MemberManagement;

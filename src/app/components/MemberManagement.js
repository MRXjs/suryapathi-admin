"use client";
import React, { useEffect, useState } from "react";
import MemberTable from "../components/MemberTable";
import memberData from "@/DB/memberData";
import SideBar from "./SideBar";
import OptionBar from "./OptionBar";

const MemberManagement = () => {
  const [tableWFull, setTableWFull] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);

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
        setColumnFilters={(values) => setColumnFilters(values)}
      />
      <div className="mt-20">
        <MemberTable
          memberData={memberData}
          searchTerm={searchTerm}
          tableWFull={tableWFull}
          columnFilters={columnFilters}
        />
      </div>
    </div>
  );
};

export default MemberManagement;

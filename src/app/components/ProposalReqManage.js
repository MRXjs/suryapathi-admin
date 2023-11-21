"use client";
import React, { useState } from "react";
import SideBar from "./SideBar";
import OptionBar from "./OptionBar";
import ProposalReqTable from "./ProposalReqTable";
import LoadingScreen from "./LoadingScreen";

const ProposalReqManage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [tableWFull, setTableWFull] = useState(true);
  const [popups, setPopups] = useState({
    addMemberPopup: false,
  });
  const [columnFilters, setColumnFilters] = useState({
    memberApproval: "all",
    payment_status: "all",
    payment_method: "all",
  });

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      <div>
        <SideBar
          tableWFull={(value) => {
            setTableWFull(value);
          }}
        />
        <OptionBar
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          fullWidth={tableWFull}
          setColumnFilters={(values) => setColumnFilters(values)}
          columnFilters={columnFilters}
          setData={setData}
          proposal={true}
        />
        <div className="mt-20">
          <ProposalReqTable
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            setData={setData}
            data={data}
            columnFilters={columnFilters}
            tableWFull={tableWFull}
          />
        </div>
      </div>
    </>
  );
};

export default ProposalReqManage;

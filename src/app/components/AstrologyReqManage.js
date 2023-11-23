"use client";
import SideBar from "../components/SideBar";
import OptionBar from "../components/OptionBar";
import React, { useState } from "react";
import AstrologyReqTable from "./AstrologyReqTable";
import LoadingScreen from "./LoadingScreen";

const AstrologyReqManage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [tableWFull, setTableWFull] = useState(true);
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
          fullWidth={tableWFull}
          setColumnFilters={(values) => setColumnFilters(values)}
          columnFilters={columnFilters}
          setData={setData}
          astrology={true}
        />
        <div className="mt-20">
          <AstrologyReqTable
            setIsLoading={setIsLoading}
            tableWFull={tableWFull}
            data={data}
            setData={setData}
            columnFilters={columnFilters}
          />
        </div>
      </div>
    </>
  );
};

export default AstrologyReqManage;

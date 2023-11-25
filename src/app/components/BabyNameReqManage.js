"use client";
import React, { useState } from "react";
import SideBar from "./SideBar";
import OptionBar from "./OptionBar";
import BabyNameReqTable from "./BabyNameReqTable";
import LoadingScreen from "./LoadingScreen";

const BabyNameReqManage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [tableWFull, setTableWFull] = useState(true);
  const [columnFilters, setColumnFilters] = useState({
    memberApproval: "all",
    payment_status: "all",
    payment_method: "all",
    complete_status: "all",
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
          babyName={true}
        />
        <div className="mt-20">
          <BabyNameReqTable
            setIsLoading={setIsLoading}
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

export default BabyNameReqManage;

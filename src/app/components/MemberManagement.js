"use client";
import React, { useEffect, useState } from "react";
import MemberTable from "../components/MemberTable";
import SideBar from "./SideBar";
import OptionBar from "./OptionBar";
import LoadingScreen from "./LoadingScreen";
import AddMemberPopup from "./AddMemberPopup";

const MemberManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableWFull, setTableWFull] = useState(true);
  const [data, setData] = useState([]);
  const [popups, setPopups] = useState({
    addMemberPopup: false,
    isMemberUpdatePopup: false,
    isProfileImgViewer: false,
  });
  const [columnFilters, setColumnFilters] = useState({
    memberApproval: "all",
    payment_status: "all",
    payment_method: "all",
  });

  const openAddMember = () => {
    setPopups((prevValue) => ({
      ...prevValue,
      ["addMemberPopup"]: true,
    }));
  };

  const closeAddMember = () => {
    setPopups((prevValue) => ({
      ...prevValue,
      ["addMemberPopup"]: false,
    }));
  };

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      <AddMemberPopup
        open={popups.addMemberPopup}
        onClose={closeAddMember}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <div className="w-screen h-screen">
        <SideBar
          tableWFull={(value) => {
            setTableWFull(value);
          }}
        />

        <OptionBar
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          member={true}
          fullWidth={tableWFull}
          setColumnFilters={(values) => setColumnFilters(values)}
          columnFilters={columnFilters}
          openAddMember={openAddMember}
          setData={setData}
        />
        <div className="mt-20">
          <MemberTable
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            setData={setData}
            data={data}
            tableWFull={tableWFull}
            columnFilters={columnFilters}
            popups={popups}
            setPopups={setPopups}
          />
        </div>
      </div>
    </>
  );
};

export default MemberManagement;

"use client";
import React, { useEffect, useState } from "react";
import MemberTable from "../components/MemberTable";
import SideBar from "./SideBar";
import OptionBar from "./OptionBar";
import LoadingScreen from "./LoadingScreen";
import AddMemberPopup from "./AddMemberPopup";
import MemberUpdatePopup from "./MemberUpdatePopup";
import ProfileImageViewer from "./ProfileImageViewer";

const MemberManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableWFull, setTableWFull] = useState(true);
  const [data, setData] = useState([]);
  const [currentRow, setCurrentRow] = useState({});
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

  const refresh = () => {
    setColumnFilters({
      memberApproval: "all",
      payment_status: "all",
      payment_method: "all",
    });
  };

  const openAddMember = () => {
    setPopups((prevValue) => ({
      ...prevValue,
      ["addMemberPopup"]: true,
    }));
  };

  const closeAddMember = () => {
    refresh();
    setPopups((prevValue) => ({
      ...prevValue,
      ["addMemberPopup"]: false,
    }));
  };

  const openUpdateMember = () => {
    setPopups((prevValue) => ({
      ...prevValue,
      ["isMemberUpdatePopup"]: true,
    }));
  };

  const closeUpdateMember = () => {
    refresh();
    setPopups((prevValue) => ({
      ...prevValue,
      ["isMemberUpdatePopup"]: false,
    }));
  };

  const openProfileImgViewer = () => {
    setPopups((prevValue) => ({
      ...prevValue,
      ["isProfileImgViewer"]: true,
    }));
  };

  const closeProfileImgViewer = () => {
    setPopups((prevValue) => ({
      ...prevValue,
      ["isProfileImgViewer"]: false,
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

      <MemberUpdatePopup
        setIsLoading={setIsLoading}
        open={popups.isMemberUpdatePopup}
        currentRow={currentRow}
        onClose={closeUpdateMember}
      />

      <ProfileImageViewer
        open={popups.isProfileImgViewer}
        img={currentRow.profile_image_url}
        onClose={closeProfileImgViewer}
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
            setData={setData}
            data={data}
            tableWFull={tableWFull}
            columnFilters={columnFilters}
            openUpdateMember={openUpdateMember}
            setCurrentRow={setCurrentRow}
            openProfileImgViewer={openProfileImgViewer}
          />
        </div>
      </div>
    </>
  );
};

export default MemberManagement;

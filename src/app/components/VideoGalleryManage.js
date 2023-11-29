"use client";
import React, { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import SideBar from "./SideBar";
import OptionBar from "./OptionBar";
import VideoGalleryTable from "./VideoGalleryTable";
import videoGalleryData from "@/DB/videoGalleryData";
import AddVideoPopup from "./AddVideoPopup";

const VideoGalleryManage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(videoGalleryData);
  const [tableWFull, setTableWFull] = useState(true);
  const [columnFilters, setColumnFilters] = useState({
    memberApproval: "all",
    payment_status: "all",
    payment_method: "all",
    complete_status: "all",
  });

  const [popups, setPopups] = useState({
    isAddVideoPopup: false,
    isVideoUpdatePopup: false,
    isVideoViewer: false,
  });

  const openAddVideo = () => {
    setPopups((prevValue) => ({
      ...prevValue,
      ["isAddVideoPopup"]: true,
    }));
  };

  const closeAddVideo = () => {
    setPopups((prevValue) => ({
      ...prevValue,
      ["isAddVideoPopup"]: false,
    }));
  };

  return (
    <div>
      <>
        {isLoading ? <LoadingScreen /> : null}

        <AddVideoPopup
          open={popups.isAddVideoPopup}
          onClose={closeAddVideo}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />

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
            videoGallery={true}
            openAddVideo={openAddVideo}
          />
          <div className="mt-20">
            <VideoGalleryTable
              setIsLoading={setIsLoading}
              setData={setData}
              data={data}
              columnFilters={columnFilters}
              tableWFull={tableWFull}
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default VideoGalleryManage;

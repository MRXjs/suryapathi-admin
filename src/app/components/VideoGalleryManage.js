"use client";
import React, { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import SideBar from "./SideBar";
import OptionBar from "./OptionBar";
import VideoGalleryTable from "./VideoGalleryTable";
import AddVideoPopup from "./AddVideoPopup";
import VideoViewPopup from "./VideoViewPopup";
import { ToastContainer } from "react-toastify";

const VideoGalleryManage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentRow, setCurrentRow] = useState({});
  const [tableWFull, setTableWFull] = useState(true);
  const [columnFilters, setColumnFilters] = useState({
    memberApproval: "all",
    payment_status: "all",
    payment_method: "all",
    complete_status: "all",
  });

  const [popups, setPopups] = useState({
    isAddVideoPopup: false,
    isVideoViewer: false,
  });

  const openAddVideo = () => {
    setPopups((prevValue) => ({
      ...prevValue,
      ["isAddVideoPopup"]: true,
    }));
  };

  const closeAddVideo = () => {
    setColumnFilters({
      memberApproval: "all",
      payment_status: "all",
      payment_method: "all",
      complete_status: "all",
    });
    setPopups((prevValue) => ({
      ...prevValue,
      ["isAddVideoPopup"]: false,
    }));
  };

  const openVideoViewer = () => {
    setPopups((prevValue) => ({
      ...prevValue,
      ["isVideoViewer"]: true,
    }));
    console.log("test");
  };

  const closeVideoViewer = () => {
    setPopups((prevValue) => ({
      ...prevValue,
      ["isVideoViewer"]: false,
    }));
  };

  return (
    <div>
      <>
        <ToastContainer />
        {isLoading ? <LoadingScreen /> : null}

        <AddVideoPopup
          open={popups.isAddVideoPopup}
          onClose={closeAddVideo}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />

        <VideoViewPopup
          open={popups.isVideoViewer}
          video={currentRow}
          onClose={closeVideoViewer}
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
              setCurrentRow={setCurrentRow}
              currentRow={currentRow}
              openVideoViewer={openVideoViewer}
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default VideoGalleryManage;

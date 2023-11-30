import React from "react";
import BtnRed from "./BtnRed";
import FormError from "./FormError";
import { extractVideoId } from "../functions/functions";

const VideoViewPopup = ({ open, video, onClose }) => {
  if (!open) return null;
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center !h-full bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* model container */}
      <div
        className="w-auto p-4 overflow-y-auto bg-white "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* close btn */}
        <p
          onClick={onClose}
          className="fixed text-3xl cursor-pointer top-20 text-[#b83737] hover:text-[#ff6060] "
        >
          X
        </p>

        <div className="flex mx-auto overflow-hidden bg-white shadow-lg rounded-xl">
          <div className="px-4 py-16 sm:px-12 ">
            <iframe
              width="1280"
              height="720"
              src={`https://www.youtube.com/embed/${
                video.video_id ? video.video_id : ""
              }`}
              title={video.title}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoViewPopup;

import Image from "next/image";
import React from "react";

const ProfileImageViewer = ({ open, img, onClose }) => {
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center !h-full bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* model container */}
      <div
        className="w-auto h-screen p-4 overflow-y-auto bg-white"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* close btn */}
        <p
          onClick={onClose}
          className="fixed text-3xl cursor-pointer top-5   text-[#b83737] hover:text-[#ff6060] "
        >
          X
        </p>
        {/* container */}
        <div>
          <Image
            src="https://pbs.twimg.com/profile_images/1174396537541156866/UTE-XOnb_400x400.jpg"
            alt="profile image"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileImageViewer;

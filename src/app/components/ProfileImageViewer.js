import Image from "next/image";
import React from "react";

const ProfileImageViewer = ({ open, img, onClose }) => {
  if (!open) return null;
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center !h-full bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* model container */}
      <div
        className="w-auto p-20 overflow-y-auto bg-white "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* close btn */}
        <p
          onClick={onClose}
          className="relative -top-10 -left-10  text-3xl cursor-pointer text-[#b83737] hover:text-[#ff6060] "
        >
          X
        </p>
        {/* container */}
        <div className="flex items-center justify-center ">
          <Image width={300} height={300} src={img} alt="profile image" />
        </div>
      </div>
    </div>
  );
};

export default ProfileImageViewer;

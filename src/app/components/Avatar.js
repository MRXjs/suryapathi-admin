"use client";
import React, { useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

const Avatar = ({ editorRef, img }) => {
  const [zoom, setZoom] = useState(1);

  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setZoom(scale);
  };

  return (
    <div>
      <AvatarEditor
        ref={editorRef}
        image={img}
        width={250}
        height={250}
        border={50}
        color={[208, 232, 148, 0.7]} // RGBA
        scale={zoom}
        rotate={0}
        // crossOrigin="anonymous"
        crossOrigin="use-credentials"
      />
      <div className="flex items-center justify-center mt-5">
        <span>Zoom</span>
        <input
          name="scale"
          type="range"
          onChange={handleScale}
          min={"1"}
          max="3"
          step="0.01"
          defaultValue="1"
        />
      </div>
    </div>
  );
};

export default Avatar;

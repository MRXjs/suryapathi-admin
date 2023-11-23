"use client";
import React, { useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

const Avatar = ({ img }) => {
  const editorRef = useRef();
  const [zoom, setZoom] = useState(1);

  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setZoom(scale);
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      localStorage.setItem("avatar", canvas.toDataURL("avatar/png"));
    }
  };

  return (
    <div>
      <AvatarEditor
        ref={editorRef}
        onMouseUp={handleSave}
        image={img}
        width={250}
        height={250}
        border={50}
        color={[208, 232, 148, 0.7]} // RGBA
        scale={zoom}
        rotate={0}
        onImageReady={handleSave}
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
          onTouchEnd={handleSave}
          onMouseUp={handleSave}
        />
      </div>
    </div>
  );
};

export default Avatar;

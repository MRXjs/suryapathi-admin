"use client";
import React, { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

const Avatar = ({ img }) => {
  const [newImage, setNewImg] = useState(img.src);
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
        image={newImage}
        width={250}
        height={250}
        border={50}
        color={[255, 255, 255, 0.6]}
        scale={zoom}
        rotate={0}
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
      <input type="file" onChange={(e) => setNewImg(e.target.files[0])} />
    </div>
  );
};

export default Avatar;

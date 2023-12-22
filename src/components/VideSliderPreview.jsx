import React from "react";

const VideoSliderPreview = ({ frames, framesInView = 4, currentTimeStamp }) => {
  return (
    <div className="flex items-center overflow-x-auto w-full">
      {frames.map((frame, idx) => (
        <div className="w-32 h-32 overflow-hidden flex-grow-0 flex-shrink-0 flex-auto">
          <img src={frame?.url} alt={`frame_${idx}`} className="max-w-full" />
        </div>
      ))}
    </div>
  );
};

export default VideoSliderPreview;

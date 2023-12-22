import React from "react";

const VideoSliderPreview = ({ frames, framesInView = 4, currentTimeStamp }) => {
  return (
    <div className="border-2 border-black shadow-xl rounded-lg flex items-center overflow-x-auto w-full pt-6">
      {frames.map((frame, idx) => (
        <div
          key={idx}
          className="overflow-hidden w-60 flex-grow-0 flex-shrink-0 flex-auto"
        >
          <img src={frame?.url} className="max-w-full" />
        </div>
      ))}
    </div>
  );
};

export default VideoSliderPreview;

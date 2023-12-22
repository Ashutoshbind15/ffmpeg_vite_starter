import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import VideoSliderPreview from "./VideSliderPreview";

const TempPlayer = ({
  onHandleSubmit,
  videoUrl = import.meta.env.VITE_FILE_URI,
  frames = [],
}) => {
  const videoRef = useRef(null);
  const [played, setPlayed] = useState(0);
  const [selectStart, setSelectStart] = useState(true);

  const handleOnProgress = (p) => {
    setPlayed(p.played);
  };

  const handleSliderChange = (val) => {
    setPlayed(val);
    videoRef.current.seekTo(val, "fraction");
  };

  return (
    <div className="flex flex-col items-center px-12">
      <ReactPlayer
        url={videoUrl}
        ref={videoRef}
        controls
        onProgress={handleOnProgress}
        config={{ file: { attributes: { crossOrigin: "anonymous" } } }}
        progressInterval={100}
        className="w-3/5"
      />

      <input
        type="range"
        min={0}
        max={1}
        step="any"
        value={played}
        onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
        className="w-4/5"
      />

      <VideoSliderPreview
        frames={frames}
        progress={played}
        setProgress={setPlayed}
      />

      <div className="flex items-center py-5">
        <button
          disabled={!selectStart}
          className="px-2 border-y-2 border-l-2 border-black rounded-l-lg"
        >
          Start
        </button>
        <button
          disabled={selectStart}
          className="px-2 border-y-2 border-r-2 rounded-r-lg border-black"
        >
          End
        </button>
      </div>
    </div>
  );
};

export default TempPlayer;

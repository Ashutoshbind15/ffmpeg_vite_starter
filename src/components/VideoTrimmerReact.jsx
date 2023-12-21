import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const VideoTrimmerReact = ({ videoUrl, onSelectRange }) => {
  const playerRef = useRef(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const handleOnProgress = (progress) => {
    // Update end time based on video playback progress
    setEndTime(progress.playedSeconds);
  };

  const handleSelectStart = () => {
    // Set the start time when the user clicks the "Select Start" button
    setStartTime(playerRef.current.getCurrentTime());
  };

  const handleSliderChange = (values) => {
    // Update video playback time based on slider change
    setEndTime(values[1]);
    playerRef.current.seekTo(values[0]);
  };

  const handleSliderAfterChange = () => {
    // Callback to parent component with selected range
    // onSelectRange(startTime, endTime);
  };

  const handleSelectEnd = () => {
    // Set the end time when the user clicks the "Select End" button
    setEndTime(playerRef.current.getCurrentTime());
    console.log(playerRef.current);
  };

  const handleRenderSelected = () => {
    // Callback to parent component with selected range
    console.log(startTime, endTime);
    onSelectRange(startTime, endTime);
  };

  const handleOnDuration = (duration) => {
    // Set the video duration when it's loaded
    setVideoDuration(duration);
  };

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        controls
        onProgress={handleOnProgress}
        config={{ file: { attributes: { crossOrigin: "anonymous" } } }}
        onDuration={handleOnDuration}
      />

      <div>
        <Slider
          range
          min={0}
          max={videoDuration}
          step={1}
          onChange={handleSliderChange}
          onChangeComplete={handleSliderAfterChange}
          value={[startTime, endTime]}
        />

        <button onClick={handleSelectStart}>Select Start</button>
        <button onClick={handleSelectEnd}>Select End</button>
        <button onClick={handleRenderSelected}>Render Selected</button>
      </div>
    </div>
  );
};

export default VideoTrimmerReact;

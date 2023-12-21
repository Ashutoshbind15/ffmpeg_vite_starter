import React, { useState, useRef, useEffect } from "react";

const VideoTrimmer = () => {
  const videoRef = useRef(null);
  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(0);

  const handlePreview = () => {
    // Logic to handle preview based on start and end points
    videoRef.current.currentTime = startPoint;
    videoRef.current.play();
  };

  const handleTrim = () => {
    // Logic to trim video based on start and end points
    // You can use these points to extract the trimmed portion of the video
    console.log(`Trimming video from ${startPoint} to ${endPoint}`);
  };

  const handleTimeUpdate = () => {
    // Update the end point whenever the video playback position changes
    setEndPoint(videoRef.current.currentTime);
  };

  useEffect(() => {
    const element = videoRef.current;
    console.log(element);
    console.log(element?.duration);
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        controls
        onTimeUpdate={handleTimeUpdate}
        crossOrigin="anonymous"
      >
        <source src={import.meta.env.VITE_FILE_URI} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div>
        <label>Start Point:</label>
        <input
          type="range"
          min="0"
          max={endPoint}
          step="0.1"
          value={startPoint}
          onChange={(e) => setStartPoint(parseFloat(e.target.value))}
        />
        <span>{startPoint.toFixed(1)}</span>
      </div>

      <div>
        <label>End Point:</label>
        <input
          type="range"
          min={startPoint}
          max={videoRef.current ? videoRef.current.duration : 0}
          step="0.1"
          value={endPoint}
          onChange={(e) => setEndPoint(parseFloat(e.target.value))}
        />
        <span>{endPoint.toFixed(1)}</span>
      </div>

      <button onClick={handlePreview}>Preview</button>
      <button onClick={handleTrim}>Trim</button>
    </div>
  );
};

export default VideoTrimmer;

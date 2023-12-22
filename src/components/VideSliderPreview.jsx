import React from "react";

const VideoSliderPreview = ({
  frames,
  framesPerSegment = 5,
  progress,
  setProgress,
}) => {
  const numberOfFrames = frames.length;

  // calculate the segment number from the prog which comes in as a fraction

  const segmentNumber = Math.floor(
    (progress * numberOfFrames) / framesPerSegment
  );

  // calculate the start and end frames for the segment

  const startFrame = segmentNumber * framesPerSegment;
  const endFrame = (segmentNumber + 1) * framesPerSegment;

  // slice the frames array to get the frames for the segment

  const segmentFrames = frames.slice(startFrame, endFrame);
  const currentFrame = frames[Math.floor(progress * numberOfFrames)];
  const numberOfSegs = Math.ceil(numberOfFrames / framesPerSegment);

  const currentFrameIndex = Math.floor(progress * numberOfFrames);

  // progress in the segment in percentage

  const segmentProgress =
    ((progress * numberOfFrames) % framesPerSegment) / framesPerSegment;

  const contributionOfEachSegment = 1 / numberOfSegs;

  // the total progress = (segnum)*contribeach + progress * contribeach -> (segnum + segprog)* contribution of each

  const totalProgress =
    (segmentNumber + segmentProgress) * contributionOfEachSegment;
  console.log(
    progress,
    segmentProgress,
    currentFrameIndex,
    segmentNumber,
    totalProgress
  );
  const handleSegmentProgress = (p) => {
    // calculate the overall progress using the segment number and segment progress and total number of segments
    // say we got 4 segs -> each contribute to 25% then
    // contrib of each = 1/(numseg)
  };

  return (
    <>
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

      <input
        type="range"
        min={0}
        max={1}
        step={"any"}
        value={segmentProgress}
        onChange={handleSegmentProgress}
      />
    </>
  );
};

export default VideoSliderPreview;

import React from "react";

const VideoSliderPreview = ({
  frames,
  framesPerSegment = 4,
  progress,
  setProgress,
}) => {
  const numberOfFrames = frames.length;
  const frameNumber = Math.floor(progress * numberOfFrames);
  const segmentNumber = Math.floor(frameNumber / framesPerSegment);

  const startFrame = segmentNumber * framesPerSegment;
  const endFrame = (segmentNumber + 1) * framesPerSegment;

  const segmentFrames = frames.slice(startFrame, endFrame);
  const numberOfSegs = Math.ceil(numberOfFrames / framesPerSegment);

  // progress in the segment in percentage using the progress and frames per segment

  const percByEachSegment = 1 / numberOfSegs;
  const percByEachFrame = 1 / framesPerSegment;
  const idxOfFrameInSegment = frameNumber % framesPerSegment;

  // const segmentProgress = (progress % percByEachSegment) / percByEachSegment;
  // const segmentProgress = (frameNumber % framesPerSegment) / framesPerSegment;

  const contributionOfEachSegment = 1 / numberOfSegs;

  // const totalProgress =
  //   (segmentNumber + segmentProgress) * contributionOfEachSegment;

  const y = framesPerSegment / numberOfFrames;
  const x = progress % y;
  const segmentProgress = x / y;

  // console.log("Segment Number", segmentNumber);
  // console.log("Frame Number", frameNumber);
  // console.log("segment progress", segmentProgress);

  const handleSegmentProgress = (p) => {
    // calculate the overall progress using the segment number and segment progress and total number of segments
    // say we got 4 segs -> each contribute to 25% then
    // contrib of each = 1/(numseg)
    // setProgress(totalProgress);

    console.log(p.target.value);

    const a = segmentNumber;
    const b = p.target.value;

    console.log("a", a);
    console.log("b", +b);
    console.log("y", y);

    const pg = (a + +b) * y;

    // setProgress(progress);
    console.log("progress", pg, "actual progress", progress);
    setProgress(pg);
  };

  return (
    <>
      <div className="border-2 border-black shadow-xl rounded-lg flex items-center overflow-x-auto w-full pt-6 my-6">
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

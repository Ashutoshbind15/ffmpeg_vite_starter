import { useEffect, useRef, useState } from "react";
import "./App.css";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import VideoTrimmerReact from "./components/VideoTrimmerReact";

function App() {
  const [isReady, setIsReady] = useState(false);
  const [editedVideo, setEditedVideo] = useState(null);

  const ffmpegRef = useRef(new FFmpeg({ log: true }));

  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.5/dist/esm";

  const load = async () => {
    ffmpegRef.current.on("log", ({ message }) => {
      console.log(message);
    });

    await ffmpegRef.current.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    setIsReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <h1>OK</h1>
      {isReady && (
        <VideoTrimmerReact
          videoUrl={import.meta.env.VITE_FILE_URI}
          onSelectRange={async (s, e) => {
            const ffmpeg = ffmpegRef.current;
            await ffmpeg.writeFile(
              "input.mp4",
              await fetchFile(import.meta.env.VITE_FILE_URI)
            );

            // await ffmpeg.run('-i', 'input.mp4', '-ss', '00:00:10', '-t', '00:00:20', '-c', 'copy', 'output.mp4');
            // await ffmpeg.run('-i', inputVideo, '-ss', startTime, '-to', endTime, '-c', 'copy', outputTrimmedVideo);
            // await ffmpeg.run('-i', inputVideo, '-ss', startTime, '-t', duration, '-c', 'copy', outputTrimmedVideo);

            await ffmpeg.exec([
              "-ss",
              "4",
              "-i",
              "input.mp4",
              "-t",
              "4",
              "-c",
              "copy",
              "output.mp4",
            ]);
            const data = await ffmpeg.readFile("output.mp4");
            console.log(data);

            const vstr = URL.createObjectURL(
              new Blob([data.buffer], { type: "video/mp4" })
            );
            setEditedVideo(vstr);
          }}
        />
      )}
      {editedVideo && <video src={editedVideo} controls />}

      {editedVideo && (
        <a href={editedVideo} download={"a.mp4"}>
          Download
        </a>
      )}
      <h1>{import.meta.env.VITE_FILE_URI}</h1>
    </>
  );
}

export default App;

import { useEffect, useRef, useState } from "react";
import "./App.css";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import ReactPlayer from "react-player";
import VidePlayer from "./components/VideoPlayer";

function App() {
  const [isReady, setIsReady] = useState(false);
  const [editedVideo, setEditedVideo] = useState(null);
  const [frames, setFrames] = useState([]);

  useEffect(() => {
    if (isReady) fetchDataFrames();
  }, [isReady]);

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

  const fetchDataFrames = async () => {
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile(
      "input.mp4",
      await fetchFile(import.meta.env.VITE_FILE_URI)
    );

    // extract frames at 1fps jpeg at quality 30

    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-vf",
      "fps=1",
      "-qscale:v",
      "30",
      "frames%d.jpg",
    ]);

    // read each frame, convert to a src for a set of img tags

    for (let i = 1; i < 10; i++) {
      const data = await ffmpeg.readFile(`frames${i}.jpg`);
      const src = URL.createObjectURL(
        new Blob([data.buffer], { type: "image/jpeg" })
      );
      setFrames((prev) => [...prev, { url: src, id: i }]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="">
      {isReady && (
        <VidePlayer
          videoUrl={import.meta.env.VITE_FILE_URI}
          onHandleSubmit={async (s, e) => {
            const ffmpeg = ffmpegRef.current;
            await ffmpeg.writeFile(
              "input.mp4",
              await fetchFile(import.meta.env.VITE_FILE_URI)
            );

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

            const vstr = URL.createObjectURL(
              new Blob([data.buffer], { type: "video/mp4" })
            );
            setEditedVideo(vstr);
          }}
          frames={frames}
        />
      )}
      {editedVideo && <ReactPlayer url={editedVideo} controls />}
      {editedVideo && (
        <a href={editedVideo} download={"a.mp4"}>
          Download
        </a>
      )}
    </div>
  );
}

export default App;
